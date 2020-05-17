import {ContentModelInfo, HeadingModelInfo} from "../domParser";
import {getRequestModelName} from "./requestDeclaration";
import {getResponseModelName} from "./responseDeclaration";

const defaultFunctionDeclaration = `
/**
 * @name {{methodName}}
 * @description {{comment}}
 * */
export function {{methodName}}(opts: {{requestModelName}}) {
  return instance<{{responseModelName}}>({
    method: '{{methodType}}',
    url: '{{path}}',
    opts: opts
  });
}
`

export const getFunctionDeclarationTemplate = function () {
    // 后续可以实现通过配置拿到所需要的模版，这里默认实现是返回默认模版
    return defaultFunctionDeclaration
}


export const reorganizeDataIntoTemplate = function (headingInfo: HeadingModelInfo, contentInfo: ContentModelInfo) {
    const template = getFunctionDeclarationTemplate()
    // const { methodType, comment, path, methodName } = headingInfo
    // const { requestModel, responseModel } = contentInfo
    const reg = /{{(methodName|comment|requestModelName|responseModelName|methodType|path)}}/g
    return template.replace(reg, (rawData, key) => {
        if (headingInfo[key]) {
            return headingInfo[key]
        }
        if (contentInfo[key]) {
            return contentInfo[key]
        }
        if (key === 'requestModelName') {
            return getRequestModelName(headingInfo)
        }

        if (key === 'responseModelName') {
            return getResponseModelName(contentInfo)
        }
        return rawData
    })
}
