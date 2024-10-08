import { Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { Database } from "../config/db/database";
import { ApiError } from "../error/apiError";

export async function expressAuthentication(
  req: Request,
  securityName: string,
  _scopes?: string[]
): Promise<{ decoded: string | JwtPayload; authHeader: string } | undefined> {
  if (securityName !== "jwt") {
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApiError("Unauthorized", 401, "Unauthorized");
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    throw new ApiError("Unauthorized", 401, "Unauthorized");
  }

  const database = new Database();
  const collection = database.getCollection("user");

  try {
    const secret: any = process.env.JWT_SECRET;
    const decoded = verify(token, secret) as string | JwtPayload;
    return { decoded, authHeader: token };
  } catch (err) {
    
      // If the token is expired, check for a refresh token
      const refreshTokenHeader = req.headers.authorization; 
      const refreshSecret: any = process.env.JWTREFRESHSECRET;

      if (!refreshTokenHeader) {
        throw new ApiError("Unauthorized", 401, "Refresh token missing");
      }

      const [bearer, refreshToken] = refreshTokenHeader.split(" ");
      if (bearer !== "Bearer" || !refreshToken) {
        throw new ApiError("Unauthorized", 401, "Invalid refresh token format");
      }

      const refreshTokenExists = await collection.findOne(
        { refreshToken },
        { projection: { _id: 0, userId: 1 } }
      );

      if (!refreshTokenExists) {
        throw new ApiError("Unauthorized", 401, "Refresh token not found");
      }

      try {
        const decoded =  verify(refreshToken, refreshSecret) as string | JwtPayload;
        return { decoded, authHeader: refreshToken };
      } catch (refreshErr) {
        throw new ApiError("Unauthorized", 401, "Unauthorized");
      }
  }
}
