"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const database_1 = require("../config/db/database");
const apiError_1 = require("../error/apiError");
async function expressAuthentication(req, securityName, _scopes) {
    if (securityName !== "jwt") {
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new apiError_1.ApiError("Unauthorized", 401, "No token provided");
    }
    const database = new database_1.Database();
    const collection = database.getCollection("user");
    const authorizationTokenExists = await collection.findOne({ authorizationToken: token }, { projection: { _id: 0 } });
    if (!authorizationTokenExists) {
        throw new apiError_1.ApiError("Unauthorized", 401, "Unauthorized");
    }
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        return { decoded, authHeader: token };
    }
    catch (err) {
        throw new apiError_1.ApiError("Unauthorized", 401, "Invalid token");
    }
}
exports.expressAuthentication = expressAuthentication;
