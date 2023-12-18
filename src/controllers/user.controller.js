const fireBaseService = require("../services/firebase.service");
const userService = require("../services/user.service");

const googleSignIn = async (req, res) => {
  const { idToken } = req.body;
  try {
    const tokenResult = await fireBaseService.verifyToken(idToken);
    // Handle user data or authentication logic
    const { name, email } = tokenResult;

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      // User already exists, you can handle the response accordingly
      res.status(200).json({
        message: "User already esist",
        userId: existingUser.id,
      });
    } else {
      let userBody = {
        full_name: name,
        email: email,
      };
      const userResult = await userService.createUser(userBody);
      console.log("User logged in successfylly using google sign in");
      res.status(userResult.status).json({ userResult });
    }
  } catch (error) {
    res.status(401).json({ success: false, error: error });
  }
};

module.exports = {
  googleSignIn,
};
