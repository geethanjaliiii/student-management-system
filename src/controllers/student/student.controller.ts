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
            
        } catch (error) {
            
        }
    }
}