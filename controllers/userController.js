const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ message: "The email address already exists" });
      }
      //Minimum eight characters, at least one letter, one number and one special character
      if (!/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
        return res.status(400).json({
          success: false,
          msg: "Minimum eight characters, at least one letter, one number and one special character",
        });
      }
      //Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: passwordHash,
      });
      //Save the new user to the database
      await newUser.save();
      //Token
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = refreshAccessToken({ id: newUser._id });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};
const refreshAccessToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = userController;
