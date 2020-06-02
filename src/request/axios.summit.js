import axios from './axios'

//抗击疫情
//疫情相关企业查询--返回所有产地
export const findAllMadeIn = data => {
    return axios({
      method:'get',
      url:window.config.apiSearch+"/findAllMadeIn",
    })
}
//疫情相关企业查询--返回所有产品类别
export const findAllProCategory = data => {
    return axios({
      method:'get',
      url:window.config.apiSearch+"/findAllProCategory",
    })
}
//疫情相关企业查询--返回所有省份
export const findAllProvince = data => {
    return axios({
      method:'get',
      url:window.config.apiSearch+"/findAllProvince",
    })
}
//疫情相关企业查询--分页查询企业数据
export const findByCondition = data => {
    return axios({
      method:'get',
      url:window.config.apiSearch+"/findByCondition",
      params:data
    })
}


// 获取信用咨询最新条目
export const requestGetInformationNew = () => {
    return axios({
        method:'get',
        url:'/column/selectNewColumn'
    })
}

// 獲取類目下列表
export const getColumnList = data => {
    return axios({
      method:'post',
      url:"/column/getUrl?isLoading=1&stamp="+new Date().getTime(),
      data
    })
}

// 峰会新闻
export const selectMomentsNews = async data => {
    const url = await axios({
        method:'get',
        url:'/column/selectMomentsNews',
        params:data
    }).then(res=>{
        return res.data
    }).catch(()=>{
        return ''
    })

    return getColumnList({
        url:url
    })
}

// 峰会图片轮播
export const selectMoments = async data => {
    const url = await axios({
        method:'get',
        url:'/column/selectMoments',
        params:data
    }).then(res=>{
        return res.data
    }).catch(()=>{
        return ''
    })

    return getColumnList({
        url:url
    })
}