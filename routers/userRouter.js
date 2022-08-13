const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.get("/refreshToken", userController.refreshToken);

module.exports = router;
