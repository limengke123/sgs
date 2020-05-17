import {DomParser} from "./domParser";
import {UtilHelp} from "./utilHelp";

function createButton (buttonName) {
    const button = document.createElement('div')
    button.innerText = buttonName
    button.className = 'sgs--button'
    return button
}


setTimeout(() => {
    const operations = document.body.querySelectorAll('.operation')
    operations.forEach(operation => {
        const heading = operation.querySelector('.heading')
        const content = operation.querySelector('.content')
        try {
            const headingInfo = DomParser.parseHeading(heading)
            const contentInfo = DomParser.parseContent(content)
            const button = createButton('复制')
            button.addEventListener('click', () => {
                UtilHelp.copy(JSON.stringify(headingInfo))
            })
            heading.appendChild(button)
        } catch (e) {
            console.log(e)
        }
    })
}, 3000)
