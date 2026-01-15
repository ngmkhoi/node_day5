const Joi = require('joi');
const { VALIDATION } = require('../config/constants');

const registerSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(VALIDATION.PASSWORD_MIN_LENGTH)
        .required(),

    full_name: Joi.string()
        .optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };