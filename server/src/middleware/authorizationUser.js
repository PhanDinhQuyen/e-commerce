const jwt = require("jsonwebtoken");

const authorizationUser = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ msg: "Invalid authorization" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
      if (err) return res.status(400).json({ msg: "Invalid authorization" });
      req.user = token;
      next();
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

module.exports = authorizationUser;
