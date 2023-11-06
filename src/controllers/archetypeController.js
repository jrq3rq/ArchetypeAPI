// Load archetype model
const Archetype = require("../models/archetypeModel");

// Get all archetypes
exports.getAll = (req, res) => {
  const archetypes = Archetype.findAll();

  res.status(200).json(archetypes);
};

// Get single archetype by id
exports.getById = (req, res) => {
  const id = req.params.id;

  const archetype = Archetype.findById(id);

  if (!archetype) {
    return res.status(404).json({ message: "Archetype not found" });
  }

  res.json(archetype);
};

// Search by name
exports.search = (req, res) => {
  const name = req.query.name;

  const filtered = Archetype.searchByName(name);

  res.json(filtered);
};

// Handle invalid routes
exports.invalidRoute = (req, res) => {
  res.status(404).json({
    error: "Invalid route",
  });
};
