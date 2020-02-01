import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { postType } from '../../../components/types'
import styles, { WIDTH, defaultMargin, defaultBorder } from '../../../components/styles'
import HyperLink from 'react-native-hyperlink'
import AutoHeightImage from 'react-native-auto-height-image';
import useNavigation from '../../../hooks/useNavigation'

const PostCard: React.FC<postType> = (props) => {
    const navigation = useNavigation()

    return (
        <View style={{ width: WIDTH - defaultMargin * 2, alignSelf: 'center', backgroundColor: '#fff', borderRadius: defaultBorder, ...styles.defaultShadow, marginBottom: defaultMargin, overflow: 'hidden' }}>
            {props.image && <TouchableWithoutFeedback
                onPress={() => navigation.navigate('ImageScreen', { images: [props.image] })}
            >
                <AutoHeightImage
                    source={{ uri: props.image }}
                    width={WIDTH - defaultMargin * 2}
                />
            </TouchableWithoutFeedback>}
            <View style={{ width: '100%', padding: defaultMargin }}>
                <HyperLink linkDefault={true} linkStyle={styles.defaultLink}>
                    <Text>
                        <Text style={{ ...styles.defaultFont, fontWeight: 'bold' }}>{props.userid == 'coderhyun476@gmail.com' ? '개발자' : props.userid.split('@')[0]}</Text>
                        <Text style={styles.defaultFont} > {props.description}</Text>
                    </Text>
                </HyperLink>
            </View>

        </View>
    )
}

export default PostCard
