import {DomParser} from "./util/domParser";
import {buttonTypeEnum, ElementHelper} from "./util/elementHelper";
import {getFunctionDeclarationTemplate, reorganizeDataIntoTemplate} from "./template/functionDeclaration";
import {reorganizeRequestModel} from "./template/requestDeclaration";
import {reorganizeResponseModel} from "./template/responseDeclaration";
import {UtilHelp} from "./util/utilHelp";
import {toast} from "./components/toast";

// todo: 这里和content_script 通信一直有问题，导致无法使用模版
declare global {
    interface Window {
        __METHOD_TEMPLATE__: string
    }
}

window.addEventListener('message', (e) => {
    if (e.data.methodTemplate) {
        window.__METHOD_TEMPLATE__ = e.data.methodTemplate
    }
}, false)

window.postMessage('1', '*')


setTimeout(() => {
    (async function () {
        const operations = document.body.querySelectorAll<HTMLLIElement>('.operation')
        const methodTemplate = await getFunctionDeclarationTemplate()
        operations.forEach(operation => {
            const heading = operation.querySelector<HTMLDivElement>('.heading')
            const content = operation.querySelector<HTMLDivElement>('.content')
            try {
                const headingInfo = DomParser.parseHeading(heading)
                const contentInfo = DomParser.parseContent(content)
                const functionDeclaration = reorganizeDataIntoTemplate(headingInfo, contentInfo, methodTemplate)
                const requestDeclaration = reorganizeRequestModel(headingInfo, contentInfo)
                const responseDeclaration = reorganizeResponseModel(contentInfo)
                const button = ElementHelper.createButton('复制函数')
                button.addEventListener('click', () => {
                    console.log(functionDeclaration)
                    UtilHelp.copy(functionDeclaration)
                    toast.success('复制函数成功!')
                })
                const button2 = ElementHelper.createButton('复制入参', buttonTypeEnum.primary)
                button2.addEventListener('click', () => {
                    console.log(requestDeclaration)
                    UtilHelp.copy(requestDeclaration)
                    toast.success('复制入参成功!')
                })

                const button3 = ElementHelper.createButton('复制返参', buttonTypeEnum.normal)
                button3.addEventListener('click', () => {
                    console.log(responseDeclaration)
                    UtilHelp.copy(responseDeclaration)
                    toast.success('复制返参成功！')
                })
                heading.appendChild(button)
                heading.appendChild(button2)
                heading.appendChild(button3)
            } catch (e) {
                console.log(e)
            }
        })
    })()
}, 3000)
