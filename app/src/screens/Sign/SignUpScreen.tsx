import React, { useRef, useState } from 'react'
import { View, Text } from 'react-native'
import styles, { defaultBackgroundColor } from '../../components/styles'
import ToggleInput from '../../components/Input/ToggleInput'
import ToggleView from '../../components/View/ToggleView'
import useNavigation from '../../hooks/useNavigation'

const SignUpScreen = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [name, setName] = useState('')

    const isCorrect = (): boolean => {
        if (email.length > 5) return true
        return false
    }

    const onSubmit = () => {
        if (!isCorrect()) return
        //이메일 중복확인 등 서버통신
        navigation.navigate('MainStack')
    }

    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <ToggleInput
                placeholder='이메일'
                style={{ marginTop: 50 }}
                value={email}
                onChangeText={t => setEmail(t)}
            />
            <ToggleInput
                placeholder='비밀번호'
                style={{ marginTop: 24 }}
                value={pw}
                onChangeText={t => setPw(t)}
            />
            <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 12 }}>영문/숫자 6자리 이상</Text>
            <ToggleInput
                placeholder='닉네임'
                style={{ marginTop: 32 }}
                value={name}
                onChangeText={t => setName(t)}
            />
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 50 }}>
                <ToggleView
                    isOn={isCorrect()}
                    onPress={onSubmit}
                >
                    <Text style={{ ...styles.defaultFont, color: isCorrect() ? '#fff' : '#000' }}>완료</Text>
                </ToggleView>
            </View>
        </View>
    )
}

SignUpScreen.navigationOptions = {
    title: '회원가입'
}

export default SignUpScreen
