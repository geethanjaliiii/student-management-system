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
exports.studentRepository = void 0;
const user_model_1 = require("../../models/user.model");
class studentRepository {
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.create(student);
        });
    }
    updateStudent(id, student) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findByIdAndUpdate(id, student, { new: true });
        });
    }
    findStudentByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findOne({ email: email });
        });
    }
    findStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findById(id);
        });
    }
}
exports.studentRepository = studentRepository;
