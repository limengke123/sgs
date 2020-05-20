import {ContentModelInfo, HeadingModelInfo} from "../util/domParser";
import {Compiler} from "../compiler";
import {UtilHelp} from "../util/utilHelp";

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
const getStorage = UtilHelp.promisify<{[key: string]: any}>(chrome.storage.sync.get)

export const getFunctionDeclarationTemplate = async function () {
    // 后续可以实现通过配置拿到所需要的模版，这里默认实现是返回默认模版
    const data =  await getStorage({methodTemplate: defaultFunctionDeclaration})
    return data.methodTemplate
}


export const reorganizeDataIntoTemplate = function (headingInfo: HeadingModelInfo, contentInfo: ContentModelInfo, template: string) {
    const compiler = new Compiler(template, {...headingInfo, ...contentInfo})
    return compiler.compile()
}
