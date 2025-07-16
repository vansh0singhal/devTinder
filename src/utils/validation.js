const validator=require("validator");

const validateSignupDate=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName|| !lastName){
        throw new Error("Enter first and last name correctly!")
    }else if(!validator.isEmail(emailId)){
        throw new Error("enter correct email");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
};

module.exports={
    validateSignupDate,
}