import { IUser } from "../../interfaces/User";
import { IAdminRepository } from "../../repositories/teacher/IAdminRepository";
import { BcryptPass } from "../../utils/bcrypt";
import { Jwt } from "../../utils/jwtUtils";
import { IAdminService } from "./IAdmin.service";

export class AdminService implements IAdminService{
    private adminRepository:IAdminRepository;
    private bcryptpass:BcryptPass
    constructor(adminRepository:IAdminRepository){
        this.adminRepository=adminRepository;
        this.bcryptpass= new BcryptPass()
    }
    //create admin
    async createAdmin(name: string, email: string, password: string): Promise<IUser> {
        const isAdminAlreadyExist= await this.adminRepository.findUserWithEmail(email)
       if(isAdminAlreadyExist){
        throw new Error("Email already exist")
       }
       const hashedPassword = await this.bcryptpass.hashPassword(password)
        return await this.adminRepository.createAdmin(name,email,hashedPassword)
    }
    async adminLogin(email: string, password: string): Promise<IUser> {
       const adminExist= await this.adminRepository.findUserWithEmail(email)
       if(!adminExist){
        throw new Error("Email not reistered.")
       }
       const samePassword=await this.bcryptpass.comparePassword(password,adminExist.password)
       console.log('pass',password,adminExist.password,samePassword);
       
       if(!samePassword){
        throw new Error("Incorrect email or password")
       }
     
       return adminExist;
    }
    async getAllStudents(): Promise<IUser[] | []> {
        return await this.adminRepository.getAllStudents()||[]
    }
    async findStudentByIdAndDelete(id: string): Promise<IUser | null> {
        return await this.adminRepository.findStudentByIdAndDelete(id)
    }
   
}