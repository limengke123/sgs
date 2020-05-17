import {DomParser} from "./domParser";
import {buttonTypeEnum, ElementHelper} from "./elementHelper";
import {reorganizeDataIntoTemplate} from "./template/functionDeclaration";
import {reorganizeRequestModel} from "./template/requestDeclaration";
import {reorganizeResponseModel} from "./template/responseDeclaration";
import {UtilHelp} from "./utilHelp";


setTimeout(() => {
    const operations = document.body.querySelectorAll<HTMLLIElement>('.operation')
    operations.forEach(operation => {
        const heading = operation.querySelector<HTMLDivElement>('.heading')
        const content = operation.querySelector<HTMLDivElement>('.content')
        try {
            const headingInfo = DomParser.parseHeading(heading)
            const contentInfo = DomParser.parseContent(content)
            const functionDeclaration = reorganizeDataIntoTemplate(headingInfo, contentInfo)
            const requestDeclaration = reorganizeRequestModel(headingInfo, contentInfo)
            const responseDeclaration = reorganizeResponseModel(contentInfo)
            const button = ElementHelper.createButton('复制')
            button.addEventListener('click', () => {
                console.log(functionDeclaration)
                UtilHelp.copy(functionDeclaration)
            })
            const button2 = ElementHelper.createButton('复制入参', buttonTypeEnum.primary)
            button2.addEventListener('click', () => {
                console.log(requestDeclaration)
                UtilHelp.copy(requestDeclaration)
            })

            const button3 = ElementHelper.createButton('复制返参')
            button3.addEventListener('click', () => {
                console.log(responseDeclaration)
                UtilHelp.copy(responseDeclaration)
            })
            heading.appendChild(button)
            heading.appendChild(button2)
            heading.appendChild(button3)
        } catch (e) {
            console.log(e)
        }
    })
}, 3000)
