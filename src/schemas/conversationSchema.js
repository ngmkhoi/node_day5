const Joi = require('joi');

const createConversationSchema = Joi.object({
    name: Joi.string().optional(),
    type: Joi.string().valid('direct', 'group').required(),
    participant_ids: Joi.array().items(Joi.number().integer().positive()).min(1).required()
})

const addParticipantSchema = Joi.object({
    user_id: Joi.number().integer().positive().required(),
})

module.exports = {
    createConversationSchema,
    addParticipantSchema
}