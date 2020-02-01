import React from 'react'
import { View, Text } from 'react-native'
import styles, { WIDTH, defaultMargin, defaultBorder } from '../../../components/styles'
import HyperLink from 'react-native-hyperlink'

const NotiPostCard = () => {
    return (
        <View style={{ width: WIDTH - defaultMargin * 2, padding: defaultMargin, ...styles.defaultShadow, borderRadius: defaultBorder, backgroundColor: '#fff', alignSelf: 'center', marginVertical: defaultMargin }}>
            <HyperLink
                linkStyle={styles.defaultLink}
                linkDefault={true}
                linkText={url => url === 'https://play.google.com/store/apps/details?id=com.schoolapp.schoolappuser' ? '링크' : url}
            >
                <Text style={styles.defaultFont} >더 자세한 SNS 포트폴리오는 https://play.google.com/store/apps/details?id=com.schoolapp.schoolappuser<Text>를 통해 확인하실 수 있습니다</Text></Text>
            </HyperLink>
        </View>
    )
}

export default NotiPostCard
