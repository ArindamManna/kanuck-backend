//todo: requires all package
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//todo: method that attaches env file to server
dotenv.config();

//todo: starts express app
const app = express();
const port = process.env.PORT || 3000;

//todo: cors
const whitelist =
  "http://localhost:3000,http://localhost:3001,https://ranauk-frontend-git-main-arindammannas-projects.vercel.app";
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
app.use(cors(corsOptions));
//todo: checks for data in the request and parses it for the request handler
app.use(express.json());

//todo: middleware that fires function for each request that reaches the server
app.use((req, res, next) => {
  console.log(`http://localhost:${port}${req.path}`, `(${req.method})`);
  next();
});

//todo: grabs all different routes from the routes folder
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/admin", require("./routes/adminRoute"));

//todo: 404 not found middleware
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//todo: 500 server error middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

//todo: added in for mongoose depreciation warning ahead of Mongoose 7 update
mongoose.set("strictQuery", false);
//todo: connect to db
mongoose
  .connect(process.env.DB)
  .then(() => {
    //todo: listening port for requests after connection to database
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}/`);
    });
  })
  .catch((err) => console.log(err.message));
