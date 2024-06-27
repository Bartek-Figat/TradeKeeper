import { config } from "dotenv";
import { hash, genSalt, compare } from "bcrypt";
import sgMail from "@sendgrid/mail";
import { RegisterDto, LoginDto, LogoutDto, VerifyEmail } from "../../dto/dto";
import { ApiError } from "../../error/apiError";
import { Database } from "../../config/db/database";
import { TokenService } from "../tokenService/token";
import { ObjectId } from "mongodb";

config({ path: "../../.env" });
const { SENDGRID_API, EMAIL_FROM } = process.env;

sgMail.setApiKey(`${SENDGRID_API}`);

export class AuthService {
  private database: Database = new Database();
  private tokenService: TokenService = new TokenService();
  private userCollection = this.database.getCollection("user");

  async registration({ email, password, agreementToWebsitePolicy }: RegisterDto): Promise<void> {

    const userExists = await this.userCollection.findOne({ email });

    if (userExists) {
      throw new ApiError("Email already exists", 400, "Email already exists");
    }
    try {
      const salt = await genSalt(10);

      const newUser = {
        email,
        password: await hash(password, salt),
        isVerified: false,
        dateAdded: new Date(),
        lastLoggedIn: null,
        logOutDate: null,
        isLogin: false,
        agreementToWebsitePolicy
      };

      await this.userCollection.insertOne(newUser);
    } catch (error: any) {
      throw new ApiError("Registration failed", 500, "Email Exist");
    }
  }

  async login({ email, password }: LoginDto): Promise<{ token: string }> {
    try {
      const user = await this.userCollection.findOne({ email });
      if (!user) throw new ApiError("User not found", 404);

      const isMatch = await compare(password, user.password);
      if (!isMatch) throw new ApiError("Invalid credentials", 401);

      const userIdAsString = user._id.toString();
      const token = this.tokenService.generateAccessToken(userIdAsString);
      await this.userCollection.updateOne(
        { _id: user._id },
        { $set: { isLogin: true, lastLoggedIn: new Date() } }
      );

      return { token };
    } catch (error: any) {
      throw new ApiError("Login failed", 500, error.message);
    }
  }

  async logout(dto: LogoutDto): Promise<void> {
    try {
      const {
        user: {
          decoded: { token },
        },
      } = dto;
      await this.userCollection.updateOne(
        { _id: new ObjectId(token) },
        { $set: { isLogin: false, logOutDate: new Date() } }
      );
    } catch (error: any) {
      throw new ApiError("Logout failed", 500, error.message);
    }
  }

  async logoutFromAllDevices(dto: LogoutDto): Promise<void> {
    try {
      const {
        user: {
          decoded: { token },
        },
      } = dto;
      await this.userCollection.updateOne(
        { _id: new ObjectId(token) },
        { $set: { authorizationToken: [] } }
      );
    } catch (error: any) {
      throw new ApiError("Logout failed", 500, error.message);
    }
  }

  async generateAuniqueEmailForPasswordReset({
    email,
  }: VerifyEmail): Promise<void> {
    try {
      const user = await this.userCollection.findOne({ email });
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const userIdAsString = user._id.toString();
      const emailToken = this.tokenService.generateAccessToken(userIdAsString);

      await this.userCollection.updateOne(
        { _id: new ObjectId(user._id) },
        { $set: { emailToken } }
      );

      const msg = {
        to: `${user.email}`,
        from: "figat29@gmail.com",
        subject: "Password Reset Request",
        html: `Hello. Please click the link to update your email <a href='http://localhost:3000/#/password-update/${emailToken}'>Password Update</a>`,
      };

      console.log(
        `Password reset email sent to: ${
          user.email
        } at ${new Date().toISOString()}`
      );

      await sgMail.send(msg);
    } catch (error: any) {
      console.error("Email sending failed:", error);
      throw new ApiError("Email sending failed", 500, error.message);
    }
  }

  async updatePassword({
    emailToken,
    password,
  }: {
    emailToken: string;
    password: string;
  }): Promise<void> {
    try {
      const user = await this.userCollection.findOne({ emailToken });
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      await this.userCollection.updateOne(
        { _id: new ObjectId(user._id) },
        { $set: { password: hashedPassword } }
      );

      const msg = {
        to: `${user.email}`,
        from: "figat29@gmail.com",
        subject: "Password updated",
        html: `Your password has been successfully updated`,
      };

      await sgMail.send(msg);

      console.log(
        `Your password has been successfully updated to: ${
          user.email
        } at ${new Date().toISOString()}`
      );
    } catch (error: any) {
      console.error("Something went wrong with password update:", error);
      throw new ApiError(
        "Something went wrong with password update",
        500,
        error.message
      );
    }
  }

  async emailConfirmation(token: string): Promise<void> {
    try {
      const user = await this.userCollection.findOne({ authToken: token });
      if (!user) throw new ApiError("Invalid token", 400);

      await this.userCollection.updateOne(
        { email: user.email },
        { $set: { authToken: null, isVerified: true } }
      );
      await this.sendEmail(
        user.email,
        "Thank you for registering.",
        "Your account has been successfully activated."
      );
    } catch (error: any) {
      throw new ApiError("Email confirmation failed", 500, error.message);
    }
  }

   async sendEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    if (!EMAIL_FROM) {
      throw new Error("EMAIL_FROM must be defined");
    }
    const msg = { to, from: EMAIL_FROM, subject, html };
    try {
      await sgMail.send(msg);
    } catch (error: any) {
      throw new ApiError("Email sending failed", 500, error.message);
    }
  }
}
