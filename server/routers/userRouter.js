const router = require("express").Router();

const userController = require("../controllers/userController");
const authorizationUser = require("../middleware/authorizationUser");

router.post("/register", userController.register);
router.get("/refreshtoken", userController.refreshToken);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/infor", authorizationUser, userController.getUser);
router.patch("/addcart", authorizationUser, userController.addCart);

module.exports = router;
