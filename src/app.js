const express=require("express");
const {connectDB}=require("./config/database.js");
const User=require("./models/user.js");
const app=express();


app.post("/signup",async (req,res)=>{
    //creating the new instance of the user model
    const user=new User({
        firstName:"Vansh",
        lastName:"Singhal",
        emailId:"vanshsinghal1@gmail.com",
        password:"vansh123@",
    });
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