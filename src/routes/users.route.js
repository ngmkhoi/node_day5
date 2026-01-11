const express = require("express");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.get("/search", authMiddleware, usersController.search);

module.exports = router;