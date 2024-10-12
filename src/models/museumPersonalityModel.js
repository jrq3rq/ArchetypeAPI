// Load Museum Personality Test data
const museumPersonalityData = require("../data/museum_personality_test.json");

class MuseumPersonalityTrait {
  constructor(data) {
    this.trait = data.trait;
    this.description = data.description;
    this.subheader = data.subheader;
    this.subheaderDescription = data.subheaderDescription;
    this.questions = data.questions;
  }

  // Method to find a question by text
  findQuestionByText(text) {
    return this.questions.find((q) => q.text === text);
  }
}

class MuseumPersonalityModel {
  constructor() {
    // Create an array of MuseumPersonalityTrait instances from the JSON data
    this.traits = museumPersonalityData.traits.map(
      (data) => new MuseumPersonalityTrait(data)
    );
  }

  // Returns all Museum personality traits and their questions
  findAll() {
    return this.traits;
  }

  // Finds a single personality trait by name
  findByTrait(traitName) {
    const trait = this.traits.find(
      (t) => t.trait.toLowerCase() === traitName.toLowerCase()
    );
    if (!trait) {
      throw new Error(`Museum personality trait '${traitName}' not found`);
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

  // Get a random question for a specific trait
  getRandomQuestion(trait) {
    const questions = this.traits.find((t) => t.trait === trait)?.questions;
    if (!questions) return null;
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  // Search questions in all traits by query
  searchQuestions(trait, query) {
    const pattern = new RegExp(query, "i"); // 'i' for case-insensitive
    const questions = this.traits.find((t) => t.trait === trait)?.questions;
    if (!questions) return [];
    return questions.filter((q) => pattern.test(q.text));
  }
}

// Export a singleton instance of MuseumPersonalityModel
module.exports = new MuseumPersonalityModel();
