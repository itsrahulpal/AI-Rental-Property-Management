const RentalRequest = require("../models/rentalReqModel");

const {authentication,authorization } = require("../middlewares/auth");
const Property = require("../models/propertyModel");
const { isValid, isValidObjectId } = require("../utils/validator");

//Send Rental Request
const sendRentalRequest = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get My Rental Request(User)
const getMyRentalReq = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Track Rental Request (User)
const trackRentalReq = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get Request for my Properties (Owner)
const getReqForMyProperties = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Approve Rental Request (Owner)
const approveRequest = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Reject Rental Request (Owner)
const rejectRequest = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  sendRentalRequest,
  getMyRentalReq,
  trackRentalReq,
  getReqForMyProperties,
  approveRequest,
  rejectRequest,
};
