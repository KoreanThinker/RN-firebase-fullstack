import { postType } from "../../../components/types"
import functions from '@react-native-firebase/functions'
import storage from '@react-native-firebase/storage';
import short from 'short-uuid'


async function postFunction({ userId, description, image }: postType): Promise<any> {
    const instance = functions().httpsCallable('createPost')
    try {
        const name = Date.now().toString() + short().new()
        const storageRef = storage().ref().child(`postImages/${name}.jpg`)

        const blob = await new Promise<Blob>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        });

        const snapshot = await storageRef.put(blob)
        if (snapshot.state !== 'success') {
            throw new Error('업로드 실패')
        }
        const url = await storageRef.getDownloadURL()
        await instance({ userId, description, image: url })
    } catch (error) {
        console.log(error)
        throw error
    }
    return userId
}

export default postFunction