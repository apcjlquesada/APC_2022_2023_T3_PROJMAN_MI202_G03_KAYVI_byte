// dependencies
const express = require("express");

// config - express
const app = express();

// config - firebase
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// endpoint - reports
app.get("/reports", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let reports = [];
  db.collection("reports")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        reports.push(doc.data());
      });
      response.send(reports);
    });
});

// listen
app.listen(process.env.PORT || 3000);
