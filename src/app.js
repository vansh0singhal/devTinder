const express=require("express");

const app=express();
app.get("/user",(req,res)=>{
    res.send({firstname:"vansh",lastname:"singhal"});

});

app.post("/user",(req,res)=>{
    console.log("data save to db");
    res.send("data succesfully save to db");

});

app.delete("/user",(req,res)=>{
    res.send("delete data form db");

});



app.use("/test",(req,res)=>{
    res.send("Hello from the test server");

});


app.listen(3000,()=>{
    console.log("Server is listening on the port 3000");
});
