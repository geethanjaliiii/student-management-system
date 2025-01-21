import { IStudentRepository } from "./IStudentRepository";
import { User } from "../../models/user.model";
import { IUser } from "../../interfaces/User";

export class studentRepository implements IStudentRepository {
  async createStudent(student: IUser): Promise<IUser> {
    return await User.create(student);
  }
  async updateStudent(
    id: string,
    student: Partial<IUser>
  ):Promise<IUser | null>{
    return await User.findByIdAndUpdate(id, student, {new: true});
  }
  async findStudentByEmail(email:string):Promise<IUser |null>{
    return await User.findOne({email:email});
  }
  async findStudentById(id: string): Promise<IUser | null> {
      return await User.findById(id)
  }
}