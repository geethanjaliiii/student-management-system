"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoute = void 0;
const express_1 = __importDefault(require("express"));
class StudentRoute {
    constructor(studentController) {
        this.studentController = studentController; //this controller handle logic for endpoints
        this.userRouter = express_1.default.Router(); //router object which store routes defined in set routes()
        this.setRoutes();
    }
    setRoutes() {
        //set routes setup actual routes and map them to controller methids
        this.userRouter.post("/register", (req, res) => this.studentController.studentRegister(req, res));
        this.userRouter.post("/login", (req, res) => this.studentController.studentLogin(req, res));
    }
    //this method expostes the router instances to main application(app.ts)
    getStudentRoutes() {
        //this method will encapsulate all userRoutes
        return this.userRouter;
    }
}
exports.StudentRoute = StudentRoute;
