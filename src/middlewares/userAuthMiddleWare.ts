import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { Jwt } from "../utils/jwtUtils";

export const userAuthMiddleware =(allowedRoles:string[]=[])=>{
   return async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          
          
         res.status(401).json({ message: "Unauthorized" });
         return
        }
        try {
          const jwtService = new Jwt();
          const decoded = jwtService.verifyToken<{id:string; role:string}>(token);
          //attaching data to the req object
          req.user = decoded;
          console.log(decoded);
          
          //Role-based-authentication
          if(allowedRoles.length>0 && !allowedRoles.includes(decoded?.role)){
             res.status(401).json({success:false,message:"Unauthorized: Invalid or expired token" })
             return
            }
          next();
        } catch (error) {
          console.error("Token error", error);
      
           res.status(401).json({ message: "Not authorized, token failed" });
           return
        }
      };
      
}