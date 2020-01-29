import React from 'react'
import { View, TextInputProps, TextInput } from 'react-native'
import { WIDTH } from '../styles'

const HarfOpacityInput: React.FC<TextInputProps> = (props) => {
    const style: Object = props.style ? props.style.valueOf() : {}
    props.style = undefined

    return (
        <View
            style={{ width: WIDTH - 80, height: 50, borderRadius: 25, alignSelf: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', paddingHorizontal: 36, justifyContent: 'center', ...style }}
        >
            <TextInput
                placeholderTextColor='rgba(255, 255, 255, 0.9)'
                {...props}
                style={{ fontSize: 14, color: '#fff', margin: 0 }}
            />
        </View>
    )
}

export default HarfOpacityInput
