import express,{Request, Response} from "express"
import dotenv from "dotenv"
import connectDB from "./config/database";
import cookieParser from "cookie-parser"
import { auth } from "./middlewares/auth";
import cors from "cors"
import { fetchUserDetails, signin, signup } from "./controllers/auth";
import { changeContentPrivacy, createContent, deleteContent, fetchContent, getSharedContent } from "./controllers/content";

const app = express()

dotenv.config()

app.use(cookieParser())

const PORT:number = parseInt(process.env.PORT || "4000", 10);

app.use(express.json())

app.use(
    cors({
      origin: process.env.REACT_APP_BASE_URL,
      credentials: true,
    })
  );


  app.get("/api/v1", (req:Request,res:Response)=>{
    res.status(200).json({
      success:true,
      message:"Server is upand running"
      
    })
  })

app.post("/api/v1/signup", signup)

app.post("/api/v1/signin", signin)

app.post("/api/v1/content",auth ,createContent)

app.get("/api/v1/content", auth, fetchContent)

app.delete("/api/v1/delete", auth, deleteContent)

app.get("/api/v1/shared/:id", getSharedContent)

app.put("/api/v1/share/:id",auth, changeContentPrivacy)

app.get("/api/v1/userDetails", fetchUserDetails)


connectDB().then(()=>{
    app.listen(4000,()=>{
        console.log(`Server Running at PORT ${PORT}`)
    })
})

