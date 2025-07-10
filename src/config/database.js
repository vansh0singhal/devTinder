const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(
    "mongodb+srv://vanshsinghal101:SJOGdHjXJMYn4XlV@junenode.efwdf0t.mongodb.net/devTinder"
);
};

module.exports={connectDB};

