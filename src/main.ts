import {DomParser} from "./util/domParser";
import {buttonTypeEnum, ElementHelper} from "./util/elementHelper";
import {DomMessage, TemplateIdEnum, UtilHelp} from "./util/utilHelp";
import {toast} from "./components/toast";
import {reorganizeDataIntoTemplate} from "./template";
import {
    defaultFunctionDeclarationTemplate,
    defaultRequestDeclarationTemplate,
    defaultResponseDeclarationTemplate
} from "./template/defaultTemplate";

setTimeout(() => {
    const operations = document.body.querySelectorAll<HTMLLIElement>('.operation')
    const methodTemplate = DomMessage.get(TemplateIdEnum.MethodType) || defaultFunctionDeclarationTemplate
    const requestTemplate = DomMessage.get(TemplateIdEnum.RequestType) || defaultRequestDeclarationTemplate
    const responseTemplate = DomMessage.get(TemplateIdEnum.ResponseType) || defaultResponseDeclarationTemplate
    operations.forEach(operation => {
        const heading = operation.querySelector<HTMLDivElement>('.heading')
        const content = operation.querySelector<HTMLDivElement>('.content')
        try {
            const headingInfo = DomParser.parseHeading(heading)
            const contentInfo = DomParser.parseContent(content)
            const functionDeclaration = reorganizeDataIntoTemplate(headingInfo, contentInfo, methodTemplate)
            const requestDeclaration = reorganizeDataIntoTemplate(headingInfo, contentInfo, requestTemplate)
            const responseDeclaration = reorganizeDataIntoTemplate(headingInfo, contentInfo, responseTemplate)
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
}, 3000)
