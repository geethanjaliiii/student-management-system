import mongoose from "mongoose";
import { IUser } from "../interfaces/User";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["student","admin"],
            default:"student"
        },
        isActive:{
            type: Boolean,
            default: true
        },
        course:{
            type: String
        },
        enrolmentDate:{
            type:Date,
            default:Date.now()
        }
    },
    {timestamps: true}
)

export const User = mongoose.model<IUser>('User',UserSchema)