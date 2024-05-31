"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const dotenv_1 = require("dotenv");
const bcrypt_1 = require("bcrypt");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const apiError_1 = require("../../error/apiError");
const database_1 = require("../../config/db/database");
const token_1 = require("../tokenService/token");
const mongodb_1 = require("mongodb");
(0, dotenv_1.config)({ path: "../../.env" });
const { SENDGRID_API, EMAIL_FROM } = process.env;
mail_1.default.setApiKey(`${SENDGRID_API}`);
class AuthService {
    constructor() {
        this.database = new database_1.Database();
        this.tokenService = new token_1.TokenService();
        this.userCollection = this.database.getCollection("user");
    }
    async registration({ email, password }) {
        try {
            const userExists = await this.userCollection.findOne({ email });
            if (userExists)
                throw new apiError_1.ApiError("Email already exists", 400);
            const salt = await (0, bcrypt_1.genSalt)(10);
            const hashedPassword = await (0, bcrypt_1.hash)(password, salt);
            const newUser = {
                email,
                password: hashedPassword,
                isVerified: false,
                dateAdded: new Date(),
                lastLoggedIn: null,
                logOutDate: null,
                isLogin: false,
            };
            await this.userCollection.insertOne(newUser);
        }
        catch (error) {
            throw new apiError_1.ApiError("Registration failed", 500, error.message);
        }
    }
    async login({ email, password }) {
        try {
            const user = await this.userCollection.findOne({ email });
            if (!user)
                throw new apiError_1.ApiError("User not found", 404);
            const isMatch = await (0, bcrypt_1.compare)(password, user.password);
            if (!isMatch)
                throw new apiError_1.ApiError("Invalid credentials", 401);
            const userIdAsString = user._id.toString();
            const token = this.tokenService.generateAccessToken(userIdAsString);
            await this.userCollection.updateOne({ _id: user._id }, { $set: { isLogin: true, lastLoggedIn: new Date() } });
            return { token };
        }
        catch (error) {
            throw new apiError_1.ApiError("Login failed", 500, error.message);
        }
    }
    async logout(dto) {
        try {
            const { user: { decoded: { token }, }, } = dto;
            await this.userCollection.updateOne({ _id: new mongodb_1.ObjectId(token) }, { $set: { isLogin: false, logOutDate: new Date() } });
        }
        catch (error) {
            throw new apiError_1.ApiError("Logout failed", 500, error.message);
        }
    }
    async logoutFromAllDevices(dto) {
        try {
            const { user: { decoded: { token }, }, } = dto;
            await this.userCollection.updateOne({ _id: new mongodb_1.ObjectId(token) }, { $set: { authorizationToken: [] } });
        }
        catch (error) {
            throw new apiError_1.ApiError("Logout failed", 500, error.message);
        }
    }
    async generateAuniqueEmailForPasswordReset({ email, }) {
        try {
            const user = await this.userCollection.findOne({ email });
            if (!user) {
                throw new apiError_1.ApiError("User not found", 404);
            }
            const userIdAsString = user._id.toString();
            const emailToken = this.tokenService.generateAccessToken(userIdAsString);
            await this.userCollection.updateOne({ _id: new mongodb_1.ObjectId(user._id) }, { $set: { emailToken } });
            const msg = {
                to: `${user.email}`,
                from: "figat29@gmail.com",
                subject: "Password Reset Request",
                html: `Hello. Please click the link to update your email <a href='http://localhost:3000/#/password-update/${emailToken}'>Password Update</a>`,
            };
            console.log(`Password reset email sent to: ${user.email} at ${new Date().toISOString()}`);
            await mail_1.default.send(msg);
        }
        catch (error) {
            console.error("Email sending failed:", error);
            throw new apiError_1.ApiError("Email sending failed", 500, error.message);
        }
    }
    async updatePassword({ emailToken, password, }) {
        try {
            const user = await this.userCollection.findOne({ emailToken });
            if (!user) {
                throw new apiError_1.ApiError("User not found", 404);
            }
            const salt = await (0, bcrypt_1.genSalt)(10);
            const hashedPassword = await (0, bcrypt_1.hash)(password, salt);
            await this.userCollection.updateOne({ _id: new mongodb_1.ObjectId(user._id) }, { $set: { password: hashedPassword } });
            const msg = {
                to: `${user.email}`,
                from: "figat29@gmail.com",
                subject: "Password updated",
                html: `Your password has been successfully updated`,
            };
            await mail_1.default.send(msg);
            console.log(`Your password has been successfully updated to: ${user.email} at ${new Date().toISOString()}`);
        }
        catch (error) {
            console.error("Something went wrong with password update:", error);
            throw new apiError_1.ApiError("Something went wrong with password update", 500, error.message);
        }
    }
    async emailConfirmation(token) {
        try {
            const user = await this.userCollection.findOne({ authToken: token });
            if (!user)
                throw new apiError_1.ApiError("Invalid token", 400);
            await this.userCollection.updateOne({ email: user.email }, { $set: { authToken: null, isVerified: true } });
            await this.sendEmail(user.email, "Thank you for registering.", "Your account has been successfully activated.");
        }
        catch (error) {
            throw new apiError_1.ApiError("Email confirmation failed", 500, error.message);
        }
    }
    async sendEmail(to, subject, html) {
        if (!EMAIL_FROM) {
            throw new Error("EMAIL_FROM must be defined");
        }
        const msg = { to, from: EMAIL_FROM, subject, html };
        try {
            await mail_1.default.send(msg);
        }
        catch (error) {
            throw new apiError_1.ApiError("Email sending failed", 500, error.message);
        }
    }
}
exports.AuthService = AuthService;
