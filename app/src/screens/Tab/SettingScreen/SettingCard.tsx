import React from 'react'
import { View, Text, ListRenderItem } from 'react-native'
import { settingType } from '.'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styles, { defaultMargin } from '../../../components/styles'


const SettingCard: ListRenderItem<settingType> = ({ item, index }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => item.onPress()}
        >
            <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: defaultMargin, backgroundColor: 'white' }}>
                <View style={{ width: 50, height: '100%', ...styles.alignCenter }}>
                    {item.icon}
                </View>
                <Text style={{ ...styles.defaultFont, marginLeft: 8 }} >{item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SettingCard
