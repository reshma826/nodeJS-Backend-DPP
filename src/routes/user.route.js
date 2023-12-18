const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.get("/google", userController.googleSignIn);

module.exports = router;
