// services/email.service.js

const sgMail = require("@sendgrid/mail");
const mjml2html = require("mjml");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL,
    subject: "Email Verification",
    html,
  };
  await sgMail.send(msg);
};

module.exports = {
  sendVerificationEmail,
};
