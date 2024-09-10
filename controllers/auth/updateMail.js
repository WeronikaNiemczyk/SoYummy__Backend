// controllers/auth/updateMail.js

const User = require("../../models/user.model");
const { updateMailSchema } = require("../../validations/validation");
const { v4: uuidv4 } = require("uuid");
const emailService = require("../../services/email.service"); // Importowanie funkcji wysyłania maila

const updateMail = async (req, res, next) => {
  const { error } = updateMailSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const verificationToken = uuidv4(); // Generowanie tokena weryfikacyjnego
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { email: req.body.email, verify: false, verificationToken },
      { new: true }
    );

    const verificationLink = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/verify/${verificationToken}`; // Tworzenie linku weryfikacyjnego

    await emailService.sendVerificationEmail(user.email, verificationLink); // Wysyłanie maila weryfikacyjnego

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating email:", error); // Dodano logowanie błędów
    res.status(500).json({ message: "Failed to update email" });
  }
};

module.exports = updateMail;
