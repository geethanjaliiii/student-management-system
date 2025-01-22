import { IUser } from "../../interfaces/User";
import { User } from "../../models/user.model";
import { IAdminRepository } from "./IAdminRepository";

export class AdminRepository implements IAdminRepository {
    async createAdmin(name:string,email:string,password:string):Promise<IUser>{
       return await User.create({name,email,password,role:'admin'});
    }
    async findUserWithEmail(email: string): Promise<IUser | null> {
        return await User.findOne({email})
    }
    async getAllStudents(): Promise<IUser[]> {
        return await User.find({role:"student"}).select('-password')||[]
    }
    async getStudentById(id: string): Promise<IUser | null> {
        return await User.findById(id).select('-password')
    }
    async findStudentByIdAndDelete(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id)
    }
}