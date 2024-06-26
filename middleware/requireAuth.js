const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  //todo: verify authentication using an auth header property
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id });
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
