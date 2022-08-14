const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.get("/refreshToken", userController.refreshToken);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
module.exports = router;
