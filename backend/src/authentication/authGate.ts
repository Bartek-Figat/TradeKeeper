import { Request } from "express";
import { JwtPayload, verify, sign } from "jsonwebtoken";
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
  const authorizationTokenExists = await collection.findOne(
    { authorizationToken: token },
    { projection: { _id: 0 } }
  );

  if (!authorizationTokenExists) {
    throw new ApiError("Unauthorized", 401, "Unauthorized");
  }

  try {
    const secret: any = process.env.JWT_SECRET;
    const decoded = verify(token, secret) as string | JwtPayload;
    return { decoded, authHeader: token };
  } catch (err) {
    // If the token is invalid, check for a refresh token
    const refreshToken = req.headers.authorization;
    if (!refreshToken) {
      throw new ApiError("Unauthorized", 401, "Unauthorized");
    }

    const refreshTokenExists = await collection.findOne(
      { refreshToken },
      { projection: { _id: 0, userId: 1 } }
    );

    if (!refreshTokenExists) {
      throw new ApiError("Unauthorized", 401, "Unauthorized");
    }

    // new access token
    const newAccessToken = sign(
      { userId: refreshTokenExists.userId },
      "secret",
      { expiresIn: "1h" }
    );
    return {
      decoded: { userId: refreshTokenExists.userId },
      authHeader: newAccessToken,
    };
  }
}
