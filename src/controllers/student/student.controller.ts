import { Request, Response } from "express";
import { IStudentService } from "../../services/student/IStudent.service";
import { IUser } from "../../interfaces/User";
import { Jwt } from "../../utils/jwtUtils";
import { AuthenticatedRequest } from "../../interfaces/AuthenticatedRequest";

export class StudentController {
  private studentService: IStudentService;
  constructor(studentService: IStudentService) {
    this.studentService = studentService;
  }
  async studentRegister(req: Request, res: Response): Promise<void> {
    try {
      const student: IUser = req.body;
      const result = await this.studentService.createStudent(student);
      res
        .status(201)
        .json({ success: true, message: "Registration Successfull" });
    } catch (error) {
      console.error("error in registration", error);
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
  async studentLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    console.log("stu registration", req.body);

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    try {
      //validate credentials
      const student = await this.studentService.checkStudentExistance(
        email,
        password
      );

      const userData = {
        _id: student?._id,
        email: student?.email,
        role: student?.role,
      };
      const jwtService = new Jwt();
      const token = jwtService.generateToken({
        id: student?._id,
        role: student?.role,
      });
      res.status(200).json({
        success: true,
        message: "Login successfull",
        user: userData,
        token: token,
      });
    } catch (error) {
      console.error("error in login", error);
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }
  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { id } = req.user as { id: string };
    const student = req.body;
    try {
      console.log(req.body);

      const updatedData = await this.studentService.updateStudent(id, student);
      res
        .status(200)
        .json({
          success: true,
          message: "User profile updated successfully",
          student: updatedData,
        });
    } catch (error) {
      console.error("Error in updating profile", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update profile", error });
    }
  }
}
