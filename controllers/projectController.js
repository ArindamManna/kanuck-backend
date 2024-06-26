const Builder = require("../models/Builder");
const Project = require("../models/Project");
const Property = require("../models/Property");
const Review = require("../models/Review");

const addProject = async (req, res) => {
  req.body.builderId = req.params.builderId;
  const builder = await Builder.findById(req.body.builderId);
  if (!builder) {
    throw Error("Builder not found");
  }
  // console.log({ ...req.body, properties: [] });
  const project = await Project.create({ ...req.body, properties: [] });

  if (req.body.properties) {
    const properties = req.body.properties;
    const propertyList = [];
    for (let i = 0; i < properties.length; i++) {
      const property = await Property.create(properties[i]);
      propertyList.push(property._id);
    }
    project.properties = propertyList;
    await project.save();
  }

  await Builder.updateOne(
    { _id: req.body.builderId },
    { $addToSet: { projects: project._id } }
  );
  return res.status(200).json(project);
};

const addImage = async (req, res) => {
  const project = await Project.findById(req.body.projectId);
  if (!project) {
    throw Error("Project not found");
  }
  if (!req.files) {
    throw Error("No files were uploaded.");
  }

  for (let i = 0; i < req.files.length; i++) {
    const imageUrl = `${process.env.BASE_URL}/${req.files[0]?.path}`;
    project.images.push({ url: imageUrl });
  }
  await project.save();
  return res.status(200).json(project);
};

// const addTags = async (req, res) => {
//   const { tags } = req.body;
//   const project = await Project.findByIdAndUpdate(
//     req.params.projectId,
//     {
//       $addToSet: { tags },
//     },
//     { new: true }
//   );
//   return res.status(200).json(project);
// };

// const addAnemities = async (req, res) => {
//   const { amenitiesList } = req.body;
//   const project = await Project.findByIdAndUpdate(
//     req.params.projectId,
//     {
//       $addToSet: { amenitiesList },
//     },
//     { new: true }
//   );
//   return res.status(200).json(project);
// };
// const addHighlights = async (req, res) => {
//   const { highlights } = req.body;
//   const project = await Project.findByIdAndUpdate(
//     req.params.projectId,
//     {
//       $addToSet: { highlights },
//     },
//     { new: true }
//   );
//   return res.status(200).json(project);
// };

const updateProject = async (req, res) => {
  const projectId = req.query.project_id;
  // const builderId = req.query.builder_id;
  const project = await Project.findByIdAndUpdate(projectId, req.body, {
    new: true,
  });
  const builder = await Builder.findByIdAndUpdate(
    project.builderId,
    { $addToSet: { projects: project._id } },
    { new: true }
  );
  // console.log("Builder saved successfully", project.builderId);
  return res.status(200).json(project);
};
const deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId);

  if (!project) {
    throw Error("Project not found");
  }

  await Property.deleteMany({ _id: { $in: project.properties } });

  await Project.deleteOne({ _id: projectId });

  return res.status(200).json({ message: "Project deleted successfully" });
};

const projectReview = async (req, res) => {
  const { title, rating, review } = req.body;
  const projectId = req.params.projectId;

  const project = await Project.findById(projectId);

  if (!project) {
    throw Error("Project not found");
  }

  const createReview = await Review.create({
    userId: req.user._id,
    rating,
    title,
    review,
    reviewOn: "Project",
  });

  await project.updateOne({ $addToSet: { reviews: createReview._id } });
  return res.status(200).json(createReview);
};

const getProjectReviews = async (req, res) => {
  const reviews = await Review.find({ permission: true, reviewOn: "Project" });
  return res.status(200).json(reviews);
};

const getProject = async (req, res) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId);

  if (!project) {
    throw Error("Project not found");
  }

  await project.populate("properties");
  await project.populate("reviews");

  const builder = await Builder.findById(project.builderId);

  return res.status(200).json({ ...project._doc, builder });
};

const getAllProjects = async (req, res) => {
  const projects = await Project.find({})
    .populate("builderId")
    .populate("properties");

  const updatedProjects = projects.map((project) => {
    const projectObject = project.toObject();

    projectObject.builder = projectObject.builderId;
    if (projectObject.builderId)
      projectObject.builderId = projectObject.builderId._id;

    return projectObject;
  });
  return res.status(200).json(updatedProjects);
};
module.exports = {
  addProject,
  updateProject,
  deleteProject,
  addImage,
  projectReview,
  getProjectReviews,
  getProject,
  getAllProjects,
};
