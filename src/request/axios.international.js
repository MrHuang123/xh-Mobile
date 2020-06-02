import axios from './axios'

//保存详情信息
export const saveInternationalDeatil = data => {
  return axios({
      method:'post',
      url:'/search/saveDeatil',
      data,
  })
}
//获取详情信息
export const getInternationalDeatil = data => {
  return axios({
      method:'post',
      url:'/search/getDeatil',
      data,
  })
}
//根据公司ID查询企业详情(自定义企业)
export const getAuthenticData = data => {
  return axios({
    method:'get',
    url:'/tAuthentic/getAuthentic?isLoading=1',
    params:data
  })
}

//判断企业什么来源(国内还是国外0 是国内)
export const getTauthenticState = data => {
  return axios({
    url:'/ucenter/getTauthenticState',
    params:data,
    method:'get',
  })
}



// 国家(需要loading)
export const getCountryList = data => {
  return axios({
    url:'/regioncode/getCountries?isLoading=1',
    params:data,
    method:'get',
  })
}
// 国家(不需要loading)
export const getCountryList_2 = data => {
  return axios({
    url:'/regioncode/getCountries',
    params:data,
    method:'get',
  })
}

//城市
export const getRegions = (country,data) => {
  return axios({
      method:'get',
      url:`/regioncode/getRegions/${country}?isLoading=1`,
      params:data,
  })
}
//城市(不需要loading)
export const getRegions_2 = (country,data) => {
  return axios({
      method:'get',
      url:`/regioncode/getRegions/${country}`,
      params:data,
  })
}

//企业信用查询列表
export const getSearch = data => {
  return axios({
      method:'post',
      url:'/search/company?isLoading=1',
      data,
  })
}

//入驻企业分享
export const getAuthenticShareImg = data => {
  return axios({
      method:'get',
      url:'/tAuthentic/authenticShareImg',
      params:data
  })
}


//查找入驻企业详情
export const findInternationalCompanyDetail = data => {
  return axios({
      method:'post',
      url:'/tAuthentic/findCompanyDetail/?isLoading=1',
      data,
  })
}