import {sg2ts} from 'sg2ts'
import {PathHelper} from "./utilHelp";


export interface RequestModelInfo {
    paramName: string, // 参数名称
    required: boolean, // 是否必传
    description: string, //
    type: string
}

export interface ContentModelInfo {
    requestModel: RequestModelInfo[],
    responseModel: string[]
}

export interface HeadingModelInfo {
    methodType: string, // 方法名称
    path: string, // 路径
    comment: string // 接口注解
    methodName: string // 方法名称
}

export class DomParser {

    static parseHeading(headingDom: HTMLDivElement): HeadingModelInfo {
        const methodType = headingDom.querySelector<HTMLSpanElement>('.http_method').innerText.trim().toLowerCase()
        const path = headingDom.querySelector<HTMLSpanElement>('.path').innerText.trim()
        const methodName = PathHelper.getNameFromPath(path)
        const comment = headingDom.querySelector<HTMLUListElement>('.options').innerText.trim()
        return { methodType, path, comment, methodName }
    }

    static parseContent(contentDom: HTMLDivElement): ContentModelInfo {
        const operationParamsDom = contentDom.querySelector<HTMLTableElement>('.operation-params')
        const operationParamDomList = operationParamsDom
            ? operationParamsDom.querySelectorAll('tr')
            : [] as HTMLTableRowElement[]
        const responseModelDom = contentDom.querySelector<HTMLDivElement>('.description')
        const requestModel = Array.prototype.map.call(
            operationParamDomList,
            operationParamDom => DomParser.parseRequestModel(operationParamDom)
        )
        const responseModel = DomParser.parseResponseModel(responseModelDom)
        return { requestModel, responseModel }
    }

    static parseRequestModel(dom: HTMLTableRowElement): RequestModelInfo {
        const columns = dom.querySelectorAll('td')
        const paramName = columns[0].innerText.trim()
        let required = false
        if (columns[0].classList.contains('required')) {
            required = true
        }
        const description = columns[2].innerText.trim()
        const type = columns[4].innerText.trim()
        return { paramName, required, description, type }
    }

    static parseResponseModel(dom: HTMLDivElement): string[] {
        const childNodes = dom.childNodes || []
        let index = 0
        let result = []
        let fragment = []
        while (index < childNodes.length) {
            const currentNode = childNodes[index]
            index++
            if (currentNode.nodeName === '#text') {
                continue
            }
            if (currentNode.nodeName.toUpperCase() === 'BR') {
                result.push(fragment)
                fragment = []
            } else {
                fragment.push(currentNode.innerText)
            }
        }
        result.push(fragment)
        return result.map(item => sg2ts(item.join('\n')))
    }

}
