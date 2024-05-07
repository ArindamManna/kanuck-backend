const User = require("../models/User");
const Review = require("../models/Review");
const Builder = require("../models/Builder");
const Project = require("../models/Project");
const Property = require("../models/Property");
const jwt = require("jsonwebtoken");

//todo: token create
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "300d" });
};

//todo: login user
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);
  const { fname, lname } = user ? user : {};

  if (!user.isAdmin) {
    throw Error("You are not allowed to access this page");
  }

  //todo: create a token
  const token = createToken(user._id);

  return res.status(200).json({ fname, lname, email, token });
};

const adminDetails = async (req, res) => {
  // const projects = await Project.find({ adminId: req.user._id });
  return res.status(200).json(req.user);
};

const updatedProject = async (req, res) => {
  if (req.body.tags) {
    const { tags } = req.body;
    req.body.tags = tags.map((tag) => {
      return { label: tag };
    });
  }
  if (req.body.amenitiesList) {
    const { amenitiesList } = req.body;
    req.body.amenitiesList = amenitiesList.map((tag) => {
      return { label: tag };
    });
  }
  const project = await Project.findByIdAndUpdate(
    req.params.projectId,
    req.body,
    { new: true }
  );
  return res.status(200).json(project);
};

const addImage = async (req, res) => {
  if (!req.file) {
    throw Error("No files were uploaded.");
  }
  const projectId = req.params.projectId;
  const imageUrl = `${process.env.BASE_URL}/${req.file.path}`;
  await Project.updateOne(
    { _id: projectId },
    { $addToSet: { images: { url: imageUrl } } }
  );
  return res.status(200).json(image);
};

const reviewPermission = async (req, res) => {
  const reviews = await Review.find({ permission: false });
  return res.status(200).json(reviews);
};

const selectReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const updatedReview = await Review.updateOne(
    { _id: reviewId },
    { $set: { permission: true } }
  );
  return res.status(200).json(updatedReview);
};

const removeReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const removeReview = await Review.deleteOne({ _id: reviewId });
  return res.status(200).json(removeReview);
};

const createAdmin = async (req, res) => {
  const { fname, lname, ccode, pno, email, password } = req.body;

  let user = await User.signup(fname, lname, ccode, pno, email, password);

  user = await user.updateOne({ $set: { isAdmin: true } });

  return res.status(200).json(user);
};

module.exports = {
  loginAdmin,
  adminDetails,
  createAdmin,
  reviewPermission,
  selectReview,
  removeReview,
  addImage,
  updatedProject,
};
