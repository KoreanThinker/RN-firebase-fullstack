import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import useNavigation from '../../hooks/useNavigation'
import styles, { color1, defaultBackgroundColor } from '../../components/styles'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import BorderWhiteView from '../../components/View/BorderWhiteView'
import HarfOpacityInput from '../../components/Input/HarfOpacityInput'
import { maxPW } from '../../components/options'
import auth from '@react-native-firebase/auth';
import { sendToast } from '../../components/functions'
import LoadingModal from '../../components/Modal/LoadingModal'
import { LoginManager, AccessToken } from 'react-native-fbsdk';

const SignInScreen = () => {
    const navigation = useNavigation()

    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [loading, setLoading] = useState(false)

    const onForgotPW = () => {
        navigation.navigate('ForgotPwScreen')
    }

    const onSignUp = () => {
        navigation.navigate('PolicyScreen', { nextFunction: () => navigation.navigate('SignUpScreen') })
    }

    const onFacebook = () => {
        navigation.navigate('PolicyScreen', { nextFunction: () => onFacebookSignIn() })
    }

    const onGoogle = () => {
        navigation.navigate('PolicyScreen', { nextFunction: () => onGoogleSignIn() })
    }

    const onSignIn = async () => {
        if (loading) return
        setLoading(true)
        if (!id || !pw) {
            sendToast('아이디 혹은 비밀번호를 입력해주세요')
            setLoading(false)
            return
        }
        try {
            await auth().signInWithEmailAndPassword(id, pw)
            setLoading(false)
            navigation.navigate('MainStack')
        } catch (e) {
            setLoading(false)
            switch (e.code) {
                case 'auth/invalid-email':
                    sendToast('이메일 형식을 맞춰주세요')
                    break;
                case 'auth/user-disabled':
                    sendToast('해당 이메일은 비활성화 되었습니다')
                    break;
                case 'auth/user-not-found':
                    sendToast('없는 이메일입니다')
                    setId('')
                    setPw('')
                    break;
                case 'auth/wrong-password':
                    sendToast('비밀번호가 틀렸습니다')
                    setPw('')
                    break;
                default:
                    sendToast('다시 시도해 주세요')
                    break;
            }
        }
    }

    const onFacebookSignIn = async () => {
        setLoading(true)
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) return;

        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            sendToast('다시 시도해 주세요')
        }
        const credential = auth.FacebookAuthProvider.credential(data.accessToken);
        try {
            await auth().signInWithCredential(credential);
            navigation.navigate('MainStack')
        } catch (e) {
            setLoading(false)
            switch (e.code) {
                case 'auth/account-exists-with-different-credential':
                    sendToast('해당 이메일은 이미 사용되었습니다. 다른 방법으로 로그인해 주세요')
                    break;
                default:
                    sendToast('다시 시도해 주세요')
                    break;
            }
        }
    }

    const onGoogleSignIn = async () => {

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
                    editable={!loading}
                />
                <HarfOpacityInput
                    placeholder='패스워드'
                    value={pw}
                    onChangeText={t => setPw(t)}
                    style={{ marginTop: 16 }}
                    secureTextEntry={true}
                    maxLength={maxPW}
                    editable={!loading}
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
                    onPress={onGoogle}
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
                    onPress={onFacebook}
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

            <LoadingModal
                visible={loading}
            />
        </View>
    )
}


SignInScreen.navigationOptions = ({ navigation }) => ({
    headerShown: false
})


export default SignInScreen
