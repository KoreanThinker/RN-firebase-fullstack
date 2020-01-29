import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styles, { color1 } from '../styles'

type MaterialToggleProps = {
    value: boolean,
    onPress(): void
}

const MaterialToggle: React.FunctionComponent<MaterialToggleProps> = ({ value, onPress }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                onPress()
            }}
            style={{ width: '100%', height: '100%', ...styles.alignCenter }}
        >
            <Icon name={value ? 'check-box' : 'check-box-outline-blank'} size={20} color={value ? color1 : '#aaa'} />
        </TouchableWithoutFeedback>
    )
}

export default MaterialToggle
