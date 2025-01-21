import express, { Application } from "express";
import dotenv from "dotenv";
import { studentRepository } from "./repositories/student/StudentRepository";
import { StudentService } from "./services/student/student.service";
import { StudentController } from "./controllers/student/student.controller";
import { StudentRoute } from "./routes/user.route";

export class app {
  private app: Application;
  constructor() {
    dotenv.config();
    this.app = express();
    this.setMiddlewares();
    this.setTestRoute();
    this.setStudentRoutes();
  }
  private setMiddlewares() {
    this.app.use(express.json());
  }
  private setTestRoute() {
    this.app.get("/", (req, res) => {
      res.status(200).json({ success: true, message: "Server is running!" });
    });
  }
  private setStudentRoutes() {
    const userRepository = new studentRepository();
    const studentService = new StudentService(userRepository);
    const studentController = new StudentController(studentService);
    const studentRoute = new StudentRoute(studentController);
    this.app.use("/api/students", studentRoute.getStudentRoutes());
  }

  //public method or exporting app to rerver
  public getApp() {
    return this.app;
  }
}

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
