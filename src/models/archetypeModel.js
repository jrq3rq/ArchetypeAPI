// Load archetype data
const archetypesData = require("../data/archetypes.json");

class Archetype {
  constructor(data) {
    this.name = data.name;
    this.traits = data.traits;
    this.motivations = data.motivations;
    this.behaviors = data.behaviors;
    this.interests = data.interests;
  }
}

class ArchetypeModel {
  constructor() {
    // Parse archetypes data into Archetype instances
    this.archetypes = archetypesData.map((data) => new Archetype(data));
  }

  findAll() {
    return this.archetypes;
  }

  findByName(name) {
    return this.archetypes.find((a) => a.name === name);
  }
}

// Export model singleton instance
module.exports = new ArchetypeModel();

// Importing the JSON data source
// Archetype class to represent each data entity
// ArchetypeModel to load data and enable querying
// Mapping JSON to Archetype instances
// findAll() method to get full list
// findByName() to find match by name
// Exporting a singleton instance of the model
