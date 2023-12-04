const { check, validationResult } = require("express-validator");

// Sample validation for user creation
const validateUser = [
  check("email").isEmail(),
  check("password").isLength({ min: 5 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUser,
  validate,
};
