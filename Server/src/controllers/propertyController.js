const PropertyModel = require("../models/propertyModel");
const CategoryModel = require("../models/categoryModel");

const { isValid, isValidObjectId } = require("../utils/validator");
const propertyModel = require("../models/propertyModel");

//Add Property (Owner)
const addProperty = async (req, res) => {
  try {
    let propertyData = req.body;
    if (!propertyData || Object.keys(propertyData).length === 0) {
      return res.status(400).json({ msg: "Bad Request! No Data Provided" });
    }

    let {
      title,
      description,
      categoryId,
      location,
      price,
      bedRooms,
      bathRooms,
      area,
      images,
      status,
    } = propertyData;

    //Title validation
    if (!isValid(title)) {
      return res.status(400).json({ msg: "Property Title is required" });
    }
    //Description Validation
    if (!isValid(description)) {
      return res.status(400).json({ msg: "Property Description is required" });
    }
    if (description.length > 10 || description.length > 400) {
      return res
        .status(400)
        .json({
          msg: "Description should be less than 400 and greater than 10 characters.",
        });
    }
    //CategoryId Validation
    if (!isValid(categoryId)) {
      return res.status(400).json({ msg: "Category Id is Required" });
    }
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid Category Id" });
    }

    //Location validation
    if (!isValid(location)) {
      return res.status(400).json({ msg: "Location is required" });
    }
    //Price Validation
    if (!isValid(price)) {
      return res.status(400).json({ msg: "price is required" });
    }
    if (Number(price) <= 0) {
      return res.status(400).json({ msg: "Invalid Price" });
    }

    //BedRooms Validation
    if (!isValid(bedRooms)) {
      return res.status(400).json({ msg: "Bedrooms are required" });
    }
    if (Number(bedRooms) <= 0) {
      return res.status(400).json({ msg: "Invalid Bedroom Number" });
    }

    //BathRooms Validation
    if (!isValid(bathRooms)) {
      return res.status(400).json({ msg: "Bathrooms are required" });
    }
    if (Number(bathRooms) <= 0) {
      return res.status(400).json({ msg: "Invalid Bbathroom Number" });
    }

    //Area Validation
    if (!isValid(area)) {
      return res.status(400).json({ msg: "Area is  required" });
    }
    if (Number(area) <= 0) {
      return res.status(400).json({ msg: "Invalid Area" });
    }

    //Status validation
    if (status !== undefined) {
      if (!["available", "rented", "inactive"].includes(status)) {
        return res.status(400).json({ msg: "Invalid Status" });
      }
    }

    //Image Validation
    if (req.files && req.files.length > 0) {
      propertyData.images = req.files.map((file) => file.filename);
    }
    propertyData.ownerId = req.userId;

    let propertyAdded = await propertyModel.create(propertyData);
    return res
      .status(201)
      .json({ msg: "Property Added Successfully.", propertyAdded });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Update Property (Owner)
const updateProperty = async (req, res) => {
  try {
    let propertyId = req.params.id;
    if(!isValidObjectId(propertyId)){
        return res.status(400).json({ msg: "Invalid Property Id" });
    }
    let property = await propertyModel.findById(propertyId);

    if(!property){
        return res.status(404).json({ msg: "Property Not Found" });
    }

    if(property.ownerId.toString() !== req.userId.toString()){
        return res.status(403).json({ msg: "You Can Update Your Own Property" });
    }
    let propertyData = req.body;
    if (!propertyData || Object.keys(propertyData).length === 0) {
      return res.status(400).json({ msg: "Bad Request! No Data Provided" });
    }

    let {
      title,
      description,
      categoryId,
      location,
      price,
      bedRooms,
      bathRooms,
      area,
      status,
    } = propertyData;

    //Title validation
    if(title !== undefined){
        if (!isValid(title)) {
      return res.status(400).json({ msg: "Property Title is required" });
      }
    }
    //Description Validation
    if(description !== undefined){
    if (!isValid(description)) {
      return res.status(400).json({ msg: "Property Description is required" });
    }
    if (description.length > 10 || description.length > 400) {
      return res
        .status(400)
        .json({
          msg: "Description should be less than 400 and greater than 10 characters.",
        });
    }
 }
    //CategoryId Validation
    if(categoryId !== undefined){
    if (!isValid(categoryId)) {
      return res.status(400).json({ msg: "Category Id is Required" });
    }
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid Category Id" });
    } 
}

    //Location validation
    if(location !== undefined){
    if (!isValid(location)) {
      return res.status(400).json({ msg: "Location is required" });
    }
}
    //Price Validation
    if(price !== undefined){
    if (!isValid(price)) {
      return res.status(400).json({ msg: "price is required" });
    }
    if (Number(price) <= 0) {
      return res.status(400).json({ msg: "Invalid Price" });
    }
}

    //BedRooms Validation
    if(bedRooms !== undefined){
    if (!isValid(bedRooms)) {
      return res.status(400).json({ msg: "Bedrooms are required" });
    }
    if (Number(bedRooms) <= 0) {
      return res.status(400).json({ msg: "Invalid Bedroom Number" });
    }
}

    //BathRooms Validation
    if(bathRooms !== undefined){
    if (!isValid(bathRooms)) {
      return res.status(400).json({ msg: "Bathrooms are required" });
    }
    if (Number(bathRooms) <= 0) {
      return res.status(400).json({ msg: "Invalid Bbathroom Number" });
    }
    }
    //Area Validation
    if(area !== undefined){
    if (!isValid(area)) {
      return res.status(400).json({ msg: "Area is  required" });
    }
    if (Number(area) <= 0) {
      return res.status(400).json({ msg: "Invalid Area" });
    }
}

    //Status validation
    if (status !== undefined) {
      if (!["available", "rented", "inactive"].includes(status)) {
        return res.status(400).json({ msg: "Invalid Status" });
      }
    }

    //Image Validation
    if (req.files && req.files.length > 0) {
      propertyData.images = req.files.map((file) => file.filename);
    }
    

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
