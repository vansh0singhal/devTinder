const express=require("express");
const {connectDB}=require("./config/database.js");
const User=require("./models/user.js");
const{validateSignupDate}=require("./utils/validation.js")
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth.js");
const app=express();


app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res)=>{

   
    try{
        //validate data
        validateSignupDate(req);
        //encrypt the password
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHash= await bcrypt.hash(password,10);

        console.log(passwordHash);
        
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });

        await user.save();
        res.send("user data is succesfully added to the database");
    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }

});

app.post("/login",async(req,res)=>{
    try{
        const{emailId,password}=req.body;

        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Cridentials");
    }
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){

            //create a JWT token
            const token=await user.getJWT();


            // add that token to the cookiee and send the response back to the user
            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000),
            });
            res.send("User Loggedin successfully");
        }else{
            throw new Error("Invalid Cridentials");
        }

    }catch(err){
        res.status(400).send("Error: "+err.message);

    }

});

app.get("/profile",userAuth,async(req,res)=>{
   try{

    const user=req.user;
    res.send(user);
   }catch(err){
        res.status(400).send("Error"+err.message);
    }

});


app.post("/sendConnectionRequest",userAuth,(req,res)=>{

    const user=req.user;

    res.send(user.firstName+"sent the request");

});







connectDB().then(()=>{
    console.log("database connection is established");  
    app.listen(3000,()=>{
    console.log("Server is listen on the port 3000");
})
}).catch(err=>{
    console.error("database did not connected");
});