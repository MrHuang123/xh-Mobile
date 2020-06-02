import axios from './axios'
/********************************** 公共模块 *******************************************/

// const api30688 = 'http://192.168.1.103:8488'


/**
   * 上传文件到本地服务器
   * @param {
   *  appId 平台标识xinhua
   *  userId 上传者用户ID
   *  fileName 文件名带后缀
   *  file  文件流
   * }
   */
export const localUpload = params => {

  return axios({
    url:  '/file/localUpload?isLoading=1',
    data: params,
    transformRequest: [data => data]
  })

}

export const getDownUrl = params => {

  return axios({
    method:'get',
    url: '/file/getDownurl',
    params,
    // transformRequest: [data => data]
  })

}


// 獲取全局消息配置
export const getCodeConfig = params => {
  return axios({
    url:'/commonApi/getCodeMsg',
    params,
    method:'get',
  })
} 

// 获取所有省份
export const requestProvinces = () => {
  if(!!localStorage.provinces) return Promise.reject();
  return axios({
    url:'/bank/provinces',
    method:'get',
  })
}

// 获取所有城市
export const requestCitys = () => {
  if(!!localStorage.citys) return Promise.reject();
  return axios({
    url:'/bank/city',
    method:'get',
  })
}

// 获取所有银行
export const requestBanks = () => {
  if(!!localStorage.banks) return Promise.reject();
  return axios({
    url:'/bank/bank',
    method:'get'
  })
}

// 获取微信签名
export const getWxSign = (data) => {
  return axios({
    method: 'get',
    url: '/xhsRest/weiJsSdk/signature',
    // data,
    params: data
  })
}

//行业列表接口
//getIndustry
export const getIndustryList = data => {
  return axios({
    url:'/industry/getIndustry.dao',
    params:data,
    method:'get',
  })
}