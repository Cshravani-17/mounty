const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const rootRouter = require("./src/api/routes");
const app = express();
const config = require("./src/config/config");
const { errorHandler, wrongPathHandler } = require("./src/errors");

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, config.mongoOpts)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());
app.use(helmet());
app.use("/api/v1/", rootRouter());
app.use(wrongPathHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});