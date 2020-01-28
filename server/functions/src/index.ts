import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const hello = functions.https.onCall(async data => {
    try {

        return 'Hello'
    } catch (error) {
        throw new functions.https.HttpsError('failed-precondition', error);
    }
})

