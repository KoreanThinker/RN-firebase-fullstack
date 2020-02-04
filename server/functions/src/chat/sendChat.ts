import * as functions from 'firebase-functions';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { sendChatProps } from '.';
import { createChat } from '../lib/chat';
import { chatIdGenerator } from '../lib/generator/idGenerator';


export const sendChat = functions.https.onCall(async (data: sendChatProps, context) => {
    if (!context.auth) {
        throw new HttpsError('unauthenticated', 'user must be logged in')
    }
    const chatId = chatIdGenerator()
    const writeResult = await createChat(data.userId, chatId, data)
    const createdAt = writeResult.writeTime.toMillis()

    return {
        createdAt
    }
})