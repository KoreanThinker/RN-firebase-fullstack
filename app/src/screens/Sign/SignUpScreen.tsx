import React, { useRef, useState, forwardRef } from 'react'
import { View, Text, TextInputProps, TextInput } from 'react-native'
import styles, { defaultBackgroundColor } from '../../components/styles'
import ToggleInput from '../../components/Input/ToggleInput'
import ToggleView from '../../components/View/ToggleView'
import useNavigation from '../../hooks/useNavigation'
import { sendToast, isEmail } from '../../components/functions'
import auth from '@react-native-firebase/auth';
import { pwTest } from '../../components/options'


const SignUpScreen = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')

    const [loading, setLoading] = useState(false)

    const emailInput = useRef<TextInput>(null)
    const pwInput = useRef<TextInput>(null)

    const isCorrect = (): boolean => {
        if (isEmail(email) && pwTest.test(pw)) return true
        return false
    }

    const onSubmit = async () => {
        if (!isCorrect()) return
        if (loading) return
        setLoading(true)
        try {
            await auth().createUserWithEmailAndPassword(email, pw)
            setLoading(false)
            navigation.navigate('MainStack')
        } catch (e) {
            setLoading(false)
            switch (e.code) {
                case 'auth/invalid-email':
                    sendToast('이메일 형식을 맞춰주세요')
                    emailInput.current.focus()
                    break;
                case 'auth/email-already-in-use':
                    sendToast('이미 사용중인 이메일 입니다')
                    break;
                case 'auth/weak-password':
                    sendToast('비밀번호 보안 수준이 약합니다')
                    pwInput.current.focus()
                    break;
                case 'auth/operation-not-allowed':
                    sendToast('현재 이메일 로그인이 불가능합니다')
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
                style={{ marginTop: 50 }}
                value={email}
                onChangeText={t => setEmail(t)}
                editable={!loading}
                ref={emailInput}
            />
            <ToggleInput
                placeholder='비밀번호'
                style={{ marginTop: 24 }}
                value={pw}
                onChangeText={t => setPw(t)}
                editable={!loading}
                secureTextEntry={true}
                ref={pwInput}
                onSubmitEditing={() => onSubmit()}
            />
            <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 12 }}>영문/숫자 6자리 이상</Text>

            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 50 }}>
                <ToggleView
                    isOn={isCorrect() && !loading}
                    onPress={onSubmit}
                >
                    <Text style={{ ...styles.defaultFont, color: isCorrect() && !loading ? '#fff' : '#000' }}>완료</Text>
                </ToggleView>
            </View>
        </View>
    )
}

SignUpScreen.navigationOptions = {
    title: '회원가입'
}

export default SignUpScreen
