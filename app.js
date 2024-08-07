// app.js

const mongoose = require("mongoose");
require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongo");

const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
// const emailRoutes = require("./routes/email.routes");
// const recipesRouter = require("./routes/recipes.routes");
const { recipesRouter } = require("./routes/recipes.routes");
// const ingredientsRouter = require("./routes/ingredients.routes");
const { ingredientsRouter } = require("./routes/ingredients.routes");
const setupDirectories = require("./services/directorySetup");
const logger = require("morgan");
const path = require("path");

app.get("/", (req, res) => {
  res.send("server for the project is running");
});
const PORT = process.env.PORT || 3000;

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

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

// Konfiguracja CORS
const corsOptions = {
  origin: "*", // Pozwala na dostęp ze wszystkich domen
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

const passport = require("./config/passport");
app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(cors(corsOptions)); // Użycie middleware CORS

const connection = mongoose.connect(process.env.MONGO_URI, {
  //   dbName: "db-contacts",
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
// const { MONGO_URI: urlDb } = process.env;
// const connection = mongoose.connect(urlDb);

app.use(express.json());
require("./config/passport");

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/users", authRoutes);
app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Logowanie błędów
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

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

// module.exports = app;
