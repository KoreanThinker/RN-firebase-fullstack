import { ToastAndroid } from "react-native";


export function sendToast(message: string): void {
    ToastAndroid.show(message, ToastAndroid.SHORT)
}