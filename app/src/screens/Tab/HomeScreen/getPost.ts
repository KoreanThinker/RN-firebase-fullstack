import functions from '@react-native-firebase/functions';
import { postType } from '../../../components/types';

type getPostReturn = {
    postId: string,
    createdAt: number,
    userId: string,
    image: string,
    description: string
}

export const getPost = async (afterCreatedAt: number): Promise<getPostReturn[]> => {
    const instance = functions().httpsCallable('getPost')
    try {
        const response = await instance({ afterCreatedAt })
        return response.data
    } catch (error) {
        throw error
    }

}