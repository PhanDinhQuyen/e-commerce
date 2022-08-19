const { User } = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      if (!/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
        return res.status(400).json({
          msg: "Minimum eight characters, at least one letter and one number",
        });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      // Then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refreshtoken",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      return res.status(200).json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Please check your email address and try again." });
      //Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res
          .status(400)
          .json({ msg: "Please check your password and try again." });
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refreshtoken",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });
      return res.json({ accessToken, isPasswordValid });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/user/refreshToken" });
      return res.json({ msg: "Logout successful." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findById(id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      await User.findByIdAndUpdate(
        { _id: id },
        {
          cart: req.body.cart,
        }
      );
      res.status(200).json({ msg: "Cart added successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const refreshtoken = req.cookies.refreshtoken;
      if (!refreshtoken)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err)
            return res.status(400).json({ msg: "Please Login or Register" });

          const accessToken = createAccessToken({ id: user.id });

          res.status(200).json({ accessToken });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userController;
