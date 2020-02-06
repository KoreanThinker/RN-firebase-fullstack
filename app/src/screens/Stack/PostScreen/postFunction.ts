import { postType } from "../../../components/types"
import functions from '@react-native-firebase/functions'

async function postFunction({ userId, description, image }: postType): Promise<any> {
    const instance = functions().httpsCallable('createPost')
    try {
        await instance({ userId, description, image })
    } catch (error) {
        throw error
    }
    return userId
}

export default postFunction