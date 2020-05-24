//import * as functions from 'firebase-functions';
//import admin = require('firebase-admin');
//admin.initializeApp();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*exports.SignUpClaims = functions.auth.user().onCreate((user) => {
    
    let userData: Array<string> = [];
    if (user.email !== undefined) userData = user.email.split("--profile--");
    let profile = userData[1];
    
    let customClaims: object = {};
    switch(profile)
    {
        case "paciente":
            customClaims = {
                paciente: true
            };
            break;
        case "profesional":
            customClaims = {
                profesional: true
            };
            break;

        case "admin":
            customClaims = {
                admin: true
            };
            break;
        default:
            break;
    }

    return admin.auth().setCustomUserClaims(user.uid, customClaims)
                .then(() => {

                })
                .catch(() => {
                    
                });
});*/

  
 /* exports.SignUpClaims = functions.auth.user().onCreate((user) => {
    
    let userData: Array<string> = [];
    if (user.email !== undefined) userData = user.email.split("--profile--");
    let realEmail = userData[0];
    let profile = userData[1];
    
    let customClaims: object;
    switch(profile)
    {
        case "paciente":
            customClaims = {
                paciente: true
            };
            break;
        case "profesional":
            customClaims = {
                profesional: true
            };
            break;

        case "admin":
            customClaims = {
                admin: true
            };
            break;
        default:
            break;
    }

    return admin.auth().updateUser(user.uid, {email: realEmail})
        .then(() => {
            admin.auth().setCustomUserClaims(user.uid, customClaims)
                .then(() => {
                })
                .catch(() => {

                });
        })
        .catch(() => {

        });
    
    }
  );*/