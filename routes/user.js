const router = require("express").Router();
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

//todo: controller functions
const {
  loginUser,
  signupUser,
  contactUser,
  reviewProperty,
  getReviews,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

//todo: login route
router.post("/login", use(loginUser));

//todo: signup route
router.post("/signup", use(signupUser));

//todo: review route
router.post("/review/:propertyId", requireAuth, use(reviewProperty));

//todo: review route
router.get("/review", requireAuth, use(getReviews));

//todo: contact us route
router.post("/contactus", requireAuth, use(contactUser));

module.exports = router;
