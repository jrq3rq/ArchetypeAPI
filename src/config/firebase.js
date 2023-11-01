const admin = require("firebase-admin");
const serviceAccount = require("path_to_serviceAccount_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
});

module.exports = admin;
