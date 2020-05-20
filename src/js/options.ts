import {defaultFunctionDeclarationTemplate} from "../template/defaultTemplate";

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({methodTemplate: defaultFunctionDeclarationTemplate}, (data) => {
        document.querySelector<HTMLTextAreaElement>('#method').value = data.methodTemplate
    })
});

document.getElementById('save').addEventListener('click', function() {
    const methodTemplate = document.querySelector<HTMLTextAreaElement>('#method').value;
    chrome.storage.sync.set({
        methodTemplate: methodTemplate
    }, () => {
        document.getElementById('status').textContent = '保存成功！'
        setTimeout(() => {document.getElementById('status').textContent = '';}, 800)
    })
});
