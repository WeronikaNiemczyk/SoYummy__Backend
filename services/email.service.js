// services/email.service.js

const nodemailer = require("nodemailer");
const mjml2html = require("mjml");
require("dotenv").config();

// Utwórz transportera Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Możesz użyć innej usługi e-mail lub własnego SMTP
  auth: {
    user: process.env.EMAIL_USER, // Twój adres e-mail
    pass: process.env.EMAIL_PASS, // Hasło do konta e-mail
  },
});

const sendVerificationEmail = async (to, verificationLink) => {
  const mjmlTemplate = `
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>
              <h1>Welcome to our cooking recipes app!</h1>
            </mj-text>
            <mj-text>
              <p>If you want to use our recipe database and create your own recipe book, you must verify your e-mail address.</p>
            </mj-text>
            <mj-button href="${verificationLink}">
              Verify Email
            </mj-button>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;

  const { html } = mjml2html(mjmlTemplate);

  const mailOptions = {
    from: process.env.EMAIL_USER, // Adres e-mail nadawcy
    to,
    subject: "Email Verification",
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};
