const mongoose = require("mongoose");

const connectDB = async (req,res) =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
        
    } catch (error) {
        console.log(error,"DB connection Failed");
        
    }
}
module.exports = connectDB;