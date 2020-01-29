import React from 'react'
import { View, Text } from 'react-native'
import styles, { defaultBackgroundColor } from '../../components/styles'
import BorderWhiteView from '../../components/View/BorderWhiteView'
import useNavigation from '../../hooks/useNavigation'
import ToggleInput from '../../components/Input/ToggleInput'
import { sendToast } from '../../components/functions'

const ForgotPwScreen = () => {
    const navigation = useNavigation()

    const sendEmail = () => {
        navigation.goBack()
        sendToast('메일이 전송되었습니다')
    }

    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <ToggleInput
                placeholder='이메일'
                autoFocus={true}
                style={{ marginTop: 50 }}
                keyboardType='email-address'
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
