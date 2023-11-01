const express = require("express");
const router = express.Router();

// Sample route to get all comments
router.get("/", (req, res) => {
  // In a real app, you'd call your commentController's method here
  res.json({ message: "Fetching all comments..." });
});

// Sample route to create a comment
router.post("/", (req, res) => {
  // Call a method to create a comment in the database
  res.json({ message: "Creating a comment..." });
});

module.exports = router;
