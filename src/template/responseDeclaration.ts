import {ContentModelInfo} from "../domParser";

export const getResponseModelName = function (contentInfo: ContentModelInfo) {
    const { responseModel } = contentInfo
    if (responseModel[0]) {
        return responseModel[0].name
    }
    return ''
}

export const reorganizeResponseModel = function (contentInfo: ContentModelInfo) {
    return contentInfo.responseModel.map(item => item.value).join('\n\n')
}
