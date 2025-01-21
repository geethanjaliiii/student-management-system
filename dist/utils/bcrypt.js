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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptPass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptPass {
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                console.log('hashed pas', hashedPassword);
                return hashedPassword;
            }
            catch (error) {
                console.error("Error hashing password:", error);
                throw error; // Rethrow the error after logging
            }
        });
    }
    comparePassword(currentPassword, passwordInDb) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(currentPassword, passwordInDb);
        });
    }
}
exports.BcryptPass = BcryptPass;
