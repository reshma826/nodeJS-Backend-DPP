const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryDetails.controller");
const authenticateUser = require("../middleware/auth");

router.post(
  "/addDetails",
  authenticateUser,
  deliveryController.saveDeliveryDetails
);

router.put(
  "/updateDetails/:id",
  authenticateUser,
  deliveryController.updateDetails
);

module.exports = router;
