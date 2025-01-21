"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const userAuthMiddleware = (allowedRoles = []) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const jwtService = new jwtUtils_1.Jwt();
            const decoded = jwtService.verifyToken(token);
            //attaching data to the req object
            req.user = decoded;
            //Role-based-authentication
            if (allowedRoles.length > 0 && !allowedRoles.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role)) {
                return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
            }
            next();
        }
        catch (error) {
            console.error("Token error", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    });
};
exports.userAuthMiddleware = userAuthMiddleware;
