import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import useTodo from '../../hooks/useTodo'

const HomeScreen = () => {
    const { onChange, number } = useTodo()

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text >{number}</Text>
            <TouchableWithoutFeedback
                onPress={() => onChange((parseInt(number) + 1).toString())}
            >
                <Text  >+1</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => onChange((parseInt(number) - 1).toString())}
            >
                <Text >-1</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default HomeScreen
