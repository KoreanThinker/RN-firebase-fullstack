import React, { useState } from 'react'
import { View, Text } from 'react-native'
import styles, { color1, defaultBackgroundColor } from '../../components/styles'
import ToggleView from '../../components/View/ToggleView'
import useNavigation from '../../hooks/useNavigation'
import { TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler'
import MaterialToggle from '../../components/Button/MaterialToggle'
import { NavigationScreenComponent } from 'react-navigation'

type NavigationParams = {
    nextFunction: Function
}

type policyType = {
    name: string,
    url: string
}

const Polices: policyType[] = [
    {
        name: '이용약관',
        url: 'www.google.com'
    },
    {
        name: '개인정보 처리방침',
        url: 'https://docs.google.com/document/d/e/2PACX-1vQKf6YT_E7cYo8JQDJ2cYQPVihlXVfO9VHAYTdOywr9cgNYtY9oLolxvWer2DHkNov8Btj4sATfupFY/pub'
    }
]

const PolicyScreen = () => {
    const navigation = useNavigation<NavigationParams>()

    const [check, setCheck] = useState(Polices.map(() => false))

    const onSubmit = () => {
        if ((check.indexOf(false) !== -1)) return
        navigation.state.params.nextFunction()
        navigation.goBack()
    }

    const onPolicy = (item: policyType) => {
        navigation.navigate('PolicyDetailScreen', { name: item.name, url: item.url })
    }

    const RenderItem = (item: policyType, index: number) =>
        <View style={{ width: '100%', height: 36, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableWithoutFeedback
                onPress={() => onPolicy(item)}
            >
                <Text style={{ ...styles.defaultFont, textDecorationLine: 'underline' }} >{item.name}</Text>
            </TouchableWithoutFeedback>

            <MaterialToggle
                value={check[index]}
                onPress={() => setCheck(check.map((item, index2) => index2 !== index ? item : !item))}
            />
        </View>

    return (
        <View style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
            <FlatList
                style={{ paddingTop: 40 }}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                data={Polices}
                keyExtractor={(item, index) => 'policy' + index.toString()}
                renderItem={({ item, index }) => RenderItem(item, index)}
                ListFooterComponent={
                    <View style={{ width: '100%', height: 36, paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 40 }}>
                        <TouchableWithoutFeedback
                            onPress={() => setCheck(check.map(() => true))}
                        >
                            <Text style={{ ...styles.defaultFont }} >모두동의</Text>
                        </TouchableWithoutFeedback>

                        <MaterialToggle
                            value={!(check.indexOf(false) !== -1)}
                            onPress={() => setCheck(check.map(() => true))}
                        />
                    </View>
                }
            />
            <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0 }}>
                <ToggleView
                    isOn={!(check.indexOf(false) !== -1)}
                    onPress={onSubmit}
                >
                    <Text style={{ ...styles.defaultFont, color: !(check.indexOf(false) !== -1) ? '#fff' : '#000' }} >다음</Text>
                </ToggleView>
            </View>
        </View>
    )
}

PolicyScreen.navigationOptions = ({ navigation }) => ({
    title: '약관',
})

export default PolicyScreen
