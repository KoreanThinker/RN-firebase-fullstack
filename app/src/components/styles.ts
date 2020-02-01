import { Dimensions, StyleSheet } from 'react-native'

export const WIDTH = Dimensions.get('window').width

export const defaultMargin = 16

export const color1 = '#673AB7'
export const defaultBackgroundColor = '#eee'

const styles = StyleSheet.create({
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultFont: {
        fontSize: 14
    },
    defaultLink: {
        color: '#2980b9', textDecorationLine: 'underline'
    }
})

export default styles
