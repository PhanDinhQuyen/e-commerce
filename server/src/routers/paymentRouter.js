const router = require("express").Router();
const { paymentController } = require("../controllers");
const { authorizationUser, authorizationAdmin } = require("../middleware");

router
  .route("/payment")
  .get(authorizationUser, authorizationAdmin, paymentController.getPayments)
  .post(authorizationUser, paymentController.createPayment);

module.exports = router;
