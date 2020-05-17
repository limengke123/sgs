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
