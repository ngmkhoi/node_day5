const conversationService = require('../services/conversation.service');

const conversationController = {
    create: async (req, res) => {
        try {
            const creatorId = req.user.id;
            const { name, type, participant_ids } = req.body;

            const result = await conversationService.createConversation({
                name,
                type,
                participantIds: participant_ids || [],
                creatorId
            });

            if (result.isExisting) {
                return res.success(result, 200)
            }

            res.success(
                result,
                201
            )
        } catch (error) {
            res.error(400, error.message)
        }
    },
    getUserConversation: async (req, res) => {
        try {
            const currentUserId = req.user.id;
            const result = await conversationService.getConversation(currentUserId);
            res.success(
                result,
                201
            )
        } catch (error) {
            res.error(500, error.message)
        }
    },
    addParticipant: async (req, res) => {
        try {
            const { id } = req.params;
            const { user_id } = req.body;
            const requesterId = req.user.id;

            if (!user_id) {
                return res.status(400).json({ message: "user_id is required." });
            }

            const result = await conversationService.addParticipantToGroup({
                conversationId: id,
                userIdToAdd: user_id,
                requesterId
            });

            res.status(200).json(result);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    sendMessage: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const senderId = req.user.id;

            if (!content || content.trim() === '') {
                return res.error(400, "Message content is required.");
            }

            const result = await conversationService.sendMessage({
                conversationId: id,
                senderId,
                content: content.trim()
            });

            res.success(result, 201);

        } catch (error) {
            res.error(400, error.message);
        }
    },

    getMessages: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const messages = await conversationService.getMessages({
                conversationId: id,
                userId
            });

            res.success(messages, 200);

        } catch (error) {
            res.error(400, error.message);
        }
    }
};

module.exports = conversationController;