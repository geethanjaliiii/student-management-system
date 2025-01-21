import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()
export class ConnectMongo {
    private databaseUrl:string;
    constructor(){
        if(!process.env.MONGO_URI){
            throw new Error("MongoDB connection string is not defined")
        }
        this.databaseUrl=process.env.MONGO_URI
    }
    public async connectDB():Promise<void>{
      try {
        await mongoose.connect(this.databaseUrl)
        console.log("mongodb connected successfully");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      throw new Error("Failed to connect to MongoDB");
      }
    }
   
}
// export const connectDb = async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser:true,
//             useUnifiedTopology:true,
//         });
//         console.log("mongodb connected successfully");
        
//     } catch (error) {
//         console.error("Mongodb connection error,",error);
//         process.exit(1);
        
        
//     }
// }