// module.exports = router;
const express = require("express");
const router = express.Router();
const archetypeController = require("../controllers/archetypeController");

// Get all archetypes
router.get("/", archetypeController.getAll);

// // Get single archetype by name
router.get("/:name", archetypeController.getByName);

// Get random archetype
router.get("/random", archetypeController.getRandom);

// Search archetypes by name using a query parameter
router.get("/search", archetypeController.search);

// Filter archetypes by trait
router.get("/filter", archetypeController.filter);

// Route for getting archetypes by order
router.get("/by-order/:order", archetypeController.getByOrder);

// Route for filtering by trait (specific trait)
router.get("/by-trait/:trait", archetypeController.getByTrait);

// Route for filtering by planet
router.get("/by-planet/:planet", archetypeController.getByPlanet);

// Route for filtering by thirdEye
router.get("/by-thirdEye/:thirdEye", archetypeController.getByThirdEye);

// Route for filtering by motivation
router.get("/by-motivation/:motivation", archetypeController.getByMotivation);

// Route for filtering by behavior
router.get("/by-behavior/:behavior", archetypeController.getByBehavior);

// Route for filtering by interest
router.get("/by-interest/:interest", archetypeController.getByInterest);

// Route for filtering by weakness
router.get("/by-weakness/:weakness", archetypeController.getByWeakness);

// Route for filtering by fear
router.get("/by-fear/:fear", archetypeController.getByFear);

// Route for filtering by core values
router.get("/by-core-value/:coreValue", archetypeController.getByCoreValue);

// Route for filtering by preferred environment
router.get(
  "/by-environment/:environment",
  archetypeController.getByEnvironment
);

// Get decision-making style for an archetype
router.get(
  "/decisionMakingStyle/:name",
  archetypeController.getDecisionMakingStyle
);

// Paginated results
router.get("/paginate", archetypeController.paginate);

// Get historical examples for an archetype
router.get("/:name/history", archetypeController.getHistoricalExamples);

// Get mythological references for an archetype
router.get("/:name/mythology", archetypeController.getMythologicalReferences);

// Get practical applications for an archetype
router.get("/:name/applications", archetypeController.getPracticalApplications);

// Handle invalid routes
router.all("*", archetypeController.invalidRoute);

module.exports = router;
