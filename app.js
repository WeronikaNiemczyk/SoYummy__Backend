const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { recipesRouter } = require("./routes/recipes.routes");
require("dotenv").config();
const path = require("path");
const logger = require("morgan");

const { MONGO_URI: urlDb } = process.env;
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());

app.use("/recipes", recipesRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Something broke",
  });
});

const connection = mongoose.connect(urlDb);

const startServer = async () => {
  try {
    await connection;
    console.log("DB connected");
    app.listen(8000, () => {
      console.log("server is runing");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
startServer();

module.exports = app;
