import React, { useState } from 'react'
import { View, TextInputProps, TextInput } from 'react-native'
import { WIDTH, color1 } from '../styles'

const ToggleInput: React.FC<TextInputProps> = (props) => {
    const [isFocused, setFocus] = useState(false)

    const style: Object = props.style ? props.style.valueOf() : {}
    props.style = undefined

    return (
        <View
            style={{ width: WIDTH - 80, height: 50, borderRadius: 25, alignSelf: 'center', backgroundColor: isFocused ? color1 : '#fff', paddingHorizontal: 36, justifyContent: 'center', ...style }}
        >
            <TextInput
                placeholderTextColor={isFocused ? '#fff' : '#000'}
                {...props}
                style={{ fontSize: 14, color: isFocused ? '#fff' : '#000', margin: 0 }}
                onFocus={() => setFocus(true)}
                onEndEditing={() => setFocus(false)}
            />
        </View>
    )
}

export default ToggleInput
