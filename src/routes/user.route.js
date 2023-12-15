const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.get("/google", userController.googleSignIn);

router.post("/user", userController.userLogin);

module.exports = router;
