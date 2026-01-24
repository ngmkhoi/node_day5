const emailService = require('../services/email.service');
const authModel = require('../models/auth.model');

async function sendVerificationEmailTask(payload) {
    const {userId, subject} = payload
    console.log(payload)
    const user = await authModel.findById(userId);
    console.log(user)
    if (!user) {
        throw new Error(`User not found: ${userId}`);
    }

    await emailService.sendVerifyEmail(user, subject);
    console.log(`📧 Verification email sent to: ${user.email}`);
}

module.exports = sendVerificationEmailTask;