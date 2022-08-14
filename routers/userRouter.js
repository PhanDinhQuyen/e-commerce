const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.get("/refreshToken", userController.refreshToken);
router.post("/login", userController.login);

module.exports = router;
