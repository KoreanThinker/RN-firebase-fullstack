import { Timestamp, UserId } from "..";


export type getPostProps = {
    afterCreatedAt: Timestamp
}
export type createPostProps = {
    image: string,
    description: string,
    userId: UserId
}

export { getPost } from './getPost'
export { createPost } from './createPost'