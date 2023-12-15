const express = require("express");
const router = express.Router();
const pickUpController = require("../controllers/pickUp.controller");

router.post("/addPickUpDetails", pickUpController.savePickUpDetails);

router.put("/updateDetails/:id", pickUpController.updateDetails);

module.exports = router;
