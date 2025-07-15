const mongoose=require("mongoose");
const validator=require("validator");

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
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
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

const User=mongoose.model("user",userSchema);

module.exports=User;

