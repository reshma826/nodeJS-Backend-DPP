const fireBaseService = require("../services/firebase.service");
const userService = require("../services/user.service");

const googleSignIn = async (req, res) => {
  const { idToken } = req.body;
  try {
    const user = await fireBaseService.verifyToken(idToken);
    // Handle user data or authentication logic
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};

const userLogin = async (req, res) => {
  const response = await userService.createUser(req.body);
  res.send({ response });
};

module.exports = {
  googleSignIn,
  userLogin,
};
