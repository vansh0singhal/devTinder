const express=require("express");
const {connectDB}=require("./config/database.js");
const User=require("./models/user.js");
const app=express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    //console.log(req.body);
    //creating the new instance of the user model
    const user=new User(req.body);
    try{
        await user.save();
        res.send("user data is succesfully added to the database");
    }catch(err){
        res.status(400).send("error while adding user"+ err.message);
    } 

});



connectDB().then(()=>{
    console.log("database connection is established");  
    app.listen(3000,()=>{
    console.log("Server is listen on the port 3000");
})
}).catch(err=>{
    console.error("database did not connected");
});