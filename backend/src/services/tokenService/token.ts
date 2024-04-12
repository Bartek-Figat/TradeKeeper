import { sign } from "jsonwebtoken";
// import { Database } from "../config/db/database";

export class TokenService {
  generateAccessToken(userId: string) {
    console.log(userId);
    return sign({ token: userId }, "secret");
  }
}
