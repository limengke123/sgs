export class DomParser {

    /**
     * @summary 解析头信息，返回三元组，路径、类型、注解
     */
    static parseHeading(headingDom) {
        const methodType = headingDom.querySelector('.http_method').innerText.trim()
        const path = headingDom.querySelector('.path').innerText.trim()
        const comment = headingDom.querySelector('.options').innerText.trim()
        return [methodType, path, comment]
    }



    /**
     *
     */
    static parseContent(contentDom) {
        const operationParamsDom = contentDom.querySelector('.operation-params')
        const operationParamDomList = operationParamsDom
            ? operationParamsDom.querySelectorAll('tr')
            : []
        const responseModelDom = contentDom.querySelector('.description')
        const requestModel = Array.prototype.map.call(
            operationParamDomList,
            operationParamDom => DomParser.parseRequestModel(operationParamDom)
        )
        const responseModel = DomParser.parseResponseModel(responseModelDom)
        return [requestModel, responseModel]
    }



    static parseRequestModel(dom) {
        const columns = dom.querySelectorAll('td')
        const paramName = columns[0].innerText.trim()
        let required = false
        if (columns[0].classList.contains('required')) {
            required = true
        }
        const description = columns[2].innerText.trim()
        const type = columns[4].innerText.trim()

        return [paramName, required, description, type]
    }



    static parseResponseModel(dom) {
        const childNodes = dom.childNodes || []
        let index = 0
        let result = []
        let fragment = []
        while (index < childNodes.length) {
            const currentNode = childNodes[index]
            index++
            if (currentNode.nodeName === '#text') {
                continue
            }
            if (currentNode.nodeName.toUpperCase() === 'BR') {
                result.push(fragment)
                fragment = []
            } else {
                fragment.push(currentNode.innerText)
            }
        }
        result.push(fragment)
        return result.map(item => item.join('\n'))
    }

}
