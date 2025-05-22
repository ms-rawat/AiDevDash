import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected')
    }catch(error){
        console.error('mongodb connection error:',error.message)
        process.exit(1)
    }
}

export default connectDB
