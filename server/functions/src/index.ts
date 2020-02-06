
export type Timestamp = number

export type RoomId = string
export type ChatId = string
export type PostId = string
export type UserId = string

export type Chat = {
    userId: UserId,
    message: string,
    createdAt: Timestamp
    chatId: ChatId,
    roomId: RoomId
}

export type Post = {
    userId: UserId,
    description: string,
    createdAt: Timestamp,
    postId: string,
    image: string
}

export { sendChat, getChat } from './chat'
export { getPost } from './post'