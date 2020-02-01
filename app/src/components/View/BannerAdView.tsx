import React from 'react'
import { View, Text } from 'react-native'
import styles, { WIDTH, defaultMargin, defaultBorder, color1 } from '../styles'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const secret = require('../../../secret.json')

const BannerAdView = () => {
    return (
        <View style={{ width: WIDTH - defaultMargin * 2, alignSelf: 'center', borderRadius: defaultBorder, backgroundColor: color1, padding: 10, ...styles.defaultShadow, marginBottom: defaultMargin, alignItems: 'center', justifyContent: 'center' }}>
            <BannerAd
                unitId={secret.admob.homeBannerAdId}
                // unitId={TestIds.BANNER}
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: false,
                    testDevices: [
                        'EMULATOR',
                        'C2E2AD831DFDF0C51499307BCE07DA95'
                    ]
                }}
            />
        </View>
    )
}

export default BannerAdView
