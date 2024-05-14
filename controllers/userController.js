const User = require("../models/User");
const Contact = require("../models/Contact");
const Property = require("../models/Property");
const Review = require("../models/Review");
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
  const { fname, lname, pno, email, password } = req.body;

  const user = await User.signup(fname, lname, pno, email, password);

  //todo: create a token
  const token = createToken(user._id);
  return res.status(200).json({ email, token });
};

//todo: contact us user
const contactUser = async (req, res) => {
  const { name, email, message } = req.body;

  // const contact = await Contact.create({
  //   userId: req.user._id,
  //   name,
  //   email,
  //   message,
  // });

  //todo: send an email
  sendEmail(email, "Contact Us", name, email, message, contactEmail);

  return res.status(200).json({ message: "Email sent successfully" });
};

const userDetails = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  signupUser,
  loginUser,
  contactUser,
  userDetails,
};
