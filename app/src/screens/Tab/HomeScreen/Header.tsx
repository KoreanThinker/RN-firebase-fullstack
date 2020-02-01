import React from 'react'
import { View, Text } from 'react-native'
import { defaultMargin, color1 } from '../../../components/styles'

const Header = () => {
    return (
        <View style={{ width: '100%', height: 50, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: defaultMargin, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: color1 }} >DEMOPROJECT</Text>
        </View>
    )
}

export default Header
