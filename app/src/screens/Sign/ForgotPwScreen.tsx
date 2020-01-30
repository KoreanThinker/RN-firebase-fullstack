import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styles, { defaultBackgroundColor } from '../../components/styles'
import BorderWhiteView from '../../components/View/BorderWhiteView'
import useNavigation from '../../hooks/useNavigation'
import ToggleInput from '../../components/Input/ToggleInput'
import { sendToast } from '../../components/functions'
import auth from '@react-native-firebase/auth';

const ForgotPwScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [loading, setloading] = useState(false)

    const sendEmail = async () => {
        if (!email) return
        if (loading) return
        setloading(true)
        try {
            await auth().sendPasswordResetEmail(email)
            setloading(false)
            navigation.goBack()
            sendToast('메일이 전송되었습니다')
        } catch (e) {
            setloading(false)
            switch (e.code) {
                case 'auth/invalid-email':
                    sendToast('이메일 형식을 맞춰주세요')
                    break;
                case 'auth/user-not-found':
                    sendToast('없는 이메일 입니다')
                    break;
                default:
                    sendToast('다시 시도해 주세요')
                    break;
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <ToggleInput
                placeholder='이메일'
                autoFocus={true}
                style={{ marginTop: 50 }}
                keyboardType='email-address'
                editable={!loading}
                value={email}
                onChangeText={t => setEmail(t)}
                onSubmitEditing={() => sendEmail()}
            />
            <BorderWhiteView
                onPress={sendEmail}
                style={{ marginTop: 24 }}
            >
                <Text style={{ ...styles.defaultFont }} >메일 보내기</Text>
            </BorderWhiteView>
            <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 30 }}>메일을 통해 비밀번호 재설정이 가능합니다</Text>
        </View>
    )
}

ForgotPwScreen.navigationOptions = {
    title: '비밀번호 찾기'
}

export default ForgotPwScreen
