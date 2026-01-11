const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const conversationRoute = require("./conversations.route");
const userRoute = require("./users.route");

router.use('/auth', authRoute);
router.use("/conversations", conversationRoute);
router.use("/users", userRoute);

module.exports = router;

