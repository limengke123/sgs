
/**
 * 简易的模版引擎实现
 * */
export class Compiler<D extends Object = {}> {

    private rawString: string
    private rawData: D
    private resultString: string
    private readonly splitReg: RegExp = /({{.*?}})/gm
    private readonly specialReg: RegExp = /{{(.*)}}/g

    constructor(rawString?: string, rawData?: D) {
        this.rawString = rawString
        this.rawData = rawData
    }

    compile() {
        const middleResult = this.rawString.split(this.splitReg)
        // pass 具体的解析方法
        this.resultString = middleResult.map(item => {
            return item.replace(this.specialReg, (_, data) => {
                return this.unitCompile(data)
            })
        }).join('')
        return this.resultString
    }

    unitCompile(content: string) {
        const funcBody = `
            with(this) {
                return ${content}
            }
        `
        const templateFunction = new Function(funcBody)
        return templateFunction.call(this.rawData)
    }

    getRawString() {
        return this.rawString
    }

    setRawString(rawString: string) {
        this.rawString = rawString
    }

    getRawData() {
        return this.rawData
    }

    setRawData(rawData: D) {
        this.rawData = rawData
    }

    getResultString() {
        return this.resultString
    }


}
