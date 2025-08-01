const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password"+value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","others"],
            message:`{VALUE} is not a valid gender`
        },
    },
    photoUrl:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/anonymous-profile-illustration-person-grey-silhouette-figure-white-collar-black-sweater-hair-avatar-default-profile-386973338.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("url is not coorect"+value);
            }
        }
    },
    about:{
        type:String,
        default:"This is the default about of user",
    },
    skills:{
        type:[String],
    },

},{
    timestamps:true,
});

userSchema.methods.getJWT=async function(){
    const user=this;

    const token= await jwt.sign({_id:user._id},"DEV@TINDER$790",{
        expiresIn:"1d",
    });
    
    return token;
};

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;

    const isValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isValid;

};

const User=mongoose.model("user",userSchema);

module.exports=User;

