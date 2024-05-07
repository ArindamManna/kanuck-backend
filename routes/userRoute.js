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
router.get("/builder/reviews", requireAuth, use(getBuilderReviews));
router.get("/project/reviews", requireAuth, use(getProjectReviews));
router.get("/property/reviews", requireAuth, use(getPropertyReviews));

//todo: get builds
router.get("/builder/all", requireAuth, use(getAllBuilder));
router.get("/builder/:builderId", requireAuth, use(getBuilder));

//todo: get projects
router.get("/project/all", requireAuth, use(getAllProjects));
router.get("/project/:projectId", requireAuth, use(getProject));

//todo: get property
router.get("/property/all", requireAuth, use(getAllProperty));
router.get("/property/:propertyId", requireAuth, use(getProperty));

//todo: contact us route
router.post("/contactus", requireAuth, use(contactUser));

module.exports = router;
