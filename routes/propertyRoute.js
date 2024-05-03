const router = require("express").Router();

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const {
  addProperty,
  addTags,
  addUnits,
  addUnitsHighlights,
  updateProperty,
} = require("../controllers/propertyController");

router.post("/add/:projectId", use(addProperty));
router.post("/add/tags/:propertyId", use(addTags));
router.post("/add/units/highlights", use(addUnitsHighlights));
router.post("/add/units/:propertyId", use(addUnits));
router.put("/update/:propertyId", use(updateProperty));

module.exports = router;
