const multer = require("multer");
const router = require("express").Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const {
  addBuilder,
  builderImage,
  updateBuilder,
  deleteBuilder,
} = require("../controllers/builderController");

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

router.put("/update/:builderId", use(updateBuilder));
router.delete("/delete/:builderId", use(deleteBuilder));
router.post("/add", upload.single("image"), use(addBuilder));
router.post("/upload/:builderId", upload.single("image"), use(builderImage));

module.exports = router;
