const express=require("express");
const {adminAuth,userAuth}=require("./middlewares/auth.js")


const app=express();

app.use("/admin",adminAuth);


app.post("/user/login",(req,res)=>{
    res.send("User Logged In");
});
app.get("/user/data",userAuth,(req,res)=>{
    res.send("user data sent")

});


app.get("/admin/getAllData",(req,res)=>{
    res.send("get all data");
});
app.get("/admin/deleteUser",(req,res)=>{
    res.send("deleted a user");   
});
app.listen(3000,()=>{
    console.log("Server is listening on the port 3000");
});


