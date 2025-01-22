import { AdminController } from "../controllers/admin/admin.controller";
import express, { Express, Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleWare";
export class AdminRoute {
  private adminController: AdminController;
  private adminRouter: express.Router;
  constructor(adminController: AdminController) {
    this.adminController = adminController;
    this.adminRouter = express.Router();
    this.setRoutes();
  }
  private setRoutes() {
    this.adminRouter.post("/register", (req: Request, res: Response) => {
      this.adminController.registerAdmin(req, res);
    });
    this.adminRouter.post("/login", (req: Request, res: Response) =>
      this.adminController.adminLogin(req, res)
    );
    this.adminRouter.get(
      "/students",
      userAuthMiddleware(["admin"]),
      (req: Request, res: Response) =>
        this.adminController.fetchStudents(req, res)
    );
    this.adminRouter.post(
      "/logout",
      userAuthMiddleware(["admin"]),
      (req: Request, res: Response) =>
        this.adminController.logoutAdmin(req, res)
    );
    this.adminRouter.delete(
      "/students/:id",
      userAuthMiddleware(["admin"]),
      (req: Request, res: Response) => this.adminController.deleteUser(req, res)
    );
  }
  public getAdminRoutes() {
    return this.adminRouter;
  }
}
