const router = require("express").Router();

const {
  signup,
  login,
  getMyProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  delteAnyProfile,
} = require("../controllers/userController");

const { authentication, authorization } = require("../middlewares/auth");
//const upload = require("../config/multer");
//upload.single("profileImage")

router.post("/signup", signup);
router.post("/login", login);
router.get("/my-profile", authentication, getMyProfile);
router.put(
  "/update",
  authentication,
  updateProfile,
);
router.delete("/delete", authentication, deleteProfile);

//Admin Routes
router.get("/all-users", authentication, authorization("admin"), getAllUsers);
router.delete(
  "/delete-user/:id",
  authentication,
  authorization("admin"),
  delteAnyProfile,
);

module.exports = router;
