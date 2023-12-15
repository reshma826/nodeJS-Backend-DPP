const express = require("express");
const router = express.Router();
const { customerController } = require("../controllers");

router.post("/addCustomer", customerController.saveCustomerDetails);

module.exports = router;
