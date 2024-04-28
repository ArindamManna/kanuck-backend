const router = require("express").Router();
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

//todo: controller functions
const {
  loginAdmin,
  createAdmin,
  adminDetails,
  addProject,
  addProperty,
  getProject,
  getAllProjects,
  reviewPermission,
  selectReview,
  removeReview,
} = require("../controllers/adminController");
const requireAdmin = require("../middleware/requireAdmin");

//todo: login route
router.post("/login", use(loginAdmin));

//todo: home route
router.post("/createadmin", requireAdmin, use(createAdmin));

//todo: add project route
router.post("/addproject", requireAdmin, use(addProject));

//todo: get project route
router.get("/getallproject", requireAdmin, use(getAllProjects));

//todo: get project route
router.get("/getproject/:projectId", requireAdmin, use(getProject));

//todo: add property route
router.post("/addproperty/:projectId", requireAdmin, use(addProperty));

//todo: reviews route
router.get("/reviews", requireAdmin, use(reviewPermission));

//todo: reviews route
router.get("/selectreviews/:reviewId", requireAdmin, use(selectReview));

//todo: reviews route
router.get("/removereviews/:reviewId", requireAdmin, use(removeReview));

//todo: home route
router.get("/home", requireAdmin, use(adminDetails));

module.exports = router;
