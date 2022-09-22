// The Cloud Functions for Firebase SDK to create
// Cloud Functions and set up triggers.
import * as functions from "firebase-functions";
// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// const functions = require('firebase-functions');

exports.bigben = functions.https.onRequest((_, res) => {
  const hours = (new Date().getHours() % 12) + 1; // London is UTC + 1hr;
  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      ${"BONG ".repeat(hours)}
    </body>
  </html>`);
});
