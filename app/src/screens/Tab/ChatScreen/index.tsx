import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ListRenderItem, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import styles, { color1, WIDTH, defaultMargin, defaultBackgroundColor } from '../../../components/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { chatType } from '../../../components/types'
import Hyperlink from 'react-native-hyperlink'
import Functions from '@react-native-firebase/functions'
import Auth from '@react-native-firebase/auth'
import { sendToast } from '../../../components/functions'

const height = 40
const footerHeight = 54



const ChatScreen = () => {

    const [chats, setChats] = useState([])
    const [myChat, setMyChat] = useState('')
    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const userId = Auth().currentUser.email
    const sendingChat: chatType = { id: 'sending', message: '전송중...', userId }

    const getChat = async () => {
        setIsError(false)
        const instance = Functions().httpsCallable('getChat')
        try {
            const response = await instance({
                userId: Auth().currentUser.email,
            })
            setChats(response.data as chatType[])
            setLoading(false)
            setSending(false)
        } catch (error) {
            console.log('Error: ' + error);
            sendToast('오류')
            setIsError(true)
        }
    }

    useEffect(() => {
        getChat()
    }, [])

    const onSend = async () => {
        if (myChat.length == 0 || sending || loading) return
        setMyChat('')
        setSending(true)
        setChats([sendingChat].concat(chats))

        const instance = Functions().httpsCallable('sendChat')
        try {
            await instance({
                userId: Auth().currentUser.email,
                message: myChat
            })
            getChat()
        } catch (error) {
            console.log('Error: ' + error);
            sendToast('오류')
            setLoading(false)
            setChats(chats.filter((item, index) => index !== 0))

        }
    }


    const renderItem: ListRenderItem<chatType> = ({ item, index }) =>
        <View style={{ width: WIDTH, paddingHorizontal: defaultMargin, alignItems: item.userId == userId ? 'flex-end' : 'flex-start', marginTop: index == chats.length - 1 ? 40 : 10 }}>
            <View style={{ paddingHorizontal: defaultMargin, backgroundColor: item.userId == userId ? color1 : '#fff', minHeight: 40, justifyContent: 'center', borderRadius: 20, paddingVertical: 10, maxWidth: '80%' }}>
                <Hyperlink linkDefault={true} linkStyle={styles.defaultLink}>
                    <Text style={{ ...styles.defaultFont, lineHeight: 20, color: item.userId == userId ? '#fff' : '#000' }} >{item.message}</Text>
                </Hyperlink>
            </View>
        </View>

    return (
        <View style={{ backgroundColor: defaultBackgroundColor, flex: 1, alignItems: 'center', justifyContent: 'center' }}
        // behavior='padding'
        >
            {isError
                ?
                <TouchableWithoutFeedback onPress={getChat} ><Text>다시시도</Text></TouchableWithoutFeedback>
                :
                <>
                    {
                        !loading && chats.length == 0 && <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 32 }}>
                            <Text>개발자와 채팅을 할 수 있습니다</Text>
                            <Text>편하게 질문 남겨주세요</Text>
                        </View>
                    }

                    <FlatList
                        inverted
                        data={chats}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `chat${index}`}
                        style={{ flex: 1, paddingTop: 20, }}
                        overScrollMode='never'
                    />

                    <View style={{ minHeight: footerHeight, backgroundColor: color1, width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: defaultMargin, paddingVertical: (footerHeight - height) / 2 }}>
                        <View style={{ minHeight: height, width: WIDTH - (defaultMargin * 3) - height, backgroundColor: '#fff', borderRadius: 20, justifyContent: 'center', paddingHorizontal: 16 }}>
                            <TextInput
                                placeholder='메시지를 입력해 주세요...'
                                style={{ ...styles.defaultFont, margin: 0, padding: 0 }}
                                multiline
                                value={myChat}
                                onChangeText={t => setMyChat(t)}
                                editable={!sending && !loading}
                            />
                        </View>
                        <View style={{ width: height, height, backgroundColor: '#fff', borderRadius: 20, marginLeft: defaultMargin, ...styles.alignCenter }}>
                            <TouchableOpacity
                                onPress={onSend}
                                style={{ flex: 1, ...styles.alignCenter }}
                            >
                                <Icon name='send' size={16} color={color1} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </>
            }
        </View>
    )
}



export default ChatScreen
