import * as shortUUID from 'short-uuid'

export const chatIdGenerator = (): string => {
    return shortUUID.generate()
}