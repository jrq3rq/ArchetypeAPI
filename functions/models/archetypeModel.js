const archetypesData = require("../data/archetypes.json");
const { v4: uuidv4 } = require("uuid");

class Archetype {
  constructor(data) {
    this.order = data.order;
    this.id = data.id || uuidv4();
    this.timestamp = data.timestamp || new Date().toISOString();
    this.name = data.name;
    this.motto = data.motto;
    this.mission = data.mission;
    this.color = data.color;
    this.planet = data.planet;
    this.thirdEye = data.thirdEye;
    this.scores = data.scores;
    this.traits = data.traits;
    this.motivations = data.motivations;
    this.behaviors = data.behaviors;
    this.interests = data.interests;
    this.historicalExamples = data.historicalExamples;
    this.mythologicalReferences = data.mythologicalReferences;
    this.practicalApplications = data.practicalApplications;
    this.characteristics = data.characteristics;
    this.ratings = data.ratings;

    // New fields added
    this.weaknesses = data.weaknesses;
    this.fears = data.fears;
    this.decisionMakingStyle = data.decisionMakingStyle;
    this.coreValues = data.coreValues;
    this.physicalAndEmotionalAppearance = data.physicalAndEmotionalAppearance;
    this.symbolismAndIconography = data.symbolismAndIconography;
    this.preferredEnvironments = data.preferredEnvironments;
    this.coreSkillsAbilities = data.coreSkillsAbilities;
    this.emotionalTriggers = data.emotionalTriggers;
  }

  toJSON() {
    return {
      order: this.order,
      id: this.id,
      timestamp: this.timestamp,
      name: this.name,
      motto: this.motto,
      mission: this.mission,
      color: this.color,
      planet: this.planet,
      thirdEye: this.thirdEye,
      scores: this.scores,
      traits: this.traits,
      motivations: this.motivations,
      behaviors: this.behaviors,
      interests: this.interests,
      historicalExamples: this.historicalExamples,
      mythologicalReferences: this.mythologicalReferences,
      practicalApplications: this.practicalApplications,
      characteristics: this.characteristics,
      ratings: this.ratings,

      // New fields added
      weaknesses: this.weaknesses,
      fears: this.fears,
      decisionMakingStyle: this.decisionMakingStyle,
      coreValues: this.coreValues,
      physicalAndEmotionalAppearance: this.physicalAndEmotionalAppearance,
      symbolismAndIconography: this.symbolismAndIconography,
      preferredEnvironments: this.preferredEnvironments,
      coreSkillsAbilities: this.coreSkillsAbilities,
      emotionalTriggers: this.emotionalTriggers,
    };
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

  // Additional methods for filtering by new properties
  findByWeakness(weakness) {
    return this._filterByProperty("weaknesses", weakness);
  }

  findByFear(fear) {
    return this._filterByProperty("fears", fear);
  }

  findByCoreValue(coreValue) {
    return this._filterByProperty("coreValues", coreValue);
  }

  findByPreferredEnvironment(environment) {
    return this._filterByProperty("preferredEnvironments", environment);
  }

  getHistoricalExamples(name) {
    const archetype = this.archetypes.find(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    );
    return archetype ? archetype.historicalExamples : [];
  }

  getMythologicalReferences(name) {
    const archetype = this.archetypes.find(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    );
    return archetype ? archetype.mythologicalReferences : [];
  }

  getPracticalApplications(name) {
    const archetype = this.archetypes.find(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    );
    return archetype ? archetype.practicalApplications : [];
  }

  // Define the method if it's not there yet in ArchetypeModel.js
  _filterByProperty(property, value) {
    const pattern = new RegExp(value, "i"); // Case-insensitive match
    return this.archetypes.filter((archetype) =>
      archetype[property]?.some((item) => pattern.test(item))
    );
  }
}

// Export a singleton instance of ArchetypeModel
module.exports = new ArchetypeModel();
