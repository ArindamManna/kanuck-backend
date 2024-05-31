const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      from: String,
      to: String,
    },
    location: {
      url: String,
      label: String,
      latitude: Number,
      longitude: Number,
    },
    listing_status: {
      type: String,
    },
    images: [
      {
        url: String,
      },
    ],
    details: {
      buildingType: String,
      ownership: {
        ownerName: String,
      },
      propertieType: String,
      sellingStatus: String,
    },
    description: {
      type: String,
    },
    tags: [
      {
        label: String,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    highlights: [
      {
        label: String,
        quantity: String,
        type: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
