"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
// import { Database } from "../config/db/database";
class TokenService {
    generateAccessToken(userId) {
        console.log(userId);
        return (0, jsonwebtoken_1.sign)({ token: userId }, "secret");
    }
}
exports.TokenService = TokenService;
