import {
    defaultFunctionDeclarationTemplate,
    defaultRequestDeclarationTemplate,
    defaultResponseDeclarationTemplate
} from "../template/defaultTemplate";

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({
        methodTemplate: defaultFunctionDeclarationTemplate,
        requestTemplate: defaultRequestDeclarationTemplate,
        responseTemplate: defaultResponseDeclarationTemplate
    }, (data) => {
        document.querySelector<HTMLTextAreaElement>('#method').value = data.methodTemplate
        document.querySelector<HTMLTextAreaElement>('#request').value = data.requestTemplate
        document.querySelector<HTMLTextAreaElement>('#response').value = data.responseTemplate
    })
});

document.getElementById('save').addEventListener('click', function() {
    const methodTemplate = document.querySelector<HTMLTextAreaElement>('#method').value;
    const requestTemplate = document.querySelector<HTMLTextAreaElement>('#request').value;
    const responseTemplate = document.querySelector<HTMLTextAreaElement>('#response').value;
    chrome.storage.sync.set({
        methodTemplate: methodTemplate,
        requestTemplate: requestTemplate,
        responseTemplate: responseTemplate
    }, () => {
        document.getElementById('status').textContent = '保存成功！'
        setTimeout(() => {document.getElementById('status').textContent = '';}, 800)
    })
});
