import express from "express"

const app = express()

const PORT:number = parseInt(process.env.PORT || "4000", 10);


app.use(express.json())

app.get("/api/v1/signup", (req,res)=>{
    const {email, password, name} = req.body
    

})


app.listen(4000,()=>{
    console.log(`Server Running at PORT ${PORT}`)
})