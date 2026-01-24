const express = require("express");
const {joiValidate} = require("../middlewares/joiValidate");
const {registerSchema, loginSchema, changePasswordSchema} = require("../schemas/userSchema");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authRequired");
const router = express.Router();

router.post("/register", joiValidate(registerSchema), authController.createUser);
router.post("/login", joiValidate(loginSchema), authController.login);
router.get("/me", authMiddleware, authController.getUserInfo);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authMiddleware, authController.logout);
router.post("/verify-email", authController.verifyEmail)
router.post("/resend-verify-token", authMiddleware ,authController.resendVerifyToken)
router.post("/change-password", authMiddleware, joiValidate(changePasswordSchema), authController.changePassword);

module.exports = router;