import { WriteResult, QuerySnapshot } from '@google-cloud/firestore'
import { Post, Timestamp, PostId } from '..'
import { postCollection } from './firebase'
import { dateNowGenerator } from './generator/dateGenerator'

export type CreatePostDocumentData = Omit<Post, 'createdAt' | 'postId'>


export const createPostDocument = async (postId: PostId, chatData: CreatePostDocumentData): Promise<WriteResult> => {
    const createdAt = dateNowGenerator()

    const newChatData: Post = {
        ...chatData,
        postId,
        createdAt
    }

    return await postCollection
        .doc(postId)
        .set(newChatData)
}


export const getPostDocumentsOrderByCreatedAt = async (limit = 5): Promise<QuerySnapshot> => {
    return await postCollection
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
}

export const getPostDocumentsBeforeCreatedAt = async (afterCreatedAt: Timestamp, limit = 5): Promise<QuerySnapshot> => {
    return await postCollection
        .where(`createdAt`, '<', afterCreatedAt)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
}