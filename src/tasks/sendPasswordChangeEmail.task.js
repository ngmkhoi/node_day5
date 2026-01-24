const emailService = require('../services/email.service');
const authModel = require('../models/auth.model');

async function sendPasswordChangeEmailTask(payload) {
    const { userId, time } = payload;
    const user = await authModel.findById(userId);

    if (!user) {
        throw new Error(`User not found: ${userId}`);
    }

    await emailService.sendPasswordChangeEmail(user, time);
    console.log(`📧 Password change email sent to: ${user.email}`);
}

module.exports = sendPasswordChangeEmailTask;
