export default class ApiBase {
    constructor(http){
        this._http = http
    }

    get http(){return this._http}
    set http(val) {this._http = val}

    getRes(res){
        if(!res)
            throw new Error("network error")
        if(!res.result)
            throw new Error(res.msg)
        return res.data
    }

    getFileServiceUrl(url){
        const fileServer = window.config.apiFile
        if(url.startsWith(fileServer))
            return url
        return `${fileServer}${url}`
    }
    
    getFormData(obj){
        const fd = new FormData()
        for(let key in obj){
            fd.append(key,obj[key])
        }
        return fd
    }
}