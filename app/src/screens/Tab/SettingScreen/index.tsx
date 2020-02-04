import React from 'react'
import { View, Text, FlatList, Linking } from 'react-native'
import styles, { color1, defaultBackgroundColor } from '../../../components/styles'
import Auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import SettingCard from './SettingCard'
import { sendToast } from '../../../components/functions'
import useNavigation from '../../../hooks/useNavigation'

export type settingType = {
    title: string,
    onPress: Function,
    icon: any
}

const SettingScreen = () => {
    const navigation = useNavigation()

    const SettingList: settingType[] = [
        {
            title: '크몽',
            onPress: () => {
                Linking.openURL('https://kmong.com/gig/201507')
            },
            icon: <Icon2 name='access-point' size={20} color={color1} />
        },
        {
            title: '깃허브',
            onPress: () => {
                Linking.openURL('https://github.com/KoreanThinker/RN-firebase-fullstack')
            },
            icon: <Icon2 name='github-circle' size={20} color={color1} />
        },
        {
            title: '이메일',
            onPress: () => {
                Linking.openURL('coderhyun476@gmail.com')
            },
            icon: <Icon2 name='email' size={20} color={color1} />
        },
        {
            title: '다른 포트폴리오 보기',
            onPress: () => {
                Linking.openURL('https://github.com/KoreanThinker/portfolio')
            },
            icon: <Icon2 name='account-card-details' size={20} color={color1} />
        },
        {
            title: '오픈소스 라이센스',
            onPress: () => {

            },
            icon: <Icon name='cloud' size={20} color={color1} />
        },
        {
            title: '로그아웃',
            onPress: () => {
                Auth().signOut()
                    .then(res => {
                        navigation.navigate('SignStack')
                    })
                    .catch(e => {
                        sendToast('다시 시도해 주세요')
                    })
            },
            icon: <Icon2 name='logout' size={20} color={color1} />
        }
    ]

    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>

            <FlatList
                style={{ flex: 1, ...styles.defaultShadow }}
                data={SettingList}
                renderItem={SettingCard}
                keyExtractor={(item, index) => `setting${index.toString()}`}
                ListHeaderComponent={
                    <View style={{ width: '100%', height: 200, backgroundColor: color1, ...styles.alignCenter }}>
                        <Text style={{ ...styles.defaultFont, color: '#fff' }}>반갑습니다</Text>
                        <Text style={{ ...styles.defaultFont, color: '#fff' }}>{Auth().currentUser.email}님</Text>
                    </View>
                }
            />
        </View>
    )
}

export default SettingScreen
