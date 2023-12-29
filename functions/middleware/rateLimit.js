// src/middleware/rateLimit.js

const rateLimit = require("express-rate-limit");
const logger = require("../config/winston");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  keyGenerator: (req) =>
    req.headers["x-forwarded-for"] || req.socket.remoteAddress,

  // ... other options
});

module.exports = (req, res, next) => {
  if (req.path === "/status") {
    return next();
  }

  limiter(req, res, (err) => {
    if (err) {
      logger.warn(`Rate limit exceeded for client IP ${req.ip}`); // Log warning here
      return res.status(429).json({
        status: "error",
        message: err.message,
      });
    }
    next();
  });
};
