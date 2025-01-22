import { IUser } from "../../interfaces/User";

export  interface IAdminService{
createAdmin(name:string, email:string,password:string):Promise<IUser>;
adminLogin(email:string,password:string):Promise<IUser |null>
getAllStudents():Promise<IUser[]|[]>
findStudentByIdAndDelete(id:string):Promise<IUser|null>

}