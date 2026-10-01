const ai = require("../config/gemini");
const PropertyModel = require("../models/propertyModel");
const RentalReqModel = require("../models/rentalReqModel");
const { isValid, isValidObjectId } = require("../utils/validator");

const MODEL_NAME = "gemini-3.6-flash";

const parsedJSON = (text) => {
  let cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
};

//AI Property Description Generator (Owner)
const generationDescription = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//AI  Property Summary Generation
const generateSummary = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//AI Property Requirement Analysis (User)
const analysisRequirement = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//AI Property Recommendation (User)
const recommendProperty = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  generationDescription,
  generateSummary,
  analysisRequirement,
  recommendProperty,
};
