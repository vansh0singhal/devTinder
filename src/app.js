const express=require("express");
const {connectDB}=require("./config/database.js");
const User=require("./models/user.js");
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
        // const users=await User.find({emailId:userEmail});
        // if(users.length===0){
        //     res.status(404).send("User not found");

        // }else{
        //     res.send(users);
        // }
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});

app.post("/signup",async (req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.send("user data is succesfully added to the database");
    }catch(err){
        res.status(400).send("error while adding user"+ err.message);
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



connectDB().then(()=>{
    console.log("database connection is established");  
    app.listen(3000,()=>{
    console.log("Server is listen on the port 3000");
})
}).catch(err=>{
    console.error("database did not connected");
});