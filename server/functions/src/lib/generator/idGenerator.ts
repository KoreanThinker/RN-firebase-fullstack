import * as shortUUID from 'short-uuid'

export const chatIdGenerator = (): string => {
    return 'chat' + shortUUID.generate()
}

export const postIdGenerator = (): string => {
    return 'post' + shortUUID.generate()
}