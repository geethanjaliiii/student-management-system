"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const StudentRepository_1 = require("./repositories/student/StudentRepository");
const student_service_1 = require("./services/student/student.service");
const student_controller_1 = require("./controllers/student/student.controller");
const student_route_1 = require("./routes/student.route");
class App {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.setMiddlewares();
        this.setTestRoute();
        this.setStudentRoutes();
    }
    setMiddlewares() {
        this.app.use(express_1.default.json());
    }
    setTestRoute() {
        this.app.get("/", (req, res) => {
            res.status(200).json({ success: true, message: "Server is running!" });
        });
    }
    setStudentRoutes() {
        const userRepository = new StudentRepository_1.studentRepository();
        const studentService = new student_service_1.StudentService(userRepository);
        const studentController = new student_controller_1.StudentController(studentService);
        const studentRoute = new student_route_1.StudentRoute(studentController);
        this.app.use("/api/students", studentRoute.getStudentRoutes());
    }
    //public method or exporting app to rerver
    getApp() {
        return this.app;
    }
}
exports.App = App;
//equivateletnt common.js implementation
// //load environment variables
// dotenv.config()
// const app: Application = express();
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// //initialize components and wire them togather(Dependency injection)
// const userRepository = new studentRepository(); //repository to handle DB logic
// const studentService = new StudentService(userRepository); //service to handle business logic
// const studentController = new StudentController(studentService); //controller to handle http logic
// //initialise and register the routes
// const userRoute = new UserRoute(studentController);
// app.use('/api/students',userRoute.getStudentRoutes());
// app.get('/',(req,res)=>{
//     res.status(200).json({message:"Api is working."})
// })
