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
exports.StudentService = void 0;
const bcrypt_1 = require("../../utils/bcrypt");
class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
        this.bcryptPass = new bcrypt_1.BcryptPass();
    }
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEmailAlreadyExist = yield this.studentRepository.findStudentByEmail(student.email);
            if (isEmailAlreadyExist) {
                throw new Error("Email already exist.");
            }
            const hashedPassword = yield this.bcryptPass.hashPassword(student.password);
            const studentData = Object.assign(Object.assign({}, student), { password: hashedPassword });
            return yield this.studentRepository.createStudent(studentData);
        });
    }
    checkStudentExistance(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isStudentWithEmailExist = yield this.studentRepository.findStudentByEmail(email);
            if (!isStudentWithEmailExist) {
                throw new Error("Student doesn't exist.");
            }
            const isPasswordMatch = yield this.bcryptPass.comparePassword(password, isStudentWithEmailExist.password);
            if (!isPasswordMatch) {
                throw new Error("Invalid Email or Password.");
            }
            return isStudentWithEmailExist;
        });
    }
    updateStudent(id, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const isStudentUpdated = student.password;
            if (isStudentUpdated) {
                const hashedPassword = yield this.bcryptPass.hashPassword(isStudentUpdated);
                student.password = hashedPassword;
            }
            return yield this.studentRepository.updateStudent(id, student);
        });
    }
    findStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.studentRepository.findStudentById(id);
            if (user)
                throw new Error("Student not found.");
            return user;
        });
    }
}
exports.StudentService = StudentService;
