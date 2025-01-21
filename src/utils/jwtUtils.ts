import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()


  export class Jwt{
    private secretKey:string;
    constructor(){
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
          }
        this.secretKey=process.env.JWT_SECRET;
    }
    public generateToken(payload:object,expiresIn:string |number='1h'):string{
        return jwt.sign(payload,this.secretKey,{expiresIn})
    }
    public verifyToken<T>(token:string):T {
        return jwt.verify(token,this.secretKey) as T;
    }
  }
