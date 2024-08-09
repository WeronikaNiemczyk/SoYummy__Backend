// app.js

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const { recipesRouter } = require("./routes/recipes.routes");
const { ingredientsRouter } = require("./routes/ingredients.routes");
const setupDirectories = require("./services/directorySetup");
const logger = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

// Dynamiczne ustawienia CORS
const allowedOrigins = [
  "http://localhost:5173", // Dla deweloperki
  process.env.FRONTEND_URL, // Możliwy przyszły URL frontendu w produkcji
];

const corsOptions = {
  origin: (origin, callback) => {
    // Sprawdzanie, czy źródło żądania znajduje się na liście dozwolonych
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Content-Type, Authorization",
// };

const passport = require("./config/passport");
app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: app.get("env") === "production", // Secure tylko w produkcji
      httpOnly: true,
      sameSite: app.get("env") === "production" ? "none" : "lax", // W produkcji: 'none' (cross-site), lokalnie: 'lax'
    },
  })
);

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   })
// );

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const connection = mongoose.connect(process.env.MONGO_URI);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation for my API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
      {
        url: "https://deploy-marek-b05855e6af89.herokuapp.com",
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Ścieżki do plików zawierających dokumentację punktów końcowych
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/v1/users", authRoutes);
app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
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

module.exports = app;
