const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest");


userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",["firstName","lastName","age","about","gender","skills"]);

        res.json({
            message:"data fetched Succesfully",
            data:connectionRequest,
        });


    }catch(err){
        res.status(400).send("Error :"+err.message);
    }


});


module.exports=userRouter;