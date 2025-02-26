const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, title, body) => {
    try {
        let recipientEmail = email?.trim();
        if (!recipientEmail) {
            throw new Error("Recipient email is missing or invalid.");
        }

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465, // Secure SMTP port
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: '"SquadMinds Pvt Ltd" <mohdarif727431@mail.com>',
            to: recipientEmail,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error in mailSender:", error);
    }
};

