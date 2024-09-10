// // controllers/auth/sendNewsletterEmail.js

// const { sendVerificationEmail } = require("../../services/email.service");
// const mjml2html = require("mjml");

// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendNewsletterEmail = async (req, res) => {
//   try {
//     const { to, subject, content } = req.body;

//     const mjmlTemplate = `
//     <mjml>
//       <mj-body>
//         <mj-section>
//           <mj-column>
//             <mj-text>
//               <h1>${subject}</h1>
//               <p>${content}</p>
//             </mj-text>
//           </mj-column>
//         </mj-section>
//       </mj-body>
//     </mjml>
//   `;

//     const { html } = mjml2html(mjmlTemplate);

//     await sendVerificationEmail(email, html);

//     res.status(200).json({ message: "Newsletter sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to send newsletter" });
//   }
// };

// module.exports = sendNewsletterEmail;
