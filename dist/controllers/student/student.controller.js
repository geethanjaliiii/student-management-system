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
exports.StudentController = void 0;
const jwtUtils_1 = require("../../utils/jwtUtils");
class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    studentRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = req.body;
                const result = yield this.studentService.createStudent(student);
                res
                    .status(201)
                    .json({ success: true, message: "Registration Successfull" });
            }
            catch (error) {
                console.error("error in registration", error);
                if (error instanceof Error) {
                    res.status(500).json({ success: false, message: error.message });
                }
            }
        });
    }
    studentLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log("stu registration", req.body);
            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
                return;
            }
            try {
                //validate credentials
                const student = yield this.studentService.checkStudentExistance(email, password);
                const userData = {
                    _id: student === null || student === void 0 ? void 0 : student._id,
                    email: student === null || student === void 0 ? void 0 : student.email,
                    role: student === null || student === void 0 ? void 0 : student.role,
                };
                const jwtService = new jwtUtils_1.Jwt();
                const token = jwtService.generateToken({ id: student === null || student === void 0 ? void 0 : student._id, role: student === null || student === void 0 ? void 0 : student.role });
                res.status(200).json({
                    success: true,
                    message: "Login successfull",
                    user: userData,
                    token: token
                });
            }
            catch (error) {
                console.error("error in login", error);
                if (error instanceof Error) {
                    res.status(500).json({ success: false, message: error.message });
                }
            }
        });
    }
}
exports.StudentController = StudentController;
