// bigFiveModel.js
// Load Big Five data
// const bigFiveData = require("../data/bigFiveDataTest.json");
const bigFiveData = require("../data/bigFiveData.json");

class BigFiveTrait {
  constructor(data) {
    this.trait = data.trait;
    this.description = data.description;
    this.questions = data.questions;
  }

  // Method to find a question by text
  findQuestionByText(text) {
    return this.questions.find((q) => q.text === text);
  }
}

class BigFiveModel {
  constructor() {
    // Create an array of BigFiveTrait instances from the JSON data
    this.traits = bigFiveData.traits.map((data) => new BigFiveTrait(data));
  }

  // Returns all Big Five traits and their questions
  findAll() {
    return this.traits;
  }

  // Finds a single Big Five trait by name
  findByTrait(traitName) {
    const trait = this.traits.find(
      (t) => t.trait.toLowerCase() === traitName.toLowerCase()
    );
    if (!trait) {
      throw new Error(`Big Five trait '${traitName}' not found`);
    }
    return trait;
  }

  // Method to find questions for a specific trait
  findQuestionsByTrait(traitName) {
    const trait = this.findByTrait(traitName);
    return trait.questions;
  }

  // Method to search questions within a trait by text
  searchQuestionsInTrait(traitName, searchText) {
    const trait = this.findByTrait(traitName);
    const pattern = new RegExp(searchText, "i"); // 'i' for case-insensitive
    return trait.questions.filter((q) => pattern.test(q.text));
  }

  getRandomQuestion(trait) {
    const questions = this.traits.find((t) => t.trait === trait)?.questions;
    if (!questions) return null;
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
  searchQuestions(trait, query) {
    const pattern = new RegExp(query, "i"); // 'i' for case-insensitive
    const questions = this.traits.find((t) => t.trait === trait)?.questions;
    if (!questions) return [];
    return questions.filter((q) => pattern.test(q.text));
  }
}

// Export a singleton instance of BigFiveModel
module.exports = new BigFiveModel();
