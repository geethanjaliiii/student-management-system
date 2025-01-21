import { IUser } from "../../interfaces/User";

export interface IStudentService {
    createStudent(student: IUser):  Promise<IUser | null>;
    checkStudentExistance(email: string, password: string): Promise<IUser | null>;
    updateStudent(id: string, student: Partial<IUser>): Promise<IUser | null>;
    findStudentById(id:string): Promise<IUser | null>;
}