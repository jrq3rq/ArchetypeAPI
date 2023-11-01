const express = require("express");
const router = express.Router();

// Sample route to get all users
router.get("/", (req, res) => {
  // In a real app, you'd call your userController's method here
  res.json({ message: "Fetching all users..." });
});

// Sample route to create a user
router.post("/", (req, res) => {
  // Call a method to create a user in the database
  res.json({ message: "Creating a user..." });
});

module.exports = router;
