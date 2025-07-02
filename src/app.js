const express=require("express");

const app=express();

// get =>/user==> middleware chain ==> request handler
app.use("/",(req,res,next)=>{
    //res.send("hello from the /");
    next();

});

app.get("/user",
    (req,res,next)=>{
        next();

    },
    (req,res,next)=>{
        res.send("helo helo helo");

    },
    (req,res,next)=>{
        res.send("heelo from the user");

    },

)

app.listen(3000,()=>{
    console.log("Server is listening on the port 3000");
});
