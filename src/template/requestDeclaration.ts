import {ContentModelInfo, HeadingModelInfo} from "../util/domParser";
import {Compiler} from "../compiler";
import {defaultRequestDeclarationTemplate} from "./defaultTemplate";


export const getRequestModelName = function (headingInfo: HeadingModelInfo, requestModelName?: string) {
    const { methodName } = headingInfo
    requestModelName = requestModelName
        ? requestModelName
        : methodName + 'Request'
    return requestModelName
}


export const reorganizeRequestModel = function (headingInfo: HeadingModelInfo, contentInfo: ContentModelInfo) {
    const compiler = new Compiler(defaultRequestDeclarationTemplate, {...headingInfo, ...contentInfo})
    return compiler.compile()
}

