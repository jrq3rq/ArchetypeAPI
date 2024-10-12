const express = require("express");
const router = express.Router();
const museumPersonalityController = require("../controllers/museumPersonalityController");

// Get all Museum personality traits and their questions
router.get("/", museumPersonalityController.getAllTraits);

// Get questions for a specific Museum personality trait
router.get("/:trait", museumPersonalityController.getQuestionsByTrait);

// Route for searching questions within a specific trait
router.get(
  "/search/:trait",
  museumPersonalityController.searchQuestionsInTrait
);

// Route for getting a random question from a specific trait
router.get(
  "/random/:trait",
  museumPersonalityController.getRandomQuestionFromTrait
);

// Invalid routes for Museum personality test
router.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = router;
