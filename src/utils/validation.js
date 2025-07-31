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

const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","emailId","photoUrl","gender","age","about","skills"];

    const isEditAllowed=Object.keys(req.body).every(field=>
        allowedEditFields.includes(field)
    );
    
    return isEditAllowed;
}

module.exports={
    validateSignupDate,
    validateEditProfileData,
}