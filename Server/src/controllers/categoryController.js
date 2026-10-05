const mongoose = require("mongoose");
const CategoryModel = require("../models/categoryModel");
const {
  isValid,
  isValidCategoryName,
  isValidObjectId,
} = require("../utils/validator");
const categoryModel = require("../models/categoryModel");

//Add Category (admin)
const addCategory = async (req, res) => {
  try {
    let categoryData = req.body;

    if(!categoryData || Object.keys(categoryData).length === 0){
      return res.status(400).json({msg:"Bad Request! No Data Provided"});
    }
     let {categoryName , description , categoryStatus} = categoryData;

     //Category Name Validation
     if(!isValid(categoryName)){
      return res.status(400).json({msg:"Category Name is Required"});
     }
     if(!isValidCategoryName(categoryName)){
      return res.status(400).json({msg:"Invalid Category Name"});
     }

     let duplicateCategoryName = await categoryModel.findOne({categoryName});

     if(duplicateCategoryName){
      return res.status(400).json({msg:"Category Name already Exists"});
     }

     //Description Validation
     if(!isValid(description)){
      return res.status(400).json({msg:"Description is Required"});
     }
     if(description.length > 10 || description.length < 300){
      return res.status(400).json({msg:"description should be greater than 10 and less than 300 Characters"});
     }

     //Status validation
     if(categoryStatus !== undefined){
       if(categoryStatus !=="active" && categoryStatus !=="inactive"){
        return res.status(400).json({msg:"Invalid Status"});
       }
     }
     //Add Category to database
     let category = await categoryModel.create(categoryData);
     
     return res.status(200).json({msg:"category Created Successfully",category});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get All Category
const getAllCategory = async (req, res) => {
  try {
    let category = await categoryModel.find();

    if(category.length === 0){
      return res.status(404).json({msg:"Categories Not Found"});
    }
    return res.status(200).json({msg:"categories  Fetched Successfully",totalCategory: category.length,
      category
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get Category By Id
const getCategoryById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    if(!isValidObjectId(categoryId)){
      return res.status(400).json({msg:"Invalid Category ID"});
    }
    let category = await categoryModel.findById(categoryId);
    if(!category){
      return res.status(404).json({msg:"Category Not Found"});
    }
    return res.status(200).json({msg:"Category Fetched successfully",category});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Update category (Admin)
const updateCategory = async (req, res) => {
  try {
    let categoryId = req.params.id;
    if(!isValidObjectId(categoryId)){
      return res.status(400).json({msg:"Invalid Category ID"});
    }
    let categoryData = req.body;

    if(!categoryData || Object.keys(categoryData).length === 0){
      return res.status(400).json({msg:"Bad Request! Enter Data to update"});
    }
     let {categoryName , description , categoryStatus} = categoryData;

     //Category Name Validation
     if(categoryName !== undefined){
      if(!isValid(categoryName)){
      return res.status(400).json({msg:"Category Name is Required"});
      }
     }
     if(!isValidCategoryName(categoryName)){
      return res.status(400).json({msg:"Invalid Category Name"});
     }

     let duplicateCategoryName = await categoryModel.findOne({categoryName , _id: {$ne: categoryId}
    });

     if(duplicateCategoryName){
      return res.status(400).json({msg:"Category Name already Exists"});
     }

     //Description Validation
     if(description !== undefined){
      if(!isValid(description)){
      return res.status(400).json({msg:"Description is Required"});
      }
     }
     if(description.length > 10 || description.length < 300){
      return res.status(400).json({msg:"description should be greater than 10 and less than 300 Characters"});
     }

     //Status validation
     if(categoryStatus !== undefined){
       if(categoryStatus !=="active" && categoryStatus !=="inactive"){
        return res.status(400).json({msg:"Invalid Status"});
       }
     }
     //Add Category to database
     let updatedCategory = await categoryModel.findOneAndUpdate(categoryId,categoryData,{new: true},);
     if(!updatedCategory){
      return res.status(404).json({msg:"Category Not Found"});
     }
     return res.status(200).json({msg:"category Created Successfully",updatedCategory});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Delete Category (Admin)

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Provide a valid Category Id" });
    }
    const category = await CategoryModel.findOne(categoryId);
    if (!category) {
      return res.status(404).json({msg:"Category Not Found"});
    }
    await CategoryModel.findByIdAndDelete(categoryId);
    return res.status(200).json({ msg: "Category Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
