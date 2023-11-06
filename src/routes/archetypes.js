// archetypes.js

const express = require("express");
const archetypeController = require("../controllers/archetypeController");

const router = express.Router();

// Get all archetypes
router.get("/", archetypeController.getAll);

// Get single archetype by id
router.get("/:id", archetypeController.getById);

// Get random archetype
router.get("/random", archetypeController.getRandom);

// Search archetypes by name
router.get("/search", archetypeController.search);

// Filter archetypes by trait
router.get("/filter", archetypeController.filter);

// Paginated results
router.get("/page/:page", archetypeController.paginate);

// Get by motivation
router.get("/motivations", archetypeController.getByMotivation);

// Invalid routes
router.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = router;
