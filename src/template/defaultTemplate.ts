export const defaultFunctionDeclarationTemplate = `
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


export const defaultResponseDeclarationTemplate = `
{{responseModel.map(item => item.value).join('\\n\\n')}}
`


export const defaultRequestDeclarationTemplate = `
export interface {
  {{requestModel.map(item => item.baseRequestTemplate).join('\\n  ')}}
}
`
