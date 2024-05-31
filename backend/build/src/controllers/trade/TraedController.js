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
exports.TradeController = void 0;
const tsoa_1 = require("tsoa");
const tradeService_1 = require("../../services/trade/tradeService");
let TradeController = class TradeController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.tradeRepository = new tradeService_1.TradeRepository();
    }
    async getAllTrades() {
        return this.tradeRepository.getAllTrades();
    }
    async getAllUserTrades(req) {
        return this.tradeRepository.getAllUserTrades(req);
    }
    async getTradeById(tradeId) {
        return this.tradeRepository.getTradeById(tradeId);
    }
    async createTrade(req, newTrade) {
        return this.tradeRepository.createTrade(newTrade, req);
    }
    async updateTrade(tradeId, updatedTrade) {
        return this.tradeRepository.updateTrade(tradeId, updatedTrade);
    }
    async deleteTrade(tradeId) {
        return this.tradeRepository.deleteTrade(tradeId);
    }
    async getCompanyProfile(symbol) {
        return this.tradeRepository.getCompanyProfile(symbol);
    }
};
exports.TradeController = TradeController;
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getAllTrades", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)("/all-user-trade"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getAllUserTrades", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)("/{tradeId}"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getTradeById", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Post)("/create-trade"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "createTrade", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Put)("/{tradeId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "updateTrade", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Delete)("/{tradeId}"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "deleteTrade", null);
__decorate([
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.Get)("/{symbol}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getCompanyProfile", null);
exports.TradeController = TradeController = __decorate([
    (0, tsoa_1.Route)("trades")
], TradeController);
