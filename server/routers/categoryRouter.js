const router = require("express").Router();
const { categoryController } = require("../controllers");
const { authorizationUser, authorizationAdmin } = require("../middleware");

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(
    authorizationUser,
    authorizationAdmin,
    categoryController.createCategory
  );

router
  .route("/category/:id")
  .delete(
    authorizationUser,
    authorizationAdmin,
    categoryController.deleteCategory
  )
  .patch(
    authorizationUser,
    authorizationAdmin,
    categoryController.updateCategory
  );

module.exports = router;
