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
  console.log(authHeader);
  if (!authHeader) {
    throw new ApiError("Unauthorized", 401, "Unauthorized");
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    console.log("Unauthorized 23");
    throw new ApiError("Unauthorized", 401, "Unauthorized");
  }

  console.log("token", token);

  const database = new Database();
  const collection = database.getCollection("user");
  const authorizationTokenExists = await collection.findOne(
    { authorizationToken: token },
    { projection: { _id: 0 } }
  );

  console.log(authorizationTokenExists);

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
