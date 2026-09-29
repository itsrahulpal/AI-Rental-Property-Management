const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        unique:true,
        required:true,
    },
    description: {
         type:String,
        required:true
    },
    categorystatus: {
        type:String,
        enum:["active","inactive"],
        default: "active"
    }
},
{timestamps: true});

module.exports = mongoose.model("Category",categorySchema);