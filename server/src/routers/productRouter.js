const router = require("express").Router();
const { authorizationUser, authorizationAdmin } = require("../middleware");
const { productController } = require("../controllers");

router
  .route("/product")
  .post(authorizationUser, authorizationAdmin, productController.createProduct)
  .get(productController.getProducts);

router
  .route("/product/:id")
  .delete(
    authorizationUser,
    authorizationAdmin,
    productController.deleteProduct
  )
  .patch(
    authorizationUser,
    authorizationAdmin,
    productController.updateProduct
  );

module.exports = router;
