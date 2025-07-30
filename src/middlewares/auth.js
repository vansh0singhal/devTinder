const jwt=require("jsonwebtoken");
const User=require("../models/user.js")


const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies;

        if(!token){
            throw new Error("Token is not valid");
        }

        const decodedMessage=await jwt.verify(token,"DEV@TINDER$790");

        const {_id}=decodedMessage

        const user=await User.findById(_id);
        if(!user){
            throw new Error("User not exist");
        }

        //by this we do not need to find the user again in the main api
        req.user=user;
        next();
}catch(err){
    res.status(400).send("Error: "+err.message);
}
}

module.exports={
    userAuth,
}