import React from 'react'
import { View, Text } from 'react-native'
import styles, { WIDTH, defaultMargin, defaultBorder, color1 } from '../styles'

const BannerAdView = () => {
    return (
        <View style={{ width: WIDTH - defaultMargin * 2, alignSelf: 'center', borderRadius: defaultBorder, backgroundColor: color1, padding: defaultMargin, ...styles.defaultShadow, marginBottom: defaultMargin }}>

        </View>
    )
}

export default BannerAdView
