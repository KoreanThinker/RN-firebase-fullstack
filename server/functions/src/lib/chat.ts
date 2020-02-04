import { WriteResult } from '@google-cloud/firestore'
import { RoomId, Chat, ChatId } from '..'
import { getChatCollection } from './firebase'
import { dateNowGenerator } from './generator/dateGenerator'

export type CreateChatDocumentData = Omit<Chat, 'roomId' | 'chatId' | 'createdAt'>

export const createChat = async (roomId: RoomId, chatId: ChatId, chatData: CreateChatDocumentData): Promise<WriteResult> => {
    const messageCreatedAt = dateNowGenerator()

    const newChatData: Chat = {
        ...chatData,
        roomId,
        chatId,
        createdAt: messageCreatedAt,
    }

    return await getChatCollection(roomId)
        .doc(chatId)
        .set(newChatData)
}