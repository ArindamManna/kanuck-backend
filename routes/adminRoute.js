const multer = require("multer");
const router = require("express").Router();
const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

//todo: Set up multer storage and file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

//todo: controller functions
const {
  loginAdmin,
  createAdmin,
  adminDetails,
  reviewPermission,
  selectReview,
  removeReview,
} = require("../controllers/adminController");
const requireAdmin = require("../middleware/requireAdmin");

//todo: login route
router.post("/login", use(loginAdmin));
router.post("/verifyToken", requireAdmin, use(adminDetails));

//todo: home route to create new admin
router.post("/create", requireAdmin, use(createAdmin));

router.use("/builder", requireAdmin, use(require("./builderRoute")));
router.use("/project", requireAdmin, use(require("./projectRoute")));
router.use("/property", requireAdmin, use(require("./propertyRoute")));

//todo: reviews route
router.get("/reviews", requireAdmin, use(reviewPermission));

//todo: reviews route
router.put("/reviews/select/:reviewId", requireAdmin, use(selectReview));

//todo: reviews route
router.delete("/reviews/remove/:reviewId", requireAdmin, use(removeReview));

//todo: home route
router.get("/home", requireAdmin, use(adminDetails));

module.exports = router;
