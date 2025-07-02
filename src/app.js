const express=require("express");

const app=express();

app.use("/user",
    (req,res,next)=>{
        console.log("handling the user route 1");
        next();
    },
    (req,res,next)=>{
        console.log("handling the user route 2");
        next();
    },
    (req,res,next)=>{
        console.log("handling the user route 3");
        next();
    },
    (req,res,next)=>{
        console.log("handling the user route 4");
        next();
    }
);

app.listen(3000,()=>{
    console.log("Server is listening on the port 3000");
});
