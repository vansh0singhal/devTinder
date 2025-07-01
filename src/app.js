const express=require("express");

const app=express();

app.use("/hello",(req,res)=>{
    res.send("Hello from the hello server");

});

app.use("/test",(req,res)=>{
    res.send("Hello from the test server");

});

app.use("/",(req,res)=>{
    res.send("Hello main from the dashboard");

});


app.listen(3000,()=>{
    console.log("Server is listening on the port 3000");
});
