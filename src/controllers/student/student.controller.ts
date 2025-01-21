import { Request,Response } from "express";
import { IStudentService } from "../../services/student/IStudent.service";
import { IUser } from "../../interfaces/User";


export class StudentController {
    private studentService:IStudentService;
    constructor(studentService:IStudentService){
        this.studentService=studentService
    }
    async studentRegister(req:Request,res:Response):Promise<void>{
        try {
            const student:IUser =req.body;
            const result = await this.studentService.createStudent(student)
            res.status(201).json({success:true,message:"Registration Successfull"})
        } catch (error) {
            console.error(error);
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
            
        }
    }
    async studentLogin(req: Request, res:Response):Promise<void> {
        try {
            const {email,password}=req.body as {
                email:string;
                password:string;
            };
            const student = await this.studentService.checkStudentExistance(email, password);

            const userData = {
                _id:student?._id,
                email:student?.email,
                role:student?.role
            };
            res.status(200).json({
                success:true,
                message:"Login successfull",
                user:userData
            })
        } catch (error) {
            console.error("error in login",error);
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
    // async studentLogout(req:AuthenticatedRequest,res:Response):Promise<void>{
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
}