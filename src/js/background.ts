import {UtilHelp} from "../util/utilHelp";
import sg2ts from "sg2ts";
import {splitTypeEnum} from "sg2ts/lib/resolver";

chrome.contextMenus.create({
    title: '复制选中的转换类型',
    contexts: ['selection'],
    onclick: function (params) {
        console.log(123444)
        UtilHelp.copy(sg2ts(params.selectionText, {
            splitType: splitTypeEnum.comma
        }))
    }
})
