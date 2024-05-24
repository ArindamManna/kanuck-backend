const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const builderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // required: [true, "Name is required Please specify your name"],
      // minlength: [3, "Name must be at least 3 characters long"],
      // maxlength: [100, "Name must be less than 100 characters long"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      url: String,
    },
    location: {
      url: String,
      label: String,
      latitude: Number,
      longitude: Number,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Builder", builderSchema);
