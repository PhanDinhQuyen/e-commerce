const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const authorizationUser = require("../middleware/authorizationUser");
const authorizationAdmin = require("../middleware/authorizationAdmin");

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(
    authorizationUser,
    authorizationAdmin,
    categoryController.createCategory
  );

module.exports = router;
