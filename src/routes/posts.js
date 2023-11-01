const express = require("express");
const router = express.Router();

// Sample route to get all posts
router.get("/", (req, res) => {
  // In a real app, you'd call your postController's method here
  res.json({ message: "Fetching all posts..." });
});

// Sample route to create a post
router.post("/", (req, res) => {
  // Call a method to create a post in the database
  res.json({ message: "Creating a post..." });
});

module.exports = router;
