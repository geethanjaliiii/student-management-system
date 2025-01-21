"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ConnectMongo {
    constructor() {
        if (!process.env.MONGO_URI) {
            throw new Error("MongoDB connection string is not defined");
        }
        this.databaseUrl = process.env.MONGO_URI;
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.databaseUrl);
                console.log("mongodb connected successfully");
            }
            catch (error) {
                console.error("Error connecting to MongoDB:", error);
                throw new Error("Failed to connect to MongoDB");
            }
        });
    }
}
exports.ConnectMongo = ConnectMongo;
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
