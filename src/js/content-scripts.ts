import {DomMessage, TemplateIdEnum} from "../util/utilHelp";
import {defaultFunctionDeclarationTemplate} from "../template/defaultTemplate";

function injectCustomJs(jsPath?: string) {
    jsPath = jsPath || 'js/inject.js';
    const temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(temp);
}

injectCustomJs()


function initStorageData() {
    chrome.storage.sync.get((data) => {
        let result = defaultFunctionDeclarationTemplate
        if (!data.methodTemplate) {
            chrome.storage.sync.set({
                methodTemplate: result
            })
        } else {
            result = data.methodTemplate
        }
        DomMessage.set(TemplateIdEnum.MethodType, result)
    })
}

initStorageData()
