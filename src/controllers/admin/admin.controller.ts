import { Request, Response } from "express";
import { IAdminService } from "../../services/admin/IAdmin.service";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";
import { Jwt } from "../../utils/jwtUtils";

export class AdminController {
  private adminService: IAdminService;
  constructor(adminService: IAdminService) {
    this.adminService = adminService;
  }
  async registerAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body as {
        name: string;
        email: string;
        password: string;
      };
      await this.adminService.createAdmin(name, email, password);
      res
        .status(201)
        .json({ success: true, message: "Registered successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }
  }
  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }
      const admin = await this.adminService.adminLogin(email, password);
      const jwtService = new Jwt();
      const token = jwtService.generateToken({
        id: admin?._id,
        role: admin?.role,
      });
      const adminData={
        _id:admin?._id,
        email: admin?.email,
        role: admin?.role,
      }
      
      res.status(200).json({ success: true, message: "Login successfull",adminData,token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }
  }
  async logoutAdmin(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      res.clearCookie("userToken");
      res.status(200).json({ success: true, message: "Logout success" });
    } catch (error) {
      console.error("Error logging out admin", error);

      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async fetchStudents(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const students = await this.adminService.getAllStudents();
      res
        .status(200)
        .json({ success: true, message: "Student details fetched", students });
    } catch (error) {
      console.error("Error fetching students");

      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      this.adminService.findStudentByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Student removed" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "An error occured" });
      }
    }
  }
}
