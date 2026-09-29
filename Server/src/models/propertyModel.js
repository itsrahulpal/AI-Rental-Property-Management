const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: true,
      required: true,
    },
    bedRooms: {
      type: true,
      required: true,
    },
    bathRooms: {
      type: true,
      required: true,
    },
    area: {
      type: true,
      required: true,
    },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["available", "renred", "inactive"],
      default: "available",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Property", propertySchema);
