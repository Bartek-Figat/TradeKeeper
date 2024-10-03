import { hash, genSalt, compare } from "bcrypt";
import { RegisterDto, LoginDto, LogoutDto } from "../../dto/dto";
import { ApiError } from "../../error/apiError";
import { Database } from "../../config/db/database";
import { TokenService } from "../tokenService/token";
import { EmailHandler } from "./email"
import { SendVerificationEmailData } from "./type"
import { ObjectId } from "mongodb";
import { sign } from "jsonwebtoken";

<<<<<<< HEAD
const USER_COLLECTION = "user";
const SENDGRID_API_KEY = process.env.SENDGRID_API;
const EMAIL_FROM = process.env.EMAIL_FROM;

sgMail.setApiKey(`${SENDGRID_API_KEY}`);
=======
>>>>>>> b02d96a6bbd3d2228f9375dc22de3c0886186fd2

export class AuthService {
  private database: Database = new Database();
  private tokenService: TokenService = new TokenService();
<<<<<<< HEAD
  private userCollection = this.database.getCollection(USER_COLLECTION);
=======
  private emailHandler: EmailHandler = new EmailHandler();
  private userCollection = this.database.getCollection("user");
>>>>>>> b02d96a6bbd3d2228f9375dc22de3c0886186fd2

  async registration({ email, password, agreementToWebsitePolicy }: RegisterDto): Promise<void> {

    const userExists = await this.userCollection.findOne({ email });

    if (userExists) {
      throw new ApiError("Email already exists", 400, "Bad Request");
    }
    try {
      const salt = await genSalt(10);

      const newUser: SendVerificationEmailData = {
        email,
        password: await hash(password, salt),
        authToken: sign({ data: email }, `secret`),
        isVerified: false,
        dateAdded: new Date(),
        lastLoggedIn: null,
        logOutDate: null,
        isLogin: false,
        agreementToWebsitePolicy
      };

      await this.userCollection.insertOne(newUser);
      await this.emailHandler.sendVerificationEmail(newUser)
    } catch (error: any) {
      throw new ApiError("Registration failed", 500, "Email Exist");
    }
  }

  async login({ email, password }: LoginDto): Promise<{ token: string }> {
    const userCollection = this.database.getCollection(USER_COLLECTION);
    const user = await userCollection.findOne({ email });
    console.log("User", user);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new ApiError("Invalid credentials", 401);
    }

    const userIdAsString = user._id.toString();
    const token = this.tokenService.generateAccessToken(userIdAsString);
    await userCollection.updateOne(
      { _id: user._id },
      { $set: { isLogin: true, lastLoggedIn: new Date() } }
    );

    return { token };
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

  async sendWelcomeEmail(token: string): Promise<void> {
    console.log("Token:  ", token)
    const authToken = await this.userCollection.findOne(
      { authToken: token },
      {
        projection: {
          authToken: 1,
          _id: 0,
        },
      }
    );
   console.log("Auth Token :", authToken)
  }


 
}
