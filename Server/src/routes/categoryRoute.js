const router = require("express").Router();

const {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { authentication, authorization } = require("../middlewares/auth");


//Admin Routes
router.post("/add-category",authentication,authorization("admin"),addCategory);
router.put("/update",authentication,authorization("admin"),updateCategory);
router.delete("/delete",authentication,authorization("admin"),deleteCategory);

//Public routes
router.get("/all-categories",authentication,getAllCategory);
router.get("/get-category/:id",authentication,getCategoryById);


module.exports = router;
