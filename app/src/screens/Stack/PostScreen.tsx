import React from 'react'
import { View, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'

const PostScreen = () => {
    return (
        <View style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }} />
            <TextInput style={{ width: '100%', position: 'absolute', bottom: 0, height: 50, right: 0, left: 0, backgroundColor: 'yellow' }} />
        </View>
    )
}

PostScreen.navigationOptions = {
    title: '게시물 작성'
}

export default PostScreen
