const express = require("express").Router();

const {
  generationDescription,
  generateSummary,
  analysisRequirement,
  recommendProperty,
} = require("../controllers/aiController");

const { authentication, authorization } = require("../middlewares/auth");

//Owner Routes
router.post("/generate-description",authentication,authorization("owner"),generationDescription);

//User Route
router.post("/analyse-requirement",authentication,authorization("user"),analysisRequirement);

router.post("/recommend",authentication,authorization("user"),recommendProperty);

//Logged-In User Route
router.post("/summary/:id",authentication,generateSummary);

module.exports = router;

