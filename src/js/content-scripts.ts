function injectCustomJs(jsPath?: string) {
    jsPath = jsPath || 'js/inject.js';
    const temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(temp);
    console.log(555)
}

injectCustomJs()
