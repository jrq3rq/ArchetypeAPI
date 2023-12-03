const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // Require the path module
const logger = require("./config/winston");

// Create an Express application
const app = express();

// Rate limiting
// const rateLimit = require("./middleware/rateLimit");

// Use various middlewares
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Apply rate limiting
// app.use(rateLimit);

app.use("/status", (req, res) => {
  res.send("OK");
}); // health check endpoint

app.use((err, req, res, next) => {
  if (err.status === 429) {
    return res.status(429).json({
      message: "Too many requests, please try again later",
    });
  }

  logger.error(err.stack);

  res.status(500).json({
    message: "Internal server error",
  });
});

// Serve Swagger UI static files
app.use(
  "/swagger-ui",
  express.static(path.join(__dirname, "public", "swagger-ui"))
);

// Serve Swagger yaml file
app.use("/docs", express.static(path.join(__dirname, "public", "docs")));

// Define routes
const archetypesRoutes = require("./routes/archetypes");
app.use("/archetypes", archetypesRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Start the server
const PORT = process.env.PORT || 5500; // Use the PORT from environment or default to 5500
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app
module.exports = app;
