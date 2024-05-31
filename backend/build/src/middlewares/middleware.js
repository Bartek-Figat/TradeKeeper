"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.validateEmail = exports.validateIncomingFields = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dto_1 = require("../dto/dto");
const class_validator_1 = require("class-validator");
async function validateIncomingFields(req, res, next) {
    const userRegisterValidation = new dto_1.RegisterDto();
    Object.assign(userRegisterValidation, req.body);
    const validationErrors = await (0, class_validator_1.validate)(userRegisterValidation);
    if (validationErrors.length > 0) {
        return res.status(400).json({ error: validationErrors });
    }
    next();
}
exports.validateIncomingFields = validateIncomingFields;
async function validateEmail(req, res, next) {
    const userEmail = new dto_1.VerifyEmail();
    Object.assign(userEmail, req.body);
    const validationErrors = await (0, class_validator_1.validate)(userEmail);
    if (validationErrors.length > 0) {
        return res.status(400).json({ error: validationErrors });
    }
    next();
}
exports.validateEmail = validateEmail;
const getUserId = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authToken.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded;
        console.log(req.userId);
    }
    catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};
exports.getUserId = getUserId;
