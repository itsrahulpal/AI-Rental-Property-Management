const mongoose = require("mongoose");

const rentalReqSchema = new mongoose.Schema({
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
propertyId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
},
ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
message:{
type: String,
default: "",
trim: true,
},
status: {
    type: String,
    enum: ["pending","approved","rejected"],
    default: "pending"
  },
},{timestamps:true});

module.exports = mongoose.model("RentalRequests",rentalReqSchema);