const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  isValid,
  isValidFullName,
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidObjectId,
} = require("../utils/validator");

//signup Api
const signup = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad request! No Data Provided" });
    }

    let { fullName, email, password, phone, bio, role } = userData;

    //FullName Validation

    if (!isValid(fullName)) {
      return res.status(400).json({ msg: "Full Name is required" });
    }
    if (!isValidFullName(fullName)) {
      return res.status(400).json({ msg: "Invalid FullName" });
    }

    //Email Validation
    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
    let duplicateEmail = await userModel.findOne({ email });
    if (duplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    //password Validation
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is required" });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    //phone validation
    if (!isValid(phone)) {
      return res.status(400).json({ msg: "Phone Number is required" });
    }
    if (!isValidPhone(phone)) {
      return res.status(400).json({ msg: "Invalid Phone Number" });
    }
    let duplicatePhone = await userModel.findOne({ phone });
    if (duplicatePhone) {
      return res.status(400).json({ msg: "Phone Number Already Exists" });
    }

    //bio validation
    if (bio !== undefined) {
      if (bio.length < 15 && bio.length > 200) {
        return res
          .status(400)
          .json({ msg: "Bio Cannot be less than 15 Characters" });
      }
    }

    //Role Validation
    if (bio !== undefined) {
      if (role !== "user" && role !== "owner") {
        return res.status(400).json({ msg: "Invalid Role" });
      }
    }

    //Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    //Profile Image
    if (req.file) {
      userData.profileImage = req.file.filename;
    }

    const user = await userModel.create(userData);
    return res.status(201).json({ msg: "Signup Successfull", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//login Api
const login = async (req, res) => {
  try {
    let userData = req.body;
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad Request! No Data Provided" });
    }
    let { email, password } = userData;

    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).jspn({ msg: "No User Found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }

    let token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" },
    );
    return res.status(200).json({
      msg: "Login Successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Get My Profile
const getMyProfile = async (req, res) => {
  try {
    let userId = req.userId;
    if (!isValid(userId)) {
      return res.status(400).json({ msg: " User Id is Required" });
    }
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ msg: " Invalid User Id " });
    }
    let user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: " User Not Found" });
    }
    return res.status(200).json({ msg: " Profile Fetched Successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }

  //Update Profile
  const updateProfile = async (req, res) => {
    try {
      let userId = req.userId;
      let userData = req.body;

      if (!userData || Object.keys(userData).length === 0) {
        return res
          .status(400)
          .json({ msg: " Bad Request! No Data Provided To Update" });
      }
      let { fullName, email, password, phone, bio } = userData;

      if (fullName !== undefined) {
        if (!isValid(fullName)) {
          return res.status(400).json({ msg: "Full Name is Required" });
        }

        if (!isValidFullName(fullName)) {
          return res.status(400).json({ msg: "Invalid Fullname" });
        }
      }

      if (email !== undefined) {
        if (!isValid(email)) {
          return res.status(400).json({ msg: "Email is Required" });
        }

        if (!isValidEmail(email)) {
          return res.status(400).json({ msg: "Invalid Email" });
        }
        let duplicateEmail = await userModel.findOne({
          email,
          _id: { $ne: userId },
        });
        if (duplicateEmail) {
          return res.status(400).json({ msg: "Email Already Exists" });
        }
      }
      if (password !== undefined) {
        if (!isValid(password)) {
          return res.status(400).json({ msg: "Password is Required" });
        }

        if (!isValidPassword(password)) {
          return res.status(400).json({ msg: "Invalid Password" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
      }
      if (phone !== undefined) {
        if (!isValid(phone)) {
          return res.status(400).json({ msg: "Phone Number is Required" });
        }

        if (!isValidPhone(phone)) {
          return res.status(400).json({ msg: "Invalid Phone Number" });
        }

        let duplicatePhone = await UserModel.findOne({
          phone,
          _id: { $ne: userId },
        });
        if (duplicatePhone) {
          return res.status(400).json({ msg: "Phone Number Already Exists" });
        }
      }

      if (bio !== undefined) {
        if (bio.length < 15 && bio.length > 200) {
          return res
            .status(400)
            .json({ msg: "Bio Cannot be less than 15 Characters." });
        }
      }

      //Profile Image
      if (req.file) {
        userData.profileImage = req.file.filename;
      }
      let updatedUserProfile = await userModel
        .findByIdAndUpdate(userId, userData, { new: true })
        .select("-password");

      return res
        .status(200)
        .json({ msg: "Profile Updated Successfully", updatedUserProfile });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  //Delete Profile
  const deleteProfile = async (req, res) => {
    try {
      let userId = req.userId;

      let deleteUser = await userModel.findByIdAndDelete(userId);

      if (!deleteUser) {
        return res
          .status(404)
          .json({ msg: "User Not Found or already Deleted" });
      }

      return res.status(200).json({ msg: "User Deleted Successsfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  //Get All users (Admin)
  const getAllUsers = async (req,res) => {
    try {
      let {role} = req.query;
      let filter = {};
      if(role !== undefined){
        if(role !=="admin" && role !=="aowner" && role !=="user"){
          return res.status(400).json({ msg: "Invalid Role" });
        }
        filter.role = role;
      }
      let users = await userModel.find(filter).select("-password");

      if(!users.length ===0){
        return res.status(404).json({ msg: "No Users Found" });
      }

      return res.status(200).json({ msg: "Users Fetched Successfully",users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  //Delete AnyUser (Admin)
  const delteAnyUser = async (req,res) => {
    try {
            let userId = req.params.id;
      if(!isValidObjectId(userId)){
        return res.status(400).json({ msg: "Invalid User Id" });
      }
      let user = await userModel.findById(userId);

      if(user.role === "admin"){
        return res.status(400).json({ msg: "Admin Cannot be Deleted" });
      }
      await userModel.findByIdAndDelete(userId);

      return res.status(200).json({ msg: "User Deleted Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  };

};
module.exports = { signup, login ,getMyProfile,updateProfile,deleteProfile,getAllUsers,deleteAnyUser};
