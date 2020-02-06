import * as functions from 'firebase-functions';
import { getPostProps } from '.'
import { Post } from '..';
import { HttpsError } from 'firebase-functions/lib/providers/https';
import { getPostDocumentsOrderByCreatedAt, getPostDocumentsBeforeCreatedAt } from '../lib/post';

export const getPost = functions.https.onCall(async (data: getPostProps, context): Promise<Post[]> => {
    if (!context.auth) {
        throw new HttpsError('unauthenticated', 'user must be logged in')
    }


    const { afterCreatedAt } = data
    let postDocs;
    if (afterCreatedAt) {
        postDocs = await getPostDocumentsBeforeCreatedAt(afterCreatedAt)
    } else {
        postDocs = await getPostDocumentsOrderByCreatedAt()
    }


    if (postDocs.size > 0) {
        return postDocs.docs.map((postDocs) => postDocs.data()) as Post[]
    }
    else {
        return []
    }
})