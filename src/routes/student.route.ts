import { StudentController } from "../controllers/student/student.controller";
import express, { Request, Response } from "express";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleWare";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

export class StudentRoute {
  private studentController: StudentController; //dependency injection, all methods in controller will be available
  private userRouter: express.Router;
  constructor(studentController: StudentController) {
    this.studentController = studentController; //this controller handle logic for endpoints
    this.userRouter = express.Router(); //router object which store routes defined in set routes()
    this.setRoutes();
  }
  private setRoutes() {
    //set routes setup actual routes and map them to controller methids
    this.userRouter.post("/register", (req: Request, res: Response) =>
      this.studentController.studentRegister(req, res)
    );

    this.userRouter.post("/login", (req: Request, res: Response) =>
      this.studentController.studentLogin(req, res)
    );

    this.userRouter.put(
      "/update/:id",
      userAuthMiddleware(["student", "admin"]),
      (req: Request, res: Response) =>
        this.studentController.updateProfile(req, res)
    );
    this.userRouter.post(
      "/logout",
      userAuthMiddleware(["student"]),
      (req: Request, res: Response) => this.studentController.logout(req, res)
    );
  }

  //this method expostes the router instances to main application(app.ts)
  public getStudentRoutes() {
    //this method will encapsulate all userRoutes
    return this.userRouter;
  }
}
