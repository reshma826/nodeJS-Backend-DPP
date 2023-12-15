const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryDetails.controller");

router.post("/addDetails", deliveryController.saveDeliveryDetails);

router.put("/updateDetails/:id", deliveryController.updateDetails);

module.exports = router;
