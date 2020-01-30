import React from 'react'
import { View, Text, ModalProps, Modal, ActivityIndicator } from 'react-native'
import styles, { color1 } from '../styles'

const LoadingModal: React.FC<ModalProps> = (props) => {
    return (
        <Modal
            {...props}
            transparent={true}
            animationType='fade'
            animated={true}
        >
            <View
                style={{ flex: 1, ...styles.alignCenter, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            >
                <ActivityIndicator color={color1} size='large' />
            </View>
        </Modal>

    )
}

export default LoadingModal
