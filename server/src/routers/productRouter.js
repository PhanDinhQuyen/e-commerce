const router = require("express").Router();
const { authorizationUser, authorizationAdmin } = require("../middleware");
const { productController } = require("../controllers");

router.route("/products").get(productController.getProducts);

router.post(
  "/product",
  authorizationUser,
  authorizationAdmin,
  productController.createProduct
);

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
