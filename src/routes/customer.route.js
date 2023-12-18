const express = require("express");
const router = express.Router();
const { customerController } = require("../controllers");

const authenticateUser = require("../middleware/auth");

router.post(
  "/addCustomer",
  authenticateUser,
  customerController.saveCustomerDetails
);

module.exports = router;
