import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { defaultBackgroundColor } from '../../../components/styles'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import openSourceList from './openSourceList'
import Card from './Card'

const OpenSourceScreen: NavigationStackScreenComponent = () => {


    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <FlatList
                data={openSourceList}
                style={{ flex: 1 }}
                keyExtractor={(item, index) => `openSource${index.toString()}`}
                renderItem={({ item }) => <Card {...item} />}
            />
        </View>
    )
}

OpenSourceScreen.navigationOptions = {
    title: '오픈소스 라이센스'
}

export default OpenSourceScreen
