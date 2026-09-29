const mongoose = require("mongoose");
const CategoryModel = require("../models/categoryModel");
const {
  isValid,
  isValidCategoryName,
  isValidObjectId,
} = require("../utils/validator");

//Add Category (admin)
const addCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get All Category
const getAllCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get Category By Id
const getCategoryById = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Update category
const updateCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Delete Category

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Provide valid Category Id" });
    }
    const category = await CategoryModel.findOne(categoryId);
    if (!category) {
      return res.stat;
    }
    await CategoryModel.findByIdAndDelete(category);
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
