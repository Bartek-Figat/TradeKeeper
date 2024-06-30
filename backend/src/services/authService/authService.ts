import { hash, genSalt, compare } from "bcrypt";
import { RegisterDto, LoginDto, LogoutDto } from "../../dto/dto";
import { ApiError } from "../../error/apiError";
import { Database } from "../../config/db/database";
import { TokenService } from "../tokenService/token";
import { EmailHandler } from "./email"
import { SendVerificationEmailData } from "./type"
import { ObjectId } from "mongodb";
import { sign } from "jsonwebtoken";






export class AuthService {
  private database: Database = new Database();
  private tokenService: TokenService = new TokenService();
  private emailHandler: EmailHandler = new EmailHandler();
  private userCollection = this.database.getCollection("user");

  async registration({ email, password, agreementToWebsitePolicy }: RegisterDto): Promise<void> {

    const userExists = await this.userCollection.findOne({ email });

    if (userExists) {
      throw new ApiError("Email already exists", 400, "Email already exists");
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
 
}
