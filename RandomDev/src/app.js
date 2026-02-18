require('dotenv').config();
const express=require("express");
const {connectionDB} = require("./config/database.js");
const app=express();
const cookieParser=require("cookie-parser");
const cors=require("cors")



app.use(cors({
     origin: [
    "http://localhost:5173",
    "https://randomdev.vercel.app"
  ],
    credentials:true,
}));


app.use(express.json());
app.use(cookieParser());


const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectionDB()
.then(()=>{
    console.log("database connection establised");
    app.listen(process.env.PORT || 3000,()=>{
        console.log("server is listening successfully on port " + process.env.PORT);
        console.log("CORS ORIGIN:", process.env.CORS_ORIGIN);
    });
    
    })
    .catch((err)=>{
        console.log("cannot connect db")
});

 


