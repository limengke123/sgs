import {ContentModelInfo, HeadingModelInfo} from "../util/domParser";
import {Compiler} from "../compiler";
import {defaultFunctionDeclarationTemplate} from "./defaultTemplate";

export const getFunctionDeclarationTemplate = function () {
    // 后续可以实现通过配置拿到所需要的模版，这里默认实现是返回默认模版
    // const data =  await getStorage({methodTemplate: defaultFunctionDeclaration})
    // return data.methodTemplate
    if (window.__METHOD_TEMPLATE__) {
        return window.__METHOD_TEMPLATE__
    }
    return defaultFunctionDeclarationTemplate
}


export const reorganizeDataIntoTemplate = function (headingInfo: HeadingModelInfo, contentInfo: ContentModelInfo, template: string) {
    const compiler = new Compiler(template, {...headingInfo, ...contentInfo})
    return compiler.compile()
}
