const ArchetypeModel = require("../models/archetypeModel");

// Get all archetypes
exports.getAll = (req, res) => {
  try {
    const { sortBy, sortOrder = "asc" } = req.query; // Default order is ascending
    let archetypes = ArchetypeModel.findAll();

    if (sortBy) {
      // Make sure the sortBy key exists on the objects to prevent errors
      archetypes = archetypes.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        return sortOrder === "desc"
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      });
    }

    res.status(200).json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes.",
      error: error.message,
    });
  }
};

// Get an archetype by name
exports.getByName = (req, res) => {
  try {
    const name = req.params.name;
    const archetype = ArchetypeModel.searchByName(name);
    if (!archetype || archetype.length === 0) {
      return res.status(404).json({ message: "Archetype not found" });
    }
    res.json(archetype[0]);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the archetype.",
      error: error.message,
    });
  }
};

// Get archetypes by order
exports.getByOrder = (req, res) => {
  try {
    const order = req.params.order;
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

// Get archetypes by trait
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

// Get archetypes by planet
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

// Get archetypes by third eye shape
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

// Get archetypes by weakness
exports.getByWeakness = (req, res) => {
  try {
    const { weakness } = req.params;
    const archetypes = ArchetypeModel.filterByProperty("weaknesses", weakness);
    if (!archetypes || archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the provided weakness" });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by weakness.",
      error: error.message,
    });
  }
};

// Method to filter archetypes by fear
exports.getByFear = (req, res) => {
  try {
    const { fear } = req.params;
    const archetypes = ArchetypeModel._filterByProperty("fears", fear);
    if (!archetypes || archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the provided fear" });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by fear.",
      error: error.message,
    });
  }
};

// Get archetypes by core value
exports.getByCoreValue = (req, res) => {
  try {
    const { coreValue } = req.params;
    const archetypes = ArchetypeModel.filterByProperty("coreValues", coreValue);
    if (!archetypes || archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the provided core value" });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by core value.",
      error: error.message,
    });
  }
};

// Get archetypes by preferred environment
exports.getByEnvironment = (req, res) => {
  try {
    const { environment } = req.params;
    const archetypes = ArchetypeModel._filterByProperty(
      "preferredEnvironments",
      environment
    );
    if (!archetypes || archetypes.length === 0) {
      return res
        .status(404)
        .json({ message: "No archetypes found with the provided environment" });
    }
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving archetypes by environment.",
      error: error.message,
    });
  }
};

// Get decision-making style for an archetype
exports.getDecisionMakingStyle = (req, res) => {
  try {
    const { name } = req.params;
    const archetype = ArchetypeModel.searchByName(name);
    if (!archetype || archetype.length === 0) {
      return res.status(404).json({ message: "Archetype not found" });
    }
    res.json({ decisionMakingStyle: archetype[0].decisionMakingStyle });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the decision-making style.",
      error: error.message,
    });
  }
};

// Get historical examples for an archetype
exports.getHistoricalExamples = (req, res) => {
  try {
    const { name } = req.params;
    const examples = ArchetypeModel.getHistoricalExamples(name);
    if (!examples || examples.length === 0) {
      return res
        .status(404)
        .json({ message: "No historical examples found for this archetype" });
    }
    res.json(examples);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving historical examples.",
      error: error.message,
    });
  }
};

// Get mythological references for an archetype
exports.getMythologicalReferences = (req, res) => {
  try {
    const { name } = req.params;
    const references = ArchetypeModel.getMythologicalReferences(name);
    if (!references || references.length === 0) {
      return res.status(404).json({
        message: "No mythological references found for this archetype",
      });
    }
    res.json(references);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving mythological references.",
      error: error.message,
    });
  }
};

// Get practical applications for an archetype
exports.getPracticalApplications = (req, res) => {
  try {
    const { name } = req.params;
    const applications = ArchetypeModel.getPracticalApplications(name);
    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No practical applications found for this archetype",
      });
    }
    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving practical applications.",
      error: error.message,
    });
  }
};

// Search by name
exports.search = (req, res) => {
  try {
    const name = req.query.name;
    if (!name) throw new Error("No name query provided");

    const filtered = ArchetypeModel.searchByName(name);
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
    const archetypes = ArchetypeModel.findAll();
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

    const filtered = ArchetypeModel.filterByTrait(trait);
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

    const archetypes = ArchetypeModel.findAll();
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
