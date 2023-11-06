const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

// Create an Express application
const app = express();

// Use various middlewares
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
const archetypesRoutes = require("./routes/archetypes");
app.use("/archetypes", archetypesRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Export the app
module.exports = app;
