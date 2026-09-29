const mongoose = require("mongoose");

const rentalReqSchema = new mongoose.Schema({

},{timestamps:true});

module.exports = mongoose.model("RentalRequests",rentalReqSchema);