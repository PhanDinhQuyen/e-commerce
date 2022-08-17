const router = require("express").Router();

const userController = require("../controllers/userController");
const authorizationUser = require("../middleware/authorizationUser");
// Get
router.get("/logout", userController.logout);
router.get("/refreshtoken", userController.refreshToken);
router.get("/infor", authorizationUser, userController.getUser);
// Post
router.post("/login", userController.login);
router.post("/register", userController.register);
// Patch
router.patch("/addcart", authorizationUser, userController.addCart);

module.exports = router;
