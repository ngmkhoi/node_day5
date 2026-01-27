const userModel = require("../models/user.model");
const emailService = require("../services/email.service");

async function dailyReport() {
    const reportNewUser = await userModel.countNewUser()
    await emailService.sendNewUserDailyReport(reportNewUser, "tpfkhoi0411@gmail.com")
}

module.exports = dailyReport;