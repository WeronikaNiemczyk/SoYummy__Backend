// controllers/auth/sendNewsletterEmail.js

const emailService = require("../../services/email.service");

const sendNewsletterEmail = async (req, res) => {
  try {
    const { email } = req.user;
    const message =
      "You have successfully subscribed to the So Yummy newsletter!";
    await emailService.sendEmail(email, "Newsletter Subscription", message);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = sendNewsletterEmail;
