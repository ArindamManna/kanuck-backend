const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      url: String,
      label: String,
      lat: String,
      lng: String,
    },
    price: {
      from: String,
      to: String,
    },
    images: [
      {
        url: String,
      },
    ],
    floorPlans: {
      heading: String,
      text: String,
    },
    description: {
      type: String,
    },
    overview: {
      type: String,
    },
    details: {
      buildingType: String,
      ownership: {
        ownerName: String,
      },
      sellingStatus: String,
      interiorDesigner: {
        name: String,
      },
      architect: {
        name: String,
      },
      marketingCompany: {
        name: String,
        marketingSummery: String,
      },
      salesCompany: {
        name: String,
      },
    },
    amenitiesList: [
      {
        label: String,
      },
    ],
    highlights: [
      {
        label: String,
        quantity: String,
        type: { type: String },
      },
    ],
    features_finises: {
      title: String,
      subTitle: String,
      description: String,
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
        value: String,
      },
    ],

    builderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Builder",
    },
    listingStatus: {
      type: String,
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
