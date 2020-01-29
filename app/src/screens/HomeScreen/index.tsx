import React, { useEffect, useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import functions from '@react-native-firebase/functions';
import useTodo from '../../hooks/useTodo'
import useNavigation from '../../hooks/useNavigation';

const HomeScreen = () => {
    const navigation = useNavigation()
    const { onChange, number } = useTodo()
    const [val, setVal] = useState('')

    const get = async () => {
        console.log('load');
        const instance = functions().httpsCallable('getHello')
        try {
            const response = await instance()
            setVal(response.data)
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    useEffect(() => {
        console.log('hi')
        functions().useFunctionsEmulator('http://localhost:5000');
        get()
    }, [])

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
            <Text >{val}</Text>

            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('SignStack')}
            >
                <Text >-1</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default HomeScreen
