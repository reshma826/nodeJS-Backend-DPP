const express = require("express");
const router = express.Router();
const pickUpController = require("../controllers/pickUp.controller");

const authenticateUser = require("../middleware/auth");

router.post(
  "/addPickUpDetails",
  authenticateUser,
  pickUpController.savePickUpDetails
);

router.put(
  "/updateDetails/:id",
  authenticateUser,
  pickUpController.updateDetails
);

module.exports = router;
