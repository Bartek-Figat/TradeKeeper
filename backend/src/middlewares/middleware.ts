import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { LoginDto, VerifyEmail } from "../dto/dto";
import { validate } from "class-validator";

export async function validateIncomingFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userRegisterValidation = new LoginDto();
  Object.assign(userRegisterValidation, req.body);

  const validationErrors = await validate(userRegisterValidation);
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: validationErrors });
  }
  next();
}

export async function validateEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userEmail = new VerifyEmail();
  Object.assign(userEmail, req.body);

  const validationErrors = await validate(userEmail);
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: validationErrors });
  }
  next();
}

export const getUserId = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = decoded;
    console.log(req.userId);
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
