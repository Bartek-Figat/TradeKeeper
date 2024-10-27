import { hash, genSalt, compare } from "bcrypt";
import { RegisterDto, LoginDto, LogoutDto } from "../../dto/dto";
import { ApiError } from "../../error/apiError";
import { Database } from "../../config/db/database";
import { TokenService } from "../tokenService/token";
import { EmailHandler } from "./email";
import { SendVerificationEmailData } from "./type";
import { ObjectId } from "mongodb";
import { JsonWebTokenError, sign, verify } from "jsonwebtoken";

export class AuthService {
  private readonly userDB: string = "user";
  private database: Database = new Database();
  private tokenService: TokenService = new TokenService();
  private emailHandler: EmailHandler = new EmailHandler();
  private userCollection = this.database.getCollection(this.userDB);

  async registration({
    email,
    password,
    agreementToWebsitePolicy,
  }: RegisterDto): Promise<void> {
    const userExists = await this.userCollection.findOne({ email });

    if (userExists) {
      throw new ApiError("Email already exists", 400, "Bad Request");
    }
    try {
      const salt = await genSalt(10);

      const newUser: SendVerificationEmailData = {
        email,
        password: await hash(password, salt),
        authToken: sign({ data: email }, `${process.env.JWT_SECRET}`),
        isVerified: false,
        dateAdded: new Date(),
        lastLoggedIn: null,
        logOutDate: null,
        isLogin: false,
        agreementToWebsitePolicy,
      };

      await this.userCollection.insertOne(newUser);
      await this.emailHandler.sendVerificationEmail(newUser);
    } catch (error: any) {
      throw new ApiError("Registration failed", 500, "Email Exist");
    }
  }

  async emailConfirmation({ authToken }: { authToken: string }): Promise<void> {
    try {
      const decoded = verify(authToken, `${process.env.JWT_SECRET}`) as {
        data: string;
      };
      const email = decoded.data;
      const user = await this.userCollection.findOne({ email });

      if (!user) {
        throw new ApiError("User not found", 404, "Not Found");
      }

      if (user.isVerified) {
        throw new ApiError("User already verified", 400, "Bad Request");
      }
      await this.userCollection.updateOne(
        { email },
        { $set: { isVerified: true } }
      );

      await this.emailHandler.emailConfirmationHandler({ email });
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        throw new ApiError("Invalid token", 400, "Bad Request");
      }
      throw new ApiError(
        "Email confirmation failed",
        500,
        "Internal Server Error"
      );
    }
  }

  async login({ email, password }: LoginDto): Promise<{ token: string }> {
    console.log(email, password);
    try {
      const user = await this.userCollection.findOne({ email });
      if (!user) throw new ApiError("User not found", 404);

      const isMatch = await compare(password, user.password);
      if (!isMatch) throw new ApiError("Invalid credentials", 401);

      const userIdAsString = user._id.toString();
      const token = this.tokenService.generateAccessToken(userIdAsString);
      await this.userCollection.updateOne(
        { _id: user._id },
        {
          $push: { authorizationToken: token },
          $set: {
            isLogin: true,
            lastLoggedIn: new Date(),
          },
        }
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
          authHeader,
          decoded: { userId },
        },
      } = dto;

      console.log("=========================", authHeader);
      console.log("=========================", userId);

      await this.userCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            isLogin: false,
            logOutDate: new Date(),
          },
          $pull: {
            authorizationToken: {
              //$in: [authHeader],
              $set: { authorizationToken: [] },
            },
          },
        }
      );
    } catch (error: any) {
      throw new ApiError("Logout failed", 500, error.message);
    }
  }

  async validateToken({ token }: any): Promise<boolean> {
    console.log(token);
    try {
      const user = await this.userCollection.findOne(
        { authorizationToken: token },
        { projection: { _id: 1 } }
      );

      // If no user is found, throw an unauthorized error
      if (!user) {
        throw new ApiError(
          "Unauthorized: Token is invalid or does not exist",
          401
        );
      }

      return true;
    } catch (error: any) {
      console.error("Error validating token:", error); // Log the error for debugging
      throw new ApiError("Unauthorized: Token validation failed", 500);
    }
  }

  async logoutFromAllDevices(dto: LogoutDto): Promise<void> {
    try {
      const {
        user: {
          decoded: { userId },
        },
      } = dto;
      await this.userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { authorizationToken: [] } }
      );
    } catch (error: any) {
      throw new ApiError("Logout failed", 500, error.message);
    }
  }
}
