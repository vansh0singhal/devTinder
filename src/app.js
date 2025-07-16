const express=require("express");
const {connectDB}=require("./config/database.js");
const User=require("./models/user.js");
const{validateSignupDate}=require("./utils/validation.js")
const bcrypt=require("bcrypt");
const app=express();

app.use(express.json());

app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.findOne({emailId:userEmail});
        
        if(!users){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});

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

//login api

app.post("/login",async(req,res)=>{
    try{
        const{emailId,password}=req.body;

        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Cridentials");
    }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("User Loggedin successfully");
        }else{
            throw new Error("Invalid Cridentials");
        }

    }catch(err){
        res.status(400).send("Error: "+err.message);

    }

});

//Feed API -get all the users form the database
app.get("/feed",async (req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

app.delete("/user",async (req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findOneAndDelete(userId);
        res.send("user deletd succesfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }

});

//update data of the user

app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATED=["photoUrl","about","gender","age","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>
        ALLOWED_UPDATED.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
    // if(data?.skills.length>10){
    //     throw new Error("skills can not be more than 10");
    // }
    const user=await User.findByIdAndUpdate(userId,data,{
        returnDocument:"after",
        runValidators:true,
    });
        console.log(user);
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("update failed:"+err.message);
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