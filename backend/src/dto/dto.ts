import {
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsString,
  IsArray,
  IsBoolean,
} from "class-validator";
import { IsMatch } from "./match.decorator"; //Match
import { ObjectId } from "mongodb";

export class RegisterDto {
  @IsNotEmpty()
  password!: string;
  @IsEmail()
  email!: string | undefined;
  @IsMatch("password", { message: "Does not match" })
  matchPassword!: string;
  @IsNotEmpty()
  @IsBoolean()
  agreementToWebsitePolicy!: boolean | undefined;
}
export class LoginDto {
  @IsNotEmpty()
  password!: string;
  @IsEmail()
  email!: string;
}
export type LogoutDto = {
  user: { decoded: { userId: string }; authHeader: string };
};

export type TokenDto = {
  user: { decoded: { token: string }; authHeader: string };
};

export class VerifyEmail {
  @IsEmail()
  email!: string;
}

export class TradeDto {
  @IsNotEmpty()
  id: ObjectId | undefined;

  @IsDate()
  createdAt: Date = new Date();

  @IsNumber()
  entry!: number;

  @IsNumber()
  entryQty!: number;

  @IsNumber()
  entryTotal!: number;

  @IsArray()
  executions!: string[];

  @IsNumber()
  exit!: number;

  @IsNumber()
  exitQty!: number;

  @IsNumber()
  exitTotal!: number;

  @IsNumber()
  holdTime!: number;

  @IsDate()
  lastTransactionAt!: Date;

  @IsString()
  market!: string;

  @IsDate()
  openDate!: Date;

  @IsNumber()
  position!: number;

  @IsString()
  positionType!: string;

  @IsNumber()
  rMultiple!: number;

  @IsNumber()
  urnAmnt!: number;

  @IsNumber()
  returnPercent!: number;

  @IsString()
  status!: string;

  @IsString()
  symbol!: string;

  @IsArray()
  tags!: string[];
}

export class FolderDto {
  @IsNotEmpty()
  id: ObjectId | undefined;

  @IsString()
  name!: string;

  @IsArray()
  trades!: TradeDto[];
}

export class NoteDto {
  @IsNotEmpty()
  id: ObjectId | undefined;

  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}

export class MediaDto {
  @IsNotEmpty()
  id: ObjectId | undefined;

  @IsNotEmpty()
  tradeId!: string;

  @IsString()
  url!: string;

  @IsDate()
  uploadedAt!: Date;
}

export class JournalEntryDto {
  @IsNotEmpty()
  _id: ObjectId | undefined;

  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsArray()
  tags!: string[];

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;

  @IsArray()
  mediaUrls!: string[];

  @IsArray()
  sharedWith!: string[];
}

export class TradeNewDto {
  @IsNotEmpty()
  _id: ObjectId | undefined;

  @IsNotEmpty()
  userId!: string;

  @IsString()
  symbol!: string;

  @IsNumber()
  entryPrice!: number;

  @IsNumber()
  exitPrice!: number;

  @IsNumber()
  risk!: number;

  @IsNumber()
  reward!: number;

  @IsArray()
  tags!: string[];

  @IsDate()
  createdAt!: Date;
}
