const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Project = require("../models/projectModel");
const Property = require("../models/propertyModel");
const jwt = require("jsonwebtoken");

//todo: token create
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
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

const adminDetails = (req, res) => {
  return res.status(200).json(req.user);
};

const addProject = async (req, res) => {
  const { name, desc } = req.body;

  const project = await Project.create({ name, desc });

  return res.status(200).json(project);
};

const addProperty = async (req, res) => {
  const { name, desc } = req.body;
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId);
  if (!project) {
    throw Error("Project not found");
  }
  const property = await Property.create({ name, desc });

  const updatedProject = await Project.updateOne(
    { _id: projectId },
    { $addToSet: { properties: property._id } }
  );

  return res.status(200).json(updatedProject);
};

const getProject = async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId);

  if (!project) {
    throw Error("Project not found");
  }

  await project.populate("properties");

  return res.status(200).json(project);
};

const getAllProjects = async (req, res) => {
  const projects = await Project.find();
  return res.status(200).json(projects);
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

  const user = await User.signup(fname, lname, ccode, pno, email, password);

  return res.status(200).json({ email });
};

module.exports = {
  loginAdmin,
  adminDetails,
  createAdmin,
  addProject,
  addProperty,
  getProject,
  getAllProjects,
  reviewPermission,
  selectReview,
  removeReview,
};
