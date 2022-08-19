const router = require("express").Router();
const { authorizationUser, authorizationAdmin } = require("../middleware");

const { uploadController } = require("../controllers");
//Upload image
router.post(
  "/upload",
  authorizationUser,
  authorizationAdmin,
  uploadController.upload
);
//Delete image
router.post(
  "/destroy",
  authorizationUser,
  authorizationAdmin,
  uploadController.destroy
);

module.exports = router;
