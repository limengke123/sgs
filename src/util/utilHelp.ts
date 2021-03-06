export const enum CopyResultFlag {
    success = 1,
    fail = 0
}

export interface CopyResult {
    error: any,
    msg: CopyResultFlag
}


export class UtilHelp {
    static copy(text: string): CopyResult {
        const textArea = document.createElement('textarea')

        textArea.style.position = 'fixed'
        textArea.style.top = '0'
        textArea.style.left = '0'
        textArea.style.width = '2em'
        textArea.style.height = '2em'
        textArea.style.padding = '0'
        textArea.style.border = 'none'
        textArea.style.outline = 'none'
        textArea.style.boxShadow = 'none'
        textArea.style.background = 'transparent'
        textArea.value = text

        document.body.appendChild(textArea)

        textArea.select()

        let msg = CopyResultFlag.fail
        let error = null
        try {
            msg = document.execCommand('copy') ? CopyResultFlag.success : CopyResultFlag.fail
        } catch (err) {
            error = err
        } finally {
            document.body.removeChild(textArea)
        }

        return {
            error,
            msg
        }
    }
}

export class PathHelper {

    static getNameFromPath(path: string): string {
        const pathArr = PathHelper.splitPath(path)
        let name = pathArr[pathArr.length - 1] || ''
        return PathHelper.removeSuffix(name)
    }

    static splitPath(path: string): string[] {
        return path.split('/')
    }

    static removeSuffix(originName: string): string {
        const [name, _] = originName.split('.')
        return name
    }
}


export const enum TemplateIdEnum {
    MethodType = 'methodType',
    RequestType = 'requestType',
    ResponseType = 'responseType'
}

export class DomMessage {


    static set(id: TemplateIdEnum, value: string) {
        let div: HTMLElement = document.getElementById(id)
        if (!div) {
            div = document.createElement('div')
            div.dataset.content = value
            div.id = id
            document.body.append(div)
        }
        div.dataset.content = value
    }


    static get(id: TemplateIdEnum): string {
        const div = document.getElementById(id)
        let result = ''
        if (div) {
            result = div.dataset.content || ''
            div.parentNode.removeChild(div)
        }
        return result
    }
}
