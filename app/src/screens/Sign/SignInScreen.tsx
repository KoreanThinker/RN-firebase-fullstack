import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import useNavigation from '../../hooks/useNavigation'
import styles, { color1, defaultBackgroundColor } from '../../components/styles'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import BorderWhiteView from '../../components/View/BorderWhiteView'
import HarfOpacityInput from '../../components/Input/HarfOpacityInput'
import { maxPW } from '../../components/options'

const SignInScreen = () => {
    const navigation = useNavigation()

    const [id, setId] = useState('')
    const [pw, setPw] = useState('')

    const onForgotPW = () => {
        navigation.navigate('forgotPwScreen')
    }

    const onSignIn = () => {
        navigation.navigate('MainStack')
    }

    const onSignUp = () => {
        navigation.navigate('PolicyScreen')
    }

    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <View style={{ width: 800, height: 800, backgroundColor: color1, position: 'absolute', bottom: 260, borderRadius: 400, alignSelf: 'center' }} />
            <Text style={{ fontSize: 14, color: '#fff', position: 'absolute', left: 24, top: 30 }}>DEMO APPLICATION</Text>

            <View style={{ width: '100%', alignItems: 'center', marginTop: 110 }}>
                <HarfOpacityInput
                    placeholder='아이디'
                    value={id}
                    onChangeText={t => setId(t)}
                    keyboardType='email-address'
                />
                <HarfOpacityInput
                    placeholder='패스워드'
                    value={pw}
                    onChangeText={t => setPw(t)}
                    style={{ marginTop: 16 }}
                    secureTextEntry={true}
                    maxLength={maxPW}
                />
                <BorderWhiteView
                    onPress={onSignIn}
                    style={{ marginTop: 16 }}
                >
                    <Text style={{ ...styles.defaultFont }} >로그인</Text>
                </BorderWhiteView>
                <TouchableWithoutFeedback
                    onPress={onForgotPW}
                >
                    <Text style={{ ...styles.defaultFont, color: 'white', marginTop: 30 }}>비밀번호 찾기</Text>
                </TouchableWithoutFeedback>
            </View>

            <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 0 }}>

                <BorderWhiteView
                    onPress={onSignUp}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png' }}
                            style={{ width: 24, height: 50, marginRight: 28 }}
                            resizeMode='contain'
                        />
                        <Text>구글계정으로 로그인</Text>
                    </View>
                </BorderWhiteView>

                <BorderWhiteView
                    onPress={onSignUp}
                    style={{ marginTop: 16 }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://en.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png' }}
                            style={{ width: 24, height: 50, marginRight: 28 }}
                            resizeMode='contain'
                        />
                        <Text>페이스북으로 로그인</Text>
                    </View>
                </BorderWhiteView>

                <TouchableWithoutFeedback
                    onPress={onSignUp}
                >
                    <Text style={{ ...styles.defaultFont, marginBottom: 40, marginTop: 20 }} >이메일로 회원가입</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}


SignInScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})


export default SignInScreen
