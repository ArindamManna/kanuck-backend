const multer = require("multer");
const router = require("express").Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const {
  addProject,
  updateProject,
  addImage,
  deleteProject,
} = require("../controllers/projectController");

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

router.post("/add/:builderId", use(addProject));
// router.post("/add/tags/:projectId", use(addTags));
router.post("/add/image/:projectId", upload.array("image"), use(addImage));
// router.post("/add/anemities/:projectId", use(addAnemities));
// router.post("/add/highlights/:projectId", use(addHighlights));
router.put("/update/:projectId", use(updateProject));
router.delete("/delete/:projectId", use(deleteProject));

module.exports = router;
