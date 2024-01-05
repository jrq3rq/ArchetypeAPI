// archetypeModel.js
// Load archetype data
const archetypesData = require("../data/archetypes.json");
const { v4: uuidv4 } = require("uuid");

class Archetype {
  constructor(data) {
    this.order = data.order; // Existing attribute
    this.id = data.id || uuidv4(); // Generate UUID if not present
    this.timestamp = data.timestamp || new Date().toISOString(); // Adding a timestamp
    this.name = data.name; // Existing attribute
    this.motto = data.motto; // Adds motto
    this.color = data.color; // Adds color
    this.planet = data.planet; // Adds planet
    this.thirdEye = data.thirdEye; // Adds thirdEye
    this.scores = data.scores; // New attribute for Big Five scores
    this.traits = data.traits; // Existing attribute
    this.motivations = data.motivations; // Existing attribute
    this.behaviors = data.behaviors; // Adds behaviors
    this.interests = data.interests; // Adds interest
    this.ratings = data.ratings; // Adds ratings
    this.characteristics = data.characteristics; // Adds characteristics
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

  // Method to filter archetypes by order
  findByOrder(order) {
    const normalizedOrder = order.toLowerCase();
    return this.archetypes.filter(
      (archetype) => archetype.order.toLowerCase() === normalizedOrder
    );
  }

  // Method to filter archetypes by planet
  findByPlanet(planet) {
    const normalizedPlanet = planet.toLowerCase();
    return this.archetypes.filter(
      (archetype) => archetype.planet.toLowerCase() === normalizedPlanet
    );
  }

  // Method to filter archetypes by thirdEye
  findByThirdEye(thirdEye) {
    const normalizedThirdEye = thirdEye.toLowerCase();
    return this.archetypes.filter(
      (archetype) => archetype.thirdEye.toLowerCase() === normalizedThirdEye
    );
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
