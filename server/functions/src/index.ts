
export type Timestamp = number

export type RoomId = string
export type ChatId = string
export type UserId = string

export type Chat = {
    userId: UserId,
    message: string,
    createdAt: Timestamp
    chatId: ChatId,
    roomId: RoomId
}

export { sendChat, getChat } from './chat'