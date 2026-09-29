const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type : String,
            required : true,
            trim : true,
        },
        email: {
            type : String,
            required : true,
            unique : true,
            trim : true,
        },
        password: {
            type : String,
            required : true,
        },
        phone: {
            type : String,
            required : true,
            unique : true,
            trim : true,
        },
        role: {
            type : String,
            enum : ["admin","user","owner"],
            default : "user",
        },
        bio: {
            type:String,
            default : "",
            trim : true
        },
        profile: {
            type:String,
            default : ""
        },
    },
    {timestamps : true},
);
 module.exports = mongoose.model("user",userSchema);
