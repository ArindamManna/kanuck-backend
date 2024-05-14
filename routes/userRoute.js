const router = require("express").Router();
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

//todo: controller functions
const {
  builderReview,
  getBuilderReviews,
  getBuilder,
  getAllBuilder,
} = require("../controllers/builderController");
const {
  projectReview,
  getProjectReviews,
  getAllProjects,
  getProject,
} = require("../controllers/projectController");
const {
  propertyReview,
  getPropertyReviews,
  getAllProperty,
  getProperty,
} = require("../controllers/propertyController");
const {
  loginUser,
  signupUser,
  contactUser,
  userDetails,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

//todo: login route
router.post("/login", use(loginUser));
router.post("/verifyToken", requireAuth, use(userDetails));

//todo: signup route
router.post("/signup", use(signupUser));

//todo: post review route
router.post("/builder/review/:builderId", requireAuth, use(builderReview));
router.post("/project/review/:projectId", requireAuth, use(projectReview));
router.post("/property/review/:propertyId", requireAuth, use(propertyReview));

//todo: get review route
router.get("/builder/reviews", use(getBuilderReviews));
router.get("/project/reviews", use(getProjectReviews));
router.get("/property/reviews", use(getPropertyReviews));

//todo: get builds
router.get("/builder/all", use(getAllBuilder));
router.get("/builder/:builderId", use(getBuilder));

//todo: get projects
router.get("/project/all", use(getAllProjects));
router.get("/project/:projectId", use(getProject));

//todo: get property
router.get("/property/all", use(getAllProperty));
router.get("/property/:propertyId", use(getProperty));

//todo: contact us route
router.post("/contactus", use(contactUser));

module.exports = router;
