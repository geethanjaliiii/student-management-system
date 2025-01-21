import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("mongodb connected successfully");
        
    } catch (error) {
        console.error("Mongodb connection error,",error);
        process.exit(1);
        
        
    }
}