import {ContentModelInfo, HeadingModelInfo} from "../util/domParser";
import {Compiler} from "../compiler";


export const reorganizeDataIntoTemplate = function (headingInfo: HeadingModelInfo, contentInfo: ContentModelInfo, template: string) {
    const compiler = new Compiler(template, {...headingInfo, ...contentInfo})
    return compiler.compile()
}
