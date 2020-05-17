export const enum buttonTypeEnum {
    primary = 'primary',
    default = 'default',
    normal = 'normal'
}

export class ElementHelper {
    static createButton (buttonName: string, type: buttonTypeEnum = buttonTypeEnum.default ): HTMLDivElement {
        const button = document.createElement('div')
        button.innerText = buttonName
        let className = 'sgs--button'
        switch (type) {
            case buttonTypeEnum.primary:
                className += ' sgs--button_primary'
                break
            case buttonTypeEnum.default:
                className += ' sgs--button_default'
                break
            case buttonTypeEnum.normal:
                className += ' sgs--button_normal'
                break
        }
        button.className = className
        return button
    }
}
