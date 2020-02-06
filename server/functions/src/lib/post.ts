import { QuerySnapshot } from '@google-cloud/firestore'
import { postCollection } from './firebase'



export const getPostDocumentsOrderByCreatedAt = async (limit = 5): Promise<QuerySnapshot> => {
    return await postCollection
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
}