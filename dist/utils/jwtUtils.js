"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Jwt {
    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        this.secretKey = process.env.JWT_SECRET;
    }
    generateToken(payload, expiresIn = '1h') {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.secretKey);
    }
}
exports.Jwt = Jwt;
