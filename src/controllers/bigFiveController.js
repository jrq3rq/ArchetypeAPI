const BigFiveModel = require("../models/bigFiveModel");

// Get all Big Five traits and their questions
exports.getAllTraits = (req, res) => {
  try {
    const traits = BigFiveModel.findAll();
    res.status(200).json(traits);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving Big Five traits.",
      error: error.message,
    });
  }
};

// Get questions for a specific Big Five trait
exports.getQuestionsByTrait = (req, res) => {
  try {
    const trait = req.params.trait;
    const questions = BigFiveModel.findQuestionsByTrait(trait);

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
    const filteredQuestions = BigFiveModel.searchQuestions(trait, query);

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
    const question = BigFiveModel.getRandomQuestion(trait);

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
  res.status(404).json({
    error: "Invalid route",
  });
};
