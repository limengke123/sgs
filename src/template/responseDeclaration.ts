import {ContentModelInfo, HeadingModelInfo} from "../util/domParser";
import {Compiler} from "../compiler";
import {defaultResponseDeclarationTemplate} from "./defaultTemplate";

export const reorganizeResponseModel = function (headingInfo: HeadingModelInfo, contentInfo: ContentModelInfo) {
    const compiler = new Compiler(defaultResponseDeclarationTemplate, {...headingInfo, ...contentInfo})
    return compiler.compile()
}
