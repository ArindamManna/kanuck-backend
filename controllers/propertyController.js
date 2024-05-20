const Project = require("../models/Project");
const Property = require("../models/Property");
const Review = require("../models/Review");

const addProperty = async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId);
  if (!project) {
    throw Error("Project not found");
  }
  const properties = [];
  for (let i = 0; i < req.body.length; i++) {
    const property = await Property.create(req.body[i]);
    project.properties.push(property._id);
    properties.push(property);
  }
  await project.save();
  return res.status(200).json(properties);
};

const propertyReview = async (req, res) => {
  const { title, rating, review } = req.body;
  const propertyId = req.params.propertyId;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw Error("Property not found");
  }

  const createReview = await Review.create({
    userId: req.user._id,
    rating,
    title,
    review,
    reviewOn: "Property",
  });

  await property.updateOne({ $addToSet: { reviews: createReview._id } });
  return res.status(200).json(createReview);
};

const getProperty = async (req, res) => {
  const propertyId = req.params.propertyId;
  const property = await Property.findById(propertyId);

  if (!property) {
    throw Error("Project not found");
  }

  await property.populate("reviews");

  return res.status(200).json(property);
};

const getAllProperty = async (req, res) => {
  const properties = await Property.find({}).populate("reviews");
  return res.status(200).json(properties);
};

const addTags = async (req, res) => {
  const { tags } = req.body;
  const property = await Property.findByIdAndUpdate(
    req.params.propertyId,
    {
      $addToSet: { tags },
    },
    { new: true }
  );
  return res.status(200).json(property);
};

const addUnits = async (req, res) => {
  const { units } = req.body;
  const property = await Property.findByIdAndUpdate(
    req.params.propertyId,
    {
      $addToSet: { units },
    },
    { new: true }
  );
  return res.status(200).json(property);
};

const addUnitsHighlights = async (req, res) => {
  const { highlights } = req.body;

  const propertyId = req.query.propertyId;
  const unitsId = req.query.unitsId;

  const property = await Property.findById(propertyId);
  const unitIndex = property.units.findIndex((unit) => unit._id == unitsId);

  if (unitIndex === -1) {
    throw Error("Unit not found");
  }

  property.units[unitIndex].highlights.push(highlights);
  await property.save();
  return res.status(200).json(property);
};

const getPropertyReviews = async (req, res) => {
  const reviews = await Review.find({
    permission: true,
    reviewOn: "Property",
  });
  return res.status(200).json(reviews);
};

const updateProperty = async (req, res) => {
  const propertyId = req.params.propertyId;
  const property = await Property.findByIdAndUpdate(propertyId, req.body, {
    new: true,
  });
  return res.status(200).json(property);
};
const deleteProperty = async (req, res) => {
  const propertyId = req.params.propertyId;
  const property = await Property.findByIdAndUpdate(propertyId);
  return res.status(200).json(property);
};

module.exports = {
  propertyReview,
  getPropertyReviews,
  addTags,
  addUnits,
  addUnitsHighlights,
  addProperty,
  getProperty,
  getAllProperty,
  updateProperty,
  deleteProperty,
};
