document.addEventListener('DOMContentLoaded', function() {
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
    chrome.storage.sync.get({methodTemplate: defaultFunctionDeclaration}, (data) => {
        document.querySelector<HTMLTextAreaElement>('method').value = data.methodTemplate
    })
});

document.getElementById('save').addEventListener('click', function() {
    const methodTemplate = document.querySelector<HTMLTextAreaElement>('method').value;
    chrome.storage.sync.set({
        methodTemplate: methodTemplate
    }, () => {
        console.log(12312)
        document.getElementById('status').textContent = '保存成功！'
        setTimeout(() => {document.getElementById('status').textContent = '';}, 800)
    })
});
