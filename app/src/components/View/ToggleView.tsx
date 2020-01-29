import React from 'react'
import { View, Text, ViewProps, TouchableWithoutFeedbackProps } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styles, { WIDTH, color1 } from '../styles'

type ToggleViewProps = {
    isOn: boolean
} & TouchableWithoutFeedbackProps


const ToggleView: React.FC<ToggleViewProps> = (props) => {
    const style = props.style ? props.style.valueOf() : {}
    return (
        <TouchableWithoutFeedback
            {...props}
            style={{ width: WIDTH - 80, backgroundColor: props.isOn ? color1 : 'white', ...styles.alignCenter, height: 50, borderRadius: 25, alignSelf: 'center', ...style }}
        />
    )
}

export default ToggleView
