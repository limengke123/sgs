import {ContentModelInfo} from "../domParser";

export const reorganizeResponseModel = function (contentInfo: ContentModelInfo) {
    return contentInfo.responseModel.map(item => item.value).join('\n\n')
}
