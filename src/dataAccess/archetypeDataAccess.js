// src/dataAccess/archetypeDataAccess.js

const localArchetypes = require("../data/archetypes.json");
const firebaseConfig = require("../config/firebaseConfig");
const admin = require("firebase-admin");
let db;

if (process.env.USE_FIRESTORE === "true") {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
  db = admin.firestore();
}

const getArchetypes = async () => {
  if (db) {
    // Get data from Firestore
    const snapshot = await db.collection("archetypes").get();
    return snapshot.docs.map((doc) => doc.data());
  } else {
    // Get data from local JSON file
    return localArchetypes;
  }
};

module.exports = {
  getArchetypes,
};
