import { UserId } from '..'

export type getChatProps = {
    userId: UserId
}
export type sendChatProps = {
    userId: UserId,
    message: string
}


export { getChat } from './getChat'
export { sendChat } from './sendChat'
