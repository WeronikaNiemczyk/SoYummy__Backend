// app.js

const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
// const emailRoutes = require("./routes/email.routes");
const recipesRouter = require("./routes/recipes.routes");
const setupDirectories = require("./services/directorySetup");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

const connection = mongoose.connect(process.env.MONGO_URI, {
  //   dbName: "db-contacts",
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

app.use(express.json());
require("./config/passport");

app.use("/api/v1/users", authRoutes);
app.use("/recipes", recipesRouter);

connection
  .then(async () => {
    console.log("Database connection successful");
    await setupDirectories();
    app.listen(PORT, async () => {
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error while establishing connection ${error}`);
    process.exit(1);
  });

// const mongoose = require("mongoose");
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { recipesRouter } = require("./routes/recipes.routes");
// const path = require("path");
// const logger = require("morgan");

// const { MONGO_URI: urlDb } = process.env;
// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use(logger(formatsLogger));

// app.use(cors());
// app.use(express.json());

// app.use("/recipes", recipesRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: `Not found - ${req.path}` });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: err.message || "Something broke",
//   });
// });

// const connection = mongoose.connect(urlDb);

// const startServer = async () => {
//   try {
//     await connection;
//     console.log("DB connected");
//     app.listen(8000, () => {
//       console.log("server is runing");
//     });
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// startServer();

// module.exports = app;
