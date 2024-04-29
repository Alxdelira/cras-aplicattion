import mongoose from "mongoose";
import * as dotenv from "dotenv";



dotenv.config();


async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL || "");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);        
    }
}

connectDB();

let db = mongoose.connection;
export default db;
