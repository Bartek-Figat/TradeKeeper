import { config } from "dotenv";
import { sign } from "jsonwebtoken";

config();
const { JWTSECRET, JWTREFRESHSECRET  } = process.env;

export class TokenService {
  generateAccessToken(userId: string): string {
    return sign({ userId }, `${JWTSECRET}`, { expiresIn: '15m' });
  }

  generateRefreshToken(userId: string): string {
    return sign({ userId }, `${JWTREFRESHSECRET}`, { expiresIn: '7d' });
  }
}