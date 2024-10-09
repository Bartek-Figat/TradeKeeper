import { config } from "dotenv";
import { sign } from "jsonwebtoken";

config();
const { JWT_SECRET } = process.env;

export class TokenService {
  generateAccessToken(userId: string): string {
    return sign({ userId }, `${JWT_SECRET}`);
  }
}
