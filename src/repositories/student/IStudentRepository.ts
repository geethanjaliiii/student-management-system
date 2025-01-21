import { IUser } from "../../interfaces/User";

export interface IStudentRepository {
  createStudent(student: IUser): Promise<IUser>;
  updateStudent(id: string, student: Partial<IUser>): Promise<IUser | null>;
  findStudentByEmail(email: string): Promise<IUser | null>;
  findStudentById(id: string): Promise<IUser | null>;
}
