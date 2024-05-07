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
    listingStatus: {
      type: String,
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
