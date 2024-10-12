const MuseumPersonalityModel = require("../models/museumPersonalityModel");

// Get all Museum personality traits and their questions
exports.getAllTraits = (req, res) => {
  try {
    const traits = MuseumPersonalityModel.findAll();
    res.status(200).json(traits);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving Museum personality traits.",
      error: error.message,
    });
  }
};

// Get questions for a specific Museum personality trait
exports.getQuestionsByTrait = (req, res) => {
  try {
    const trait = req.params.trait;
    const questions = MuseumPersonalityModel.findQuestionsByTrait(trait);

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        message: "Trait not found or no questions for the specified trait",
      });
    }

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving questions.",
      error: error.message,
    });
  }
};

// Search for specific questions within a trait
exports.searchQuestionsInTrait = (req, res) => {
  try {
    const { trait, query } = req.params;
    const filteredQuestions = MuseumPersonalityModel.searchQuestions(
      trait,
      query
    );

    if (filteredQuestions.length === 0) {
      return res.status(404).json({ message: "No matching questions found." });
    }

    res.json(filteredQuestions);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while searching for questions.",
      error: error.message,
    });
  }
};

// Get a random question from a specific trait
exports.getRandomQuestionFromTrait = (req, res) => {
  try {
    const trait = req.params.trait;
    const question = MuseumPersonalityModel.getRandomQuestion(trait);

    if (!question) {
      return res
        .status(404)
        .json({ message: "No questions available for this trait." });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving a random question.",
      error: error.message,
    });
  }
};

// Handle invalid routes
exports.invalidRoute = (req, res) => {
  res.status(404).json({ error: "Invalid route" });
};
