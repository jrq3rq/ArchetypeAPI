const express = require("express");
const router = express.Router();
const archetypeController = require("../controllers/archetypeController");

// Get all archetypes
router.get("/", archetypeController.getAll);

// Get single archetype by name
router.get("/:name", archetypeController.getByName);

// Get random archetype
router.get("/random", archetypeController.getRandom);

// Search archetypes by name
router.get("/search", archetypeController.search);

// Filter archetypes by trait
router.get("/filter", archetypeController.filter);

// New route for filtering by trait
router.get("/by-trait/:trait", archetypeController.getByTrait);

// Route for getting archetypes by order
router.get("/by-order/:order", archetypeController.getByOrder);

// New route for filtering by planet
router.get("/by-planet/:planet", archetypeController.getByPlanet);

// New route for filtering by thirdEye
router.get("/by-thirdEye/:thirdEye", archetypeController.getByThirdEye);

// Route for filtering by motivation
router.get("/by-motivation/:motivation", archetypeController.getByMotivation);

// Route for filtering by behavior
router.get("/by-behavior/:behavior", archetypeController.getByBehavior);

// Route for filtering by interest
router.get("/by-interest/:interest", archetypeController.getByInterest);

// Paginated results
router.get("/page/:page", archetypeController.paginate);

router.get("/:name/history", archetypeController.getHistoricalExamples);
router.get("/:name/mythology", archetypeController.getMythologicalReferences);
router.get("/:name/applications", archetypeController.getPracticalApplications);

// Invalid routes
router.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = router;
