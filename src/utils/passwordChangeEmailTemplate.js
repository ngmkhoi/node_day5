const getPasswordChangeEmailTemplate = (time) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <tr>
                            <td style="background-color: #4CAF50; padding: 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Password Changed Successfully</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                                    Your password was changed successfully at <strong>${time}</strong>.
                                </p>
                                <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                                    If you did not make this change, please contact our support team immediately.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px 30px; background-color: #f9f9f9; text-align: center; border-top: 1px solid #eeeeee;">
                                <p style="margin: 0; color: #666666; font-size: 14px;">
                                     © ${new Date().getFullYear()} Khoivippro123 Company. All rights reserved.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

module.exports = getPasswordChangeEmailTemplate;