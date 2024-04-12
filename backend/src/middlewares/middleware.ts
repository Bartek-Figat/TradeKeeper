import { Request, Response, NextFunction } from "express";
import { RegisterDto, VerifyEmail } from "../dto/dto";
import { validate } from "class-validator";

export async function validateIncomingFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userRegisterValidation = new RegisterDto();
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
