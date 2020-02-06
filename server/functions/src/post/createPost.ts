import * as functions from 'firebase-functions';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { createPostProps } from '.';
import { createPostDocument } from '../lib/post';
import { postIdGenerator } from '../lib/generator/idGenerator';


export const createPost = functions.https.onCall(async (data: createPostProps, context) => {
    if (!context.auth) {
        throw new HttpsError('unauthenticated', 'user must be logged in')
    }
    const postId = postIdGenerator()
    const writeResult = await createPostDocument(postId, data)
    const createdAt = writeResult.writeTime.toMillis()

    return {
        createdAt
    }
})