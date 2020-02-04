import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { color1 } from '../styles'

const DefaultActivityIndicator = () => {
    return (
        <>
            <ActivityIndicator color={color1} size='large' />
        </>
    )
}

export default DefaultActivityIndicator
