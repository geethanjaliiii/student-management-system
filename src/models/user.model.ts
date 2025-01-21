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
            enum: ["student","teacher","principal"],
            required: true
        },
        isActive:{
            type: Boolean,
            default: true
        },
        grade:{
            type: String
        },
        section:{
            type: String
        },
        subject:{
            type: String
        },
        
    },
    {timestamps: true}
)

export const User = mongoose.model<IUser>('User',UserSchema)