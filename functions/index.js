const functions = require("firebase-functions");
const app = require("./app"); // Ensure this path is correct to where your Express app is defined

exports.api = functions.https.onRequest(app);
