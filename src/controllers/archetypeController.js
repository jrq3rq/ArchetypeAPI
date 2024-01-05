const ArchetypeModel = require("../models/archetypeModel");

// Get all archetypes
exports.getAll = (req, res) => {
  try {
    const archetypes = ArchetypeModel.findAll(); // Changed from Archetype to ArchetypeModel
    res.status(200).json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes.",
      error: error.message,
    });
  }
};

// Controller method to get an archetype by name
exports.getByName = (req, res) => {
  try {
    const name = req.params.name; // or 'id' if your route is using ':id'
    const archetype = ArchetypeModel.searchByName(name);

    // Since searchByName might return an array, you should handle that accordingly
    if (!archetype || archetype.length === 0) {
      return res.status(404).json({ message: "Archetype not found" });
    }

    // If you expect a single archetype, respond with the first one in the array
    res.json(archetype[0]);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the archetype.",
      error: error.message,
    });
  }
};

exports.getByOrder = (req, res) => {
  try {
    const order = req.params.order; // Get the 'order' parameter from the request
    const archetypes = ArchetypeModel.findByOrder(order);
    if (archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: `No archetypes found for order '${order}'` });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by order.",
      error: error.message,
    });
  }
};

exports.getByTrait = (req, res) => {
  try {
    const { trait } = req.params;
    const archetypes = ArchetypeModel.filterByTrait(trait);
    if (!archetypes || archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the provided trait" });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by trait.",
      error: error.message,
    });
  }
};

// Get archetypes by motivation
exports.getByMotivation = (req, res) => {
  try {
    const { motivation } = req.params;
    const archetypes = ArchetypeModel.findByMotivation(motivation);
    if (!archetypes || archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the provided motivation" });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by motivation.",
      error: error.message,
    });
  }
};

// Get archetypes by behavior
exports.getByBehavior = (req, res) => {
  try {
    const { behavior } = req.params;
    const archetypes = ArchetypeModel.findByBehavior(behavior);
    if (!archetypes || archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the provided behavior" });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by behavior.",
      error: error.message,
    });
  }
};

// Get archetypes by interest
exports.getByInterest = (req, res) => {
  try {
    const { interest } = req.params;
    const archetypes = ArchetypeModel.findByInterest(interest);
    if (!archetypes || archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the provided interest" });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by interest.",
      error: error.message,
    });
  }
};

exports.getByPlanet = (req, res) => {
  try {
    const planet = req.params.planet;
    const archetypes = ArchetypeModel.findByPlanet(planet);
    if (archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: `No archetypes found for '${planet}'` });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by planet.",
      error: error.message,
    });
  }
};

exports.getByThirdEye = (req, res) => {
  try {
    const thirdEye = req.params.thirdEye;
    const archetypes = ArchetypeModel.findByThirdEye(thirdEye);
    if (archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: `No archetypes found for '${thirdEye}'` });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by thirdEye.",
      error: error.message,
    });
  }
};

// Search by name
exports.search = (req, res) => {
  try {
    const name = req.query.name;
    if (!name) throw new Error("No name query provided");

    const filtered = Archetype.searchByName(name);
    if (filtered.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the given name." });
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while searching for archetypes.",
      error: error.message,
    });
  }
};

// Get random archetype
exports.getRandom = (req, res) => {
  try {
    const archetypes = Archetype.findAll();
    if (archetypes.length === 0) throw new Error("No archetypes available");

    const randomIndex = Math.floor(Math.random() * archetypes.length);
    res.status(200).json(archetypes[randomIndex]);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving a random archetype.",
      error: error.message,
    });
  }
};

// Filter archetypes by trait
exports.filter = (req, res) => {
  try {
    const trait = req.query.trait;
    if (!trait) throw new Error("No trait query provided");

    const filtered = Archetype.filterByTrait(trait);
    if (filtered.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the given trait." });
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while filtering archetypes.",
      error: error.message,
    });
  }
};

// Paginate archetypes
exports.paginate = (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const pageSize = parseInt(req.query.pageSize, 10);

    if (isNaN(page) || page < 1) throw new Error("Page number is invalid");
    if (isNaN(pageSize) || pageSize <= 0)
      throw new Error("Page size is invalid");

    const archetypes = Archetype.findAll();
    const totalPages = Math.ceil(archetypes.length / pageSize);

    if (page > totalPages) {
      return res.status(404).json({
        message: "No more archetypes to display",
        totalItems: archetypes.length,
        totalPages: totalPages,
      });
    }

    const paginatedItems = archetypes.slice(
      (page - 1) * pageSize,
      page * pageSize
    );
    res.json({
      page: page,
      pageSize: pageSize,
      totalItems: archetypes.length,
      totalPages: totalPages,
      items: paginatedItems,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while paginating archetypes.",
      error: error.message,
    });
  }
};

// Handle invalid routes
exports.invalidRoute = (req, res) => {
  res.status(404).json({
    error: "Invalid route",
  });
};
