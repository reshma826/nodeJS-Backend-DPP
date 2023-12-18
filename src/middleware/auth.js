const admin = require("firebase-admin");

const authenticateUser = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No bearer token provided" });
  }
  const token = bearerHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid bearer token format" });
  }
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      console.error("Authentication True");
      next();
    })
    .catch((error) => {
      console.error("Error verifying ID token:", error);
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid bearer token" });
    });
};

module.exports = authenticateUser;
