const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require("../../../nodejs-backend-826-firebase-adminsdk-afcbj-c99e7a6676.json")
  ),
});

const verifyToken = async (idToken) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken;
};

module.exports = {
  verifyToken,
};
