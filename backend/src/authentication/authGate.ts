import { Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { Database } from "../config/db/database";
import { ApiError } from "../error/apiError";

// Function is used for authenticating the user using JWT (JSON Web Token).
// It takes in a request object, a security name, and an optional array of scopes.
// It returns a Promise that resolves to an object containing the decoded JWT and the auth header,
// or undefined if the security name is not "jwt".
export async function expressAuthentication(
  req: Request,
  securityName: string,
  _scopes?: string[]
): Promise<{ decoded: string | JwtPayload; authHeader: string } | undefined> {
  if (securityName !== "jwt") {
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ApiError("Unauthorized", 401, "No token provided");
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
