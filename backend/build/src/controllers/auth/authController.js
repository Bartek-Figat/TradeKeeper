"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const authService_1 = require("../../services/authService/authService");
const middleware_1 = require("../../middlewares/middleware");
let AuthController = class AuthController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.authService = new authService_1.AuthService();
    }
    async registration(req) {
        return this.authService.registration(req);
    }
    async login(req) {
        return this.authService.login(req);
    }
    async emailConfirmation(token) {
        return this.authService.emailConfirmation(token);
    }
    async passwordUpdate(req) {
        return this.authService.generateAuniqueEmailForPasswordReset(req);
    }
    async updatePassword(req) {
        return this.authService.updatePassword(req);
    }
    async logout(req) {
        return this.authService.logout(req);
    }
    async logoutFromAllDevices(req) {
        return this.authService.logoutFromAllDevices(req);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Post)("registration"),
    (0, tsoa_1.Middlewares)(middleware_1.validateIncomingFields),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
__decorate([
    (0, tsoa_1.Post)("login"),
    (0, tsoa_1.Middlewares)(middleware_1.validateIncomingFields),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Get)("activate/{token}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "emailConfirmation", null);
__decorate([
    (0, tsoa_1.Get)("reset-password"),
    (0, tsoa_1.Middlewares)(middleware_1.validateEmail),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "passwordUpdate", null);
__decorate([
    (0, tsoa_1.Get)("update-password"),
    (0, tsoa_1.Middlewares)(middleware_1.validateEmail),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)("logout"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)("logout-from-all"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutFromAllDevices", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("api/auth")
], AuthController);
