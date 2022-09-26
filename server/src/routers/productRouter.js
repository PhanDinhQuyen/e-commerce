const router = require("express").Router();
const { authorizationUser, authorizationAdmin } = require("../middleware");
const { productController } = require("../controllers");

router
  .route("/product")
  .post(authorizationUser, authorizationAdmin, productController.createProduct)
  .get(productController.getProducts);
router.route("/product/all").get(productController.getAllProduct);

router
  .route("/product/:id")
  .get(productController.getProductWithId)
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
