import * as admin from 'firebase-admin';
const servicekey = require('../../key/serviceKey.json')


admin.initializeApp({
    credential: admin.credential.cert(servicekey),
    databaseURL: "https://rnfirebasefullstack.firebaseio.com"
});


export const COLLECTION_CHAT_ROOM_NAME = 'chatRooms'
export const COLLECTION_CHAT_NAME = 'chat'
export const firestore = admin.firestore()

export const database = admin.database()
export const messaging = admin.messaging()


export const chatRoomCollection = firestore.collection(COLLECTION_CHAT_ROOM_NAME)
export const getChatCollection = (userid: string) => chatRoomCollection.doc(userid).collection(COLLECTION_CHAT_NAME)