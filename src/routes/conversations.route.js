const express = require("express");
const conversationController = require("../controllers/conversation.controller");
const authMiddleware = require("../middlewares/authRequired");
const {joiValidate} = require("../middlewares/joiValidate");
const {createConversationSchema, addParticipantSchema} = require("../schemas/conversationSchema");
const router = express.Router();

router.post("/", authMiddleware, joiValidate(createConversationSchema) ,conversationController.create);

router.get("/", authMiddleware, conversationController.getUserConversation)

router.post(
    '/:id/participants',
    authMiddleware,
    joiValidate(addParticipantSchema),
    conversationController.addParticipant
);

router.post(
    "/:id/messages",
    authMiddleware,
    conversationController.sendMessage
);

router.get(
    "/:id/messages",
    authMiddleware,
    conversationController.getMessages
);

module.exports = router;