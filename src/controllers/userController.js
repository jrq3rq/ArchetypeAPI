const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Additional methods like createUser, updateUser, deleteUser, etc.

module.exports = {
  getAllUsers,
  // other methods
};
