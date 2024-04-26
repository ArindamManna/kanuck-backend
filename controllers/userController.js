const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const Review = require("../models/reviewModel");
const jwt = require("jsonwebtoken");

const { sendEmail } = require("../utils/sendEmail");
const { contactEmail } = require("../templates/contactEmail");

//todo: token create
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//todo: login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);
  const { fname, lname } = user ? user : {};

  //todo: create a token
  const token = createToken(user._id);

  return res.status(200).json({ fname, lname, email, token });
};

//todo: signup user
const signupUser = async (req, res) => {
  const { fname, lname, ccode, pno, email, password } = req.body;

  const user = await User.signup(fname, lname, ccode, pno, email, password);

  //todo: create a token
  const token = createToken(user._id);
  return res.status(200).json({ email, token });
};

//todo: review user
const reviewProperty = async (req, res) => {
  const { rating, message } = req.body;
  const propertyId = req.params.propertyId;

  const review = await Review.create({ propertyId, rating, message });

  return res.status(200).json(review);
};
//todo: review user
const getReviews = async (req, res) => {
  const reviews = await Review.find({ permission: true });
  console.log(reviews);
  return res.status(200).json(reviews);
};

//todo: contact us user
const contactUser = async (req, res) => {
  const { name, email, message } = req.body;

  const contact = await Contact.create({ name, email, message });

  //todo: send an email
  sendEmail(email, "Contact Us", name, email, message, contactEmail);

  return res.status(200).json(contact);
};

module.exports = {
  signupUser,
  loginUser,
  contactUser,
  reviewProperty,
  getReviews,
};
