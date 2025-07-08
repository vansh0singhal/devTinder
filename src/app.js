const express=require("express");
const app=express();

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong");
    }
});

app.get("/getUserData",(req,res)=>{
    // try{
    //      
    // 
    //connection of db logic
    throw new Error("Random error");
    res.send("user data sent");

    // }catch(err){
    //     res.status(500).send("Some error occur with contact team");

    // }
   
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong");
    }
});



app.listen(3000,()=>{
    console.log("Server is listen on the port 3000");
})