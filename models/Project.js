const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      url: String,
      label: String,
      latitude: Number,
      longitude: Number,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    tags: [
      {
        label: String,
      },
    ],
    price: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    images: [
      {
        url: String,
      },
    ],
    builderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Builder",
    },
    listingStatus: {
      type: String,
      required: true,
    },
    amenitiesList: [
      {
        label: String,
      },
    ],
    highlights: [
      {
        label: String,
        quantity: Number,
        iconType: String,
      },
    ],
    fearutesFinished: {
      title: String,
      subTitle: String,
      description: String,
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
