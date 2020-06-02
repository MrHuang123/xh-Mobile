import {http} from './axios'
import ApiBase from './apiBase'

export class SearchApi extends ApiBase {
    constructor(http){
        super(http);
    }

    // type 类型,可用值:全部,国内热词,国际热词
    async queryHotWordsAsync(type='国内热词'){
        const url = `/searchHint/findHotWordsByType`;
        const method = 'post';
        const data = {
            type
        };
        const opt = {url,method,data};
        const res = await this.http(opt);
        return this.getRes(res);
    }
    //  type 类型,可用值:国内热词,国际热词
    async querySearchHistoryListAsync(userId='',type='',hotword=''){
        const url = `/searchHint/getSearchHint`;
        const method = 'post';
        const data = {
            userId,
            type,
            hotword
        };
        const opt = {url,method,data};
        const res = await this.http(opt);
        return this.getRes(res);
    }

    async updateSearchHistoryAsync(keyword,userId=''){
        const url = `/searchHint/updateHistory`;
        const method = 'post';
        const data = {
            keyword,
            userId
        };
        const opt = {url,method,data};
        const res = await this.http(opt);
        return this.getRes(res);
    }
}


export const searchApi = new SearchApi(http);