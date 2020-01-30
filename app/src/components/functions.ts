import { ToastAndroid } from "react-native";


export function sendToast(message: string): void {
    ToastAndroid.show(message, ToastAndroid.SHORT)
}

export function isEmail(email: string): boolean {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email);
}