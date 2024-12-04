import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const connectDB =async()=>{
    try {

        if(!process.env.MONGODB_URL) throw new Error("MONGODB URL in .env is undefined")

        await mongoose.connect(process.env.MONGODB_URL)

        console.log("MONGODB connection Successfull")

    } catch (error) {
        console.log(error)
    }
}

export default connectDB