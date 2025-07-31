const express=require("express");
const {connectDB}=require("./config/database.js");
const cookieParser=require("cookie-parser");



const app=express();


app.use(express.json());
app.use(cookieParser());


const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



connectDB().then(()=>{
    console.log("database connection is established");  
    app.listen(3000,()=>{
    console.log("Server is listen on the port 3000");
})
}).catch(err=>{
    console.error("database did not connected");
});