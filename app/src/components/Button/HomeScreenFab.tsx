import React from 'react'
import { View, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native'
import styles, { defaultMargin, color1 } from '../styles'
import Icon from 'react-native-vector-icons/AntDesign'

const size = 50

const HomeScreenFab: React.FC<TouchableWithoutFeedbackProps> = (props) => {
    return (
        <TouchableWithoutFeedback
            {...props}
        >
            <View style={{ position: 'absolute', bottom: defaultMargin, right: defaultMargin, width: size, height: size, ...styles.alignCenter, backgroundColor: color1, borderRadius: size / 2, ...styles.defaultShadow }} >
                <Icon name='plus' size={28} color='#fff' />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default HomeScreenFab
