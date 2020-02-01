import React, { useState } from 'react'
import { View, Text, FlatList, ListRenderItem, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import styles, { color1, WIDTH, defaultMargin, defaultBackgroundColor } from '../../../components/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { chatType } from '../../../components/types'
import Hyperlink from 'react-native-hyperlink'


const height = 40
const footerHeight = 54

const mock: chatType[] = [
    { id: '1', message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello', isMine: true },
    { id: '2', message: 'https://www.naver.com', isMine: false },
    { id: '3', message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello', isMine: true },
    { id: '4', message: 'https://www.naver.com', isMine: false },
    { id: '5', message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello', isMine: true },
    { id: '6', message: 'https://www.naver.com', isMine: false },
    { id: '7', message: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello', isMine: true },
    { id: '8', message: 'https://www.naver.com', isMine: false }
]

const sendingChat: chatType = { id: 'sending', message: '전송중...', isMine: true }

const ChatScreen = () => {

    const [chats, setChats] = useState(mock)
    const [myChat, setMyChat] = useState('')
    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(true)

    setTimeout(() => {
        setLoading(false)
    }, 1000);

    const onSend = () => {
        if (myChat.length == 0 || sending || loading) return
        setMyChat('')
        setSending(true)
        setChats([sendingChat].concat(chats))
        setTimeout(() => {
            setSending(false)
            setChats(mock)
        }, 1000);
    }

    const renderItem: ListRenderItem<chatType> = ({ item, index }) =>
        <View style={{ width: WIDTH, paddingHorizontal: defaultMargin, alignItems: item.isMine ? 'flex-end' : 'flex-start', marginTop: index == chats.length - 1 ? 40 : 10 }}>
            <View style={{ paddingHorizontal: defaultMargin, backgroundColor: item.isMine ? color1 : '#fff', minHeight: 40, justifyContent: 'center', borderRadius: 20, paddingVertical: 10, maxWidth: '80%' }}>
                <Hyperlink linkDefault={true} linkStyle={styles.defaultLink}>
                    <Text style={{ ...styles.defaultFont, lineHeight: 20, color: item.isMine ? '#fff' : '#000' }} >{item.message}</Text>
                </Hyperlink>
            </View>
        </View>

    return (
        <View style={{ backgroundColor: defaultBackgroundColor, flex: 1, alignItems: 'center', justifyContent: 'center' }}
        // behavior='padding'
        >
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
                keyExtractor={(item) => item.id}
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
                        editable={!sending}
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
        </View>
    )
}



export default ChatScreen
