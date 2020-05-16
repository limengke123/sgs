function createButton (buttonName) {
    const button = document.createElement('div')
    button.innerText = buttonName
    button.className = 'sgs--button'
    return button
}


/**
 *
 * @param headingDom
 * @summary 解析头信息，返回三元组，路径、类型、注解
 * @return {Array}
 */
function parseHeading(headingDom) {
    const methodType = headingDom.querySelector('.http_method').innerText.trim()
    const path = headingDom.querySelector('.path').innerText.trim()
    const comment = headingDom.querySelector('.options').innerText.trim()
    return [methodType, path, comment]
}


/**
 *
 * @param contentDom
 * @return {Array}
 */
function parseContent(contentDom) {
    const operationParamsDom = contentDom.querySelector('.operation-params')
    const operationParamDomList = operationParamsDom
            ? operationParamsDom.querySelectorAll('tr')
            : []
    const responseModelDom = contentDom.querySelector('.description')
    const requestModel = Array.prototype.map.call(
        operationParamDomList,
        operationParamDom => parseRequestModel(operationParamDom)
    )
    const responseModel = parseResponseModel(responseModelDom)
    return [requestModel, responseModel]
}

/***
 * @summary 获取请求的参数信息
 */
function parseRequestModel(dom) {
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


/**
 * @summary 获取返回值的参数信息
 * */
function parseResponseModel(dom) {
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


function copy (text) {
    const textArea = document.createElement('textarea')

    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = '0'
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'
    textArea.value = text

    document.body.appendChild(textArea)

    textArea.select()

    let msg = ''
    let error = null
    try {
        msg = document.execCommand('copy') ? '成功' : '失败'
    } catch (err) {
        error = err
    } finally {
        document.body.removeChild(textArea)
    }

    return {
        error,
        msg
    }
}

(function () {
    setTimeout(() => {
        const operations = document.body.querySelectorAll('.operation')
        operations.forEach(operation => {
            const heading = operation.querySelector('.heading')
            const content = operation.querySelector('.content')
            try {
                const headingInfo = parseHeading(heading)
                const contentInfo = parseContent(content)
                const button = createButton('复制')
                button.addEventListener('click', () => {
                    copy(JSON.stringify(headingInfo))
                })
                heading.appendChild(button)
            } catch (e) {
                console.log(e)
            }
        })
    }, 3000)
})()
