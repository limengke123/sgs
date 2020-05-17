import {DomParser} from "./domParser";
import {UtilHelp} from "./utilHelp";
import {ElementHelper} from "./elementHelper";
import {reorganizeDataIntoTemplate} from "./template/functionDeclaration";


setTimeout(() => {
    const operations = document.body.querySelectorAll<HTMLLIElement>('.operation')
    operations.forEach(operation => {
        const heading = operation.querySelector<HTMLDivElement>('.heading')
        const content = operation.querySelector<HTMLDivElement>('.content')
        try {
            const headingInfo = DomParser.parseHeading(heading)
            const contentInfo = DomParser.parseContent(content)
            const functionDeclaration = reorganizeDataIntoTemplate(headingInfo, contentInfo)
            const button = ElementHelper.createButton('复制')
            button.addEventListener('click', () => {
                UtilHelp.copy(JSON.stringify(headingInfo))
                console.log(functionDeclaration)
                // console.log(contentInfo)
            })
            heading.appendChild(button)
        } catch (e) {
            console.log(e)
        }
    })
}, 3000)
