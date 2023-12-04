const express = require("express");
const router = express.Router();
const bigFiveController = require("../controllers/bigFiveController");

// Get all Big Five traits and their questions
router.get("/", bigFiveController.getAllTraits);

// Get questions for a specific Big Five trait
router.get("/:trait", bigFiveController.getQuestionsByTrait);

// Route for searching questions within a specific trait
router.get("/search/:trait", bigFiveController.searchQuestionsInTrait);

// Route for getting a random question from a specific trait
router.get("/random/:trait", bigFiveController.getRandomQuestionFromTrait);

// Invalid routes for Big Five
router.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = router;
