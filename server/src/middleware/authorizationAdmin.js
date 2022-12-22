const User = require("../models/userModel");

// Middleware function to verify if the authenticated user has the admin role
const authorizationAdmin = async (req, res, next) => {
  try {
    // Find the user in the database based on the user ID in the JWT
    const user = await User.findOne({ _id: req.user.id });

    // If the user does not have the admin role, return a response with a status of 400 and an error message
    if (user.role !== Number(process.env.ROLE_ADMIN)) {
      return res.status(400).json({ msg: "Admin resource access denied" });
    }

    // If the user has the admin role, call the next middleware in the chain
    next();
  } catch (err) {
    // If there is an error, return a response with a status of 500 and an error message
    res.status(500).json({ msg: err.message });
  }
};

module.exports = authorizationAdmin;
