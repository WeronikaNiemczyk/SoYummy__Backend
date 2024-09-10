// controllers/auth/getCurrentUser.js

const getCurrentUser = async (req, res) => {
  try {
    const { name, email, subscription, avatarURL } = req.user;
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        name,
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

module.exports = getCurrentUser;
