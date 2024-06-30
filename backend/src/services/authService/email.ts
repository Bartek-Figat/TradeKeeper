import { config } from "dotenv";
import sgMail from "@sendgrid/mail";
import { VerifyEmail } from "../../dto/dto";
import { Database } from "../../config/db/database";
import { TokenService } from "../tokenService/token";
import { ApiError } from "../../error/apiError";
import { SendVerificationEmailData } from "./type"
import { ObjectId } from "mongodb";
import { genSalt, hash } from "bcrypt";


config({ path: "../../.env" });
const { sendgridApi, EMAIL_FROM } = process.env;
sgMail.setApiKey(`${sendgridApi}`);


export class EmailHandler {
  private database: Database = new Database();
  private tokenService: TokenService = new TokenService();
  private userCollection = this.database.getCollection("user");


  async sendVerificationEmail(data: SendVerificationEmailData): Promise<void> {
    const {email, authToken} = data; 
    try {
      const msg = {
        to: email,
        from: 'figat29@gmail.com',
        subject: 'Thank you for registering.',
        text: 'Team bbards',
        html: `
          Hello,
          Thank you for registering. Please click the link to complete your activation:
          <a href="http://localhost:5173/activate/${authToken}">Activation Link</a>
        `,
      };

      await sgMail.send(msg);
      console.log('Verification email sent successfully.');
    } catch (error: any) {
      console.error('Error sending verification email:', error.message);
    
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

  async emailConforamtion({ authToken }: { authToken: string }) {
    const token = await this.userCollection.findOne({ authToken },
      {
        projection: {
          authToken: 1,
          _id: 0,
        },
      });

      if (!authToken) throw new ApiError("Bad Request", 400), "Bad Request ";

      const email = await this.userCollection.findOne({
        authToken: token?.authToken,
      });
      await  this.userCollection.updateOne(
        { email: email?.email },
        {
          $set: {
            authToken: null,
            isVerified: true,
          },
        }
      );

      const msg = {
        to: `${email?.email}`,
        from: "figat29@@gmail.com",
        subject: "Thank you for registering.",
        text: "Team bbards",
        html: `Your account has benne successfully activated`,
      };
      sgMail
        .send(msg)
        .then(() => {
          throw new ApiError("", 200);
        })
        .catch(() =>  {throw new ApiError("Bad Request", 400)});
  }


//   async handleEmailConfirmation(email: string): Promise<void>  {}
//   async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {}
}





