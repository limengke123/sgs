import {Toast, toastType} from "./toast";


export const toast = {
    success: (text: string, duration?: number) => Toast.show(text, toastType.success, duration),
    error: (text: string, duration?: number) => Toast.show(text, toastType.error, duration),
    info: (text: string, duration?: number) => Toast.show(text, toastType.normal, duration)
}
