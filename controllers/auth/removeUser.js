// controllers/auth/removeUser.js

const User = require("../../models/user.model");

const removeUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    req.logout(function (err) {
      if (err) {
        console.error("Error logging out user:", err); // Logowanie błędów
        return res.status(500).json({ message: "Failed to remove user" });
      }
      req.session.destroy(function (err) {
        if (err) {
          console.error("Error destroying session:", err); // Logowanie błędów
          return res.status(500).json({ message: "Failed to remove user" });
        }
        res.status(200).json({ message: "User removed successfully" });
      });
    });
  } catch (error) {
    console.error("Error removing user:", error); // Dodano logowanie błędów
    res.status(500).json({ message: "Failed to remove user" });
  }
};

module.exports = removeUser;
