const express=require("express");

const app=express();


app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    //http://localhost:3000/user?userId=101&password=testing
    //console.log(req.query);
    res.send({firstname:"vansh",lastname:"singhal"});

});

//app.get("/user/:userId/:name/:password",(req,res)=>{console.log(req.params);});


app.listen(3000,()=>{
    console.log("Server is listening on the port 3000");
});
