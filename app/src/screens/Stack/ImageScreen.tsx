import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import useNavigation from '../../hooks/useNavigation'
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

export type ImageScreenPropsType = {
    images: string[],
}

const ImageScreen = () => {
    const navigation = useNavigation<ImageScreenPropsType>()
    // const images = navigation.state.params.images
    const [index, setIndex] = useState(0)
    const images = ['https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500']

    if (!images) navigation.goBack()

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }} >
            <View style={{ height: 50, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 99, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <TouchableWithoutFeedback
                    onPress={() => navigation.goBack()}
                    style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Icon name='arrowleft' color='#fff' size={26} />
                </TouchableWithoutFeedback>
            </View>

            <ReactNativeZoomableView
                maxZoom={3}
                minZoom={0.7}
                zoomStep={0.5}
                initialZoom={1}
                style={{ flex: 1 }}
            >
                <Image
                    source={{ uri: images[index] }}
                    style={{ flex: 1 }}
                    resizeMode='contain'
                />
            </ReactNativeZoomableView>
        </View>
    )
}

ImageScreen.navigationOptions = {
    headerShown: false
}

export default ImageScreen
