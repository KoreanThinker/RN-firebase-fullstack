import React from 'react'
import { View, Text } from 'react-native'
import WebView from 'react-native-webview'
import useNavigation from '../../hooks/useNavigation'

type NavigationParams = {
    url: string
}

const PolicyDetailScreen = () => {
    const navigation = useNavigation<NavigationParams>()
    const uri = navigation.state.params?.url === undefined ? '' : navigation.state.params?.url
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <WebView
                style={{ flex: 1 }}
                source={{ uri: uri }}
            />
        </View>
    )
}

PolicyDetailScreen.navigationOptions = ({ navigation }) => ({
    title: '약관 자세히',
})

export default PolicyDetailScreen
