"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "teacher", "principal"],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    grade: {
        type: String
    },
    section: {
        type: String
    },
    subject: {
        type: String
    },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', UserSchema);
