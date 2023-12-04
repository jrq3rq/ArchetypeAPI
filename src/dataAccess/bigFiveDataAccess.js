// src/dataAccess/bigFiveDataAccess.js

const localBigFive = require("../data/bigFiveData.json");
const firebaseConfig = require("../config/firebaseConfig");
const admin = require("firebase-admin");
let db;

if (process.env.USE_FIRESTORE === "true") {
  if (!admin.apps.length) {
    // Check if no instance already exists
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  }
  db = admin.firestore();
}

const getBigFiveTraits = async () => {
  if (db) {
    // Get Big Five data from Firestore
    const snapshot = await db.collection("bigFive").get();
    return snapshot.docs.map((doc) => doc.data());
  } else {
    // Get data from local JSON file
    return localBigFive;
  }
};

module.exports = {
  getBigFiveTraits,
};
