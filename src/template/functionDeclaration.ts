import {ContentModelInfo, HeadingModelInfo} from "../util/domParser";
import {Compiler} from "../compiler";

const defaultFunctionDeclaration = `
/**
 * @name {{methodName}}
 * @description {{comment}}
 * */
export function {{methodName}}(opts: {{methodName ? methodName + 'Request' : 'request'}}) {
  return instance<{{ responseModel[0] ? responseModel[0].name.replace(/Result\<(.*)\>/g, (_, b) => b) : 'any'}}>({
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
    const compiler = new Compiler(template, {...headingInfo, ...contentInfo})
    return compiler.compile()
}
