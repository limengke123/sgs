import {ContentModelInfo, HeadingModelInfo, RequestModelInfo} from "../util/domParser";


export const getRequestModelName = function (headingInfo: HeadingModelInfo, requestModelName?: string) {
    const { methodName } = headingInfo
    requestModelName = requestModelName
        ? requestModelName
        : methodName + 'Request'
    return requestModelName
}


export const reorganizeRequestModel = function (headingInfo: HeadingModelInfo, contentInfo: ContentModelInfo) {
    const { requestModel } = contentInfo
    const requestModelName = getRequestModelName(headingInfo)
    const start = `export interface ${requestModelName} {\n`
    const end = '\n}'
    const body = requestModel.map(item => generateSingleData(item)).join('\n')

    return start + body + end
}


const generateSingleData = function (requestModel: RequestModelInfo): string {
    const { paramName, description, required, type } = requestModel
    let result = `  ${paramName}`
    if (!required) {
        result += '?'
    }
    result += `: ${type}`
    if (description) {
        result += ` //${description}`
    }
    return result
}


