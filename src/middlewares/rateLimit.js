// src/middleware/rateLimit.js

const rateLimit = require("express-rate-limit");
const logger = require("../config/winston");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});

module.exports = (req, res, next) => {
  // Allow healthchecks to pass through
  if (req.path === "/status") {
    return next();
  }

  limiter(req, res, (err) => {
    if (err) {
      // Explicitly send 429 when rate limit exceeded
      return res.status(429).json({
        status: "error",
        message: err.message,
      });
    }

    next();
  });
};

// Log when rate limit exceeded
limiter.on("rateLimitExceeded", (req, res) => {
  logger.warn(`Rate limit exceeded for client IP ${req.ip}`);
});
