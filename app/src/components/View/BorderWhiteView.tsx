import React from 'react'
import { View, Text, ViewProps, TouchableWithoutFeedbackProps } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styles, { WIDTH } from '../styles'




const BorderWhiteView: React.FC<TouchableWithoutFeedbackProps> = (props) => {
    const style = props.style ? props.style.valueOf() : {}
    return (
        <TouchableWithoutFeedback
            {...props}
            style={{ width: WIDTH - 80, backgroundColor: 'white', ...styles.alignCenter, height: 50, borderRadius: 25, alignSelf: 'center', ...style }}
        />
    )
}

export default BorderWhiteView
