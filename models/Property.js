const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    location: {
      url: String,
      label: String,
      latitude: Number,
      longitude: Number,
    },
    listingStatus: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    units: [
      {
        name: String,
        price: String,
        listingStatus: String,
        area: String,
        highlights: [
          {
            label: String,
            quantity: Number,
            iconType: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
