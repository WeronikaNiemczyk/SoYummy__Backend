// controllers/auth/sendEmail.js

// const sgMail = require("@sendgrid/mail");
// const mjml2html = require("mjml");
const { sendVerificationEmail } = require("../../services/email.service");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
  const { to, subject, header1, header2, header3, text } = req.body;

  const mjmlTemplate = `
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>
              <h1>${header1}</h1>
              <h2>${header2}</h2>
              <h3>${header3}</h3>
              <p>${text}</p>
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
    await sendVerificationEmail(to, html); // Wywołaj funkcję z email.service.js
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }

  // try {
  //   await sgMail.send(msg);
  //   res.status(200).json({ message: "Email sent successfully" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Failed to send email" });
  // }
};

module.exports = sendEmail;
