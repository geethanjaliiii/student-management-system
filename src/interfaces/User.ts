export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: 'Student'|"Teacher"|'pricipal';
    isActive?:true;
    grade?: string;
    section?: string;
    subject?: string;
}