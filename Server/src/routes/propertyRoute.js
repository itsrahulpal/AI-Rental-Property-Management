const router = require("express").Router();

const { get } = require("mongoose");
const {
  addProperty,
  getAllProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  getPropertyById,
} = require("../controllers/propertyController");

const { authentication,authorization } = require("../middlewares/auth")

//Owner Routes
router.post("/add-property",authentication,authorization("owner"),addProperty);

router.put("/update/:id",authentication,authorization("owner"),updateProperty);

router.delete("/delete/:id",authentication,authorization("owner"),deleteProperty);

//Public Routes
router.get("/all-properties",authentication,get);
router.get("/get-property/:id",authentication,get);


module.exports = router;
