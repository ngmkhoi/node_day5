const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .required(),

    full_name: Joi.string()
        .optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };