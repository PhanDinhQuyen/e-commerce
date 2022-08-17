const User = require("../models/userModel");

const authorizationAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!Boolean(user.role)) {
      return res.status(400).json({ msg: "Admin resource access denied" });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
module.exports = authorizationAdmin;
