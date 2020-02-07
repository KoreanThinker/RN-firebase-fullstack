import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'
import styles, { defaultMargin, WIDTH, defaultBackgroundColor } from '../../../components/styles'
import AutoHeightImage from 'react-native-auto-height-image'
import useNavigation from '../../../hooks/useNavigation'
import ImagePicker from 'react-native-image-picker';
import { sendToast } from '../../../components/functions'
import postFunction from './postFunction'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/AntDesign'
import Auth from '@react-native-firebase/auth'
import LoadingModal from '../../../components/Modal/LoadingModal'

const ImagePickerOption = {
    title: '이미지를 골라주세요',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const PostScreen: NavigationStackScreenComponent = () => {

    const navigation = useNavigation()
    const [image, setImage] = useState<string>(null)
    const [description, setDescription] = useState('')
    const [userId, setUserId] = useState(Auth().currentUser.email)

    const [sending, setSending] = useState(false)

    const onPost = async () => {
        if (description === '') {
            sendToast('내용을 입력해주세요')
            return
        }
        setSending(true)
        try {
            await postFunction({ userId, description, image })
            navigation.goBack()
        } catch (error) {
            setSending(false)
            sendToast('다시 시도해주세요')
        }
    }

    useEffect(() => {
        navigation.setParams({ onPost })
    }, [description, userId, image])


    const onAddImage = () => {
        ImagePicker.launchImageLibrary(ImagePickerOption, (response) => {
            if (response.didCancel) {
                return;
            }
            else if (response.error) {
                sendToast('다시 시도해주세요')
            } else {
                setImage(response.uri)
            }
        });
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: defaultBackgroundColor }}
        >
            {image
                ?
                <TouchableWithoutFeedback
                    onPress={onAddImage}
                >
                    <View style={{ maxHeight: WIDTH, overflow: 'hidden', justifyContent: 'center' }}>
                        <AutoHeightImage
                            source={{ uri: image }}
                            width={WIDTH}
                        />
                    </View>
                </TouchableWithoutFeedback>
                :
                <TouchableWithoutFeedback
                    onPress={onAddImage}
                >
                    <View style={{ width: '100%', height: 50, paddingHorizontal: defaultMargin, justifyContent: 'center', ...styles.defaultBorderBottom }}>
                        <Text style={{ ...styles.defaultFont, color: 'rgba(0, 0, 0, 0.5)' }}>사진을 추가해 주세요...</Text>
                    </View>
                </TouchableWithoutFeedback>
            }
            <TextInput
                style={{ width: '100%', minHeight: 50, paddingHorizontal: 16 }}
                placeholder='내용을 입력해주세요...'
                multiline
                value={description}
                onChangeText={t => setDescription(t)}
                editable={!sending}
            />

            {sending &&
                <LoadingModal
                    visible={sending}
                />
            }
        </ScrollView>
    )
}

PostScreen.navigationOptions = ({ navigation }) => ({
    title: '게시물 작성',
    headerRight: <TouchableWithoutFeedback onPress={navigation.getParam('onPost')}>
        <View style={{ height: 50, width: 50, ...styles.alignCenter }}>
            <Icon name='check' color='#fff' size={24} />
        </View>
    </TouchableWithoutFeedback>
})

export default PostScreen
