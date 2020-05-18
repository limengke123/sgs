
export const enum toastType {
    success = 'success',
    error = 'error',
    normal = 'normal'
}

const containerDiv = document.createElement('div')
containerDiv.className = 'sgs--toast_container'

export class Toast {
    static getInstance: (text: string, duration?: number, type?: toastType) => Toast
    static show: (text: string, type?: toastType, duration?: number) => void

    static defaultText = ''
    static defaultType = toastType.normal
    static defaultDuration = 2000
    static container: HTMLDivElement = containerDiv

    private text: string = Toast.defaultText
    private type: toastType = Toast.defaultType
    private duration: number = Toast.defaultDuration
    private domContent: HTMLDivElement = null
    private isDestroy: boolean = false

    constructor(text: string, duration?: number, type?: toastType) {
        this.setText(text)
        this.setType(type)
        this.setDuration(duration)
        this.isDestroy = false
        this.build()
    }


    private build() {
        const div = document.createElement('div')
        div.className = `sgs--toast_item sgs--toast_item-${this.type}`
        const icon = document.createElement('div')
        icon.className = 'sgs--toast_icon'
        const text = document.createTextNode(this.text)
        div.appendChild(icon)
        div.appendChild(text)
        this.domContent = div
    }


    show(): this {
        Toast.container.append(this.domContent)
        setTimeout(this.remove.bind(this), this.duration)
        return this
    }

    remove() {
        this.domContent.style.opacity = '0'
        setTimeout(() => {
            if (this.domContent) {
                this.domContent.parentNode.removeChild(this.domContent)
                this.isDestroy = true
            }
        }, 500)
    }

    setText(text: string): this {
        this.text = text || Toast.defaultText
        return this
    }

    setType(type: toastType): this {
        this.type = type || Toast.defaultType
        return this
    }

    setDuration(duration: number): this {
        this.duration = duration || Toast.defaultDuration
        return this
    }

    getIsDestroy() {
        return this.isDestroy
    }

}


let instance: Toast = null

Toast.getInstance = function (text, duration, type) {
    // 单例模式
    if (!instance) {
        return new Toast(text, duration, type)
    } else {
        return instance
            .setText(text)
            .setDuration(duration)
            .setType(type)
    }
}


let toastList: Toast[] = []
Toast.show = function (text, type, duration) {
    // 队列模式
    const instance = new Toast(text, duration, type)
    instance.show()
    return instance
    // const instance = new Toast(text, duration, type)
    // toastList.push(instance.show())
    // toastList.filter(instance => !!instance.getIsDestroy())
}


document.body.append(Toast.container)
