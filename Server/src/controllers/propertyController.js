const PropertyModel = require("../models/propertyModel");
const CategoryModel = require("../models/categoryModel");

const { isValid, isValidObjectId } = require("../utils/validator");

//Add Property (Owner)
const addProperty = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Update Property (Owner)
const updateProperty = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//delete Property (Owner)
const deleteProperty = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get My profile
const getMyProperties = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get All Properties (Search,Filter And Pagination)
const getAllProperty = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get property By ID
const getPropertyById = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  addProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  getAllProperty,
  getPropertyById,
};
