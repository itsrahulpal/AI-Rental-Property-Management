const UserModel = require("../models/userModel");
const CategoryModel = require("../models/categoryModel");
const PropertyModel = require("../models/propertyModel");
const RentalReqModel = require("../models/rentalReqModel");
 
//DashBoard Analytics(Admin)
const getDashboardStats = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
};

//Get All Properties - Platform wide(Admin) - all status ,all Owners
const getAllPropertiesAdmin = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
};


//Get All Rental req (Admin)
const getallRentalReqAdmin = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"});
    }
};

module.exports = {getDashboardStats,getAllPropertiesAdmin,getallRentalReqAdmin}