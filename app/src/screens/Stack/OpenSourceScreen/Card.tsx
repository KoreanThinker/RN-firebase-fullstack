import React from 'react'
import { View, Text } from 'react-native'
import { openSource } from './openSourceList'
import { defaultMargin } from '../../../components/styles'

const Card: React.FC<openSource> = (props) => {
    return (
        <View style={{ width: '100%', padding: defaultMargin, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 20 }}>{props.title}</Text>
            <Text>{props.description}</Text>
            <Text>{props.type}</Text>
        </View>
    )
}

export default Card
