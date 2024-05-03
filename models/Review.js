const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    permission: {
      type: Boolean,
      default: false,
    },
    reviewOn: {
      type: String,
      required: true,
      enum: ["Project", "Property", "Builder"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
