import * as functions from 'firebase-functions';
import { getChatProps } from '.'
import { Chat } from '..';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { getChatDocumentsOrderByCreatedAt } from '../lib/chat'

export const getChat = functions.https.onCall(async (data: getChatProps, context): Promise<Chat[]> => {
    if (!context.auth) {
        throw new HttpsError('unauthenticated', 'user must be logged in')
    }

    const { userId } = data
    const chatDocs = await getChatDocumentsOrderByCreatedAt(userId)

    if (chatDocs.size > 0) {
        return chatDocs.docs.map((chatDocs) => chatDocs.data()) as Chat[]
    }
    else {
        return []
    }
})