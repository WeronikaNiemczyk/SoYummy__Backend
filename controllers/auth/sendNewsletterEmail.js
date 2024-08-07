// controllers/auth/sendNewsletterEmail.js

// const emailService = require("../../services/email.service");

// const sendNewsletterEmail = async (req, res) => {
//   try {
//     const { email } = req.user;
//     const message =
//       "You have successfully subscribed to the So Yummy newsletter!";
//     await emailService.sendEmail(email, "Newsletter Subscription", message);
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const sgMail = require("@sendgrid/mail");
const mjml2html = require("mjml");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendNewsletterEmail = async (req, res) => {
  const { to, subject, content } = req.body;

  const mjmlTemplate = `
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>
              <h1>${subject}</h1>
              <p>${content}</p>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;

  const { html } = mjml2html(mjmlTemplate);

  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Newsletter sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send newsletter" });
  }
};

module.exports = sendNewsletterEmail;
