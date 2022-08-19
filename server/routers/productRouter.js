const router = require("express").Router();
const { authorizationUser, authorizationAdmin } = require("../middleware");
const { productController } = require("../controllers");

router
  .route("/product")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/product/:id")
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct);

module.exports = router;
