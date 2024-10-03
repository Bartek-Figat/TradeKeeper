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
    throw new ApiError("Unauthorized", 401, "Authorization header is missing.");
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    throw new ApiError("Unauthorized", 401, "Invalid or missing token.");
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
    throw new ApiError("Unauthorized", 401, "Invalid token");
  }
}
