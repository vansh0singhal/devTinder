const express=require("express");
const {connectDB}=require("./config/database.js");
const cookieParser=require("cookie-parser");

const app=express();


app.use(express.json());
app.use(cookieParser());


const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");
const userRouter=require("./routes/user.js");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



connectDB().then(()=>{
    console.log("database connection is established");  
    app.listen(7777,()=>{
    console.log("Server is listen on the port 3000");
})
}).catch(err=>{
    console.error("database did not connected");
});