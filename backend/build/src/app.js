"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("../build/routes");
const apiError_1 = require("./error/apiError");
exports.app = (0, express_1.default)();
// Middleware for parsing request bodies
exports.app.use((0, express_1.urlencoded)({ extended: true, limit: "50mb" }));
exports.app.use((0, express_1.json)({ limit: "50mb" }));
// Add cookie parser middleware
exports.app.use((0, cookie_parser_1.default)());
// Compression middleware
exports.app.use((0, compression_1.default)());
// CORS configuration
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
    ],
    credentials: true,
}));
dotenv_1.default.config({ path: "./.env" });
// Security middleware
exports.app.use((0, helmet_1.default)());
exports.app.use((0, morgan_1.default)("dev"));
// Serve Swagger UI
exports.app.use("/docs", swagger_ui_express_1.default.serve, async (_req, res) => {
    return res.send(swagger_ui_express_1.default.generateHTML(await Promise.resolve().then(() => __importStar(require("../build/swagger.json")))));
});
// Security-related HTTP headers
exports.app.set("trust proxy", 1);
exports.app.set("x-powered-by", false);
exports.app.disable("x-powered-by");
exports.app.use(helmet_1.default.contentSecurityPolicy());
exports.app.use(helmet_1.default.referrerPolicy({ policy: "same-origin" }));
exports.app.use(helmet_1.default.frameguard({ action: "sameorigin" }));
exports.app.use(helmet_1.default.hsts({ maxAge: 63072000, includeSubDomains: true, preload: true }));
exports.app.use(helmet_1.default.noSniff());
exports.app.use(helmet_1.default.xssFilter());
// Prevent HTTP Parameter Pollution
exports.app.use((0, hpp_1.default)());
// Register API routes
(0, routes_1.RegisterRoutes)(exports.app);
// Error handling middleware
exports.app.use((err, _req, res, next) => {
    if (err instanceof apiError_1.ApiError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else {
        next(err);
    }
});
// Additional cookie configuration improvements can be added here
exports.default = exports.app;
