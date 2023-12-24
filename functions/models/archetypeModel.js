// archetypeModel.js
// Load archetype data
const archetypesData = require("../data/archetypes.json");

class Archetype {
  constructor(data) {
    this.id = data.id; // Existing attribute
    this.name = data.name; // Existing attribute
    this.scores = data.scores; // New attribute for Big Five scores
    this.traits = data.traits; // Existing attribute
    this.motivations = data.motivations; // Existing attribute
    this.behaviors = data.behaviors; // Existing attribute
    this.interests = data.interests; // Existing attribute
  }
}

class ArchetypeModel {
  constructor() {
    // Create an array of Archetype instances from the JSON data
    this.archetypes = archetypesData.map((data) => new Archetype(data));
  }

  // Returns all archetypes
  findAll() {
    return this.archetypes;
  }

  // Finds a single archetype by id
  findById(id) {
    const archetype = this.archetypes.find((a) => a.id === id);
    if (!archetype) {
      throw new Error(`Archetype with ID ${id} not found`);
    }
    return archetype;
  }

  // Searches for archetypes by name, using a case-insensitive regular expression
  searchByName(name) {
    const pattern = new RegExp(name, "i"); // 'i' for case-insensitive
    const results = this.archetypes.filter((a) => pattern.test(a.name));
    return results;
  }

  // Filters archetypes by a specific trait
  filterByTrait(trait) {
    const results = this.archetypes.filter((a) => a.traits.includes(trait));
    return results;
  }

  // Method to filter archetypes by motivation
  findByMotivation(motivation) {
    return this._filterByProperty("motivations", motivation);
  }

  // Method to filter archetypes by behavior
  findByBehavior(behavior) {
    return this._filterByProperty("behaviors", behavior);
  }

  // Method to filter archetypes by interest
  findByInterest(interest) {
    return this._filterByProperty("interests", interest);
  }

  // Helper method to reduce redundancy
  _filterByProperty(property, value) {
    const pattern = new RegExp(value, "i"); // Use a case-insensitive regular expression
    return this.archetypes.filter((archetype) =>
      archetype[property].some((item) => pattern.test(item))
    );
  }
}

// Export a singleton instance of ArchetypeModel
module.exports = new ArchetypeModel();
