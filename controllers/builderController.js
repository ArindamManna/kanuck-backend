const Builder = require("../models/Builder");
const Review = require("../models/Review");

const addBuilder = async (req, res) => {
  const { name, description, location } = req.body;

  const imageUrl = `${process.env.BASE_URL}/${req.file?.path}`;

  const builder = await Builder.create({
    name,
    description,
    image: { url: imageUrl },
    location,
  });
  return res.status(200).json(builder);
};

const builderImage = async (req, res) => {
  if (!req.file) {
    throw Error("No files were uploaded.");
  }
  const imageUrl = `${process.env.BASE_URL}/${req.file?.path}`;
  const builderId = req.params.builderId;
  const builder = await Builder.findByIdAndUpdate(
    builderId,
    { image: { url: imageUrl } },
    {
      new: true,
    }
  );
  return res.status(200).json(builder);
};

const getBuilder = async (req, res) => {
  const builderId = req.params.builderId;
  const builder = await Builder.findById(builderId);

  if (!builder) {
    throw Error("Builder not found");
  }

  await builder.populate("projects");
  await builder.populate("reviews");

  return res.status(200).json(builder);
};

const getAllBuilder = async (req, res) => {
  const builders = await Builder.find();
  return res.status(200).json(builders);
};

const updateBuilder = async (req, res) => {
  const builderId = req.params.builderId;
  const builder = await Builder.findByIdAndUpdate(builderId, req.body, {
    new: true,
  });
  return res.status(200).json(builder);
};

const builderReview = async (req, res) => {
  const { title, rating, review } = req.body;
  const builderId = req.params.builderId;

  const builder = await Builder.findById(builderId);

  if (!builder) {
    throw Error("Builder not found");
  }

  const createReview = await Review.create({
    userId: req.user._id,
    rating,
    title,
    review,
    reviewOn: "Builder",
  });

  await builder.updateOne({ $addToSet: { reviews: createReview._id } });
  return res.status(200).json(createReview);
};

const getBuilderReviews = async (req, res) => {
  const reviews = await Review.find({ permission: true, reviewOn: "Builder" });
  return res.status(200).json(reviews);
};

module.exports = {
  addBuilder,
  builderImage,
  builderReview,
  getBuilderReviews,
  getBuilder,
  getAllBuilder,
  updateBuilder,
};
