const express = require("express");
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/auth");
const router = express.Router();
const authValidation = require('../validations/auth.validation');
const validate = require("../middlewares/validate");

router.post("/register", validate(authValidation.register), authController.register);
router.post("/login", validate(authValidation.login),authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-tokens",validate(authValidation.refreshTokens), authController.refreshTokens);
module.exports = router;
