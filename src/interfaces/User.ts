export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    course?: string;
    role: 'Student'|"admin";
    isActive?:true;
    enrolementDate:string   
}