import axios from './axios'
// 查詢企業
// text
// cond
// page
// page_size
export const requestSearchCompany = data => {
  // var nonce = String(getUdid())
  // var timestamp =String(Date.now())
  // var str = {
  //     "nonce":nonce,
  //     "timestamp":timestamp
  //     };
  return axios({
    method:'get',
    url:'/company_search/q1?isLoading=12',
    params:Object.assign({},data,{
      isLoading:1,
    }),
  })
}

// 搜索未認證企業
export const requestUnverifiedCompany = data => {
  // var nonce = String(getUdid())
  // var timestamp =String(Date.now())
  // var str = {
  //     "nonce":nonce,
  //     "timestamp":timestamp
  //     };
  return axios({
    method:'get',
    url:'/company_search/q/unverified/'+data.text+"?isLoading=1",
    // params:Object.assign({},data,{
    //   sign:md5encode(JSON.stringify(str)),
    //   nonce:nonce,
    //   timestamp:timestamp,
    // }),
  })
}

// 獲取企業詳細信息
// companyId
export const requesetGetCompanyDetail = data => {
  return axios({
    method:'get',
    url: '/company_search/g/'+data.id+'?list_limit=20&isLoading=1'
  })
}

// 获取信用评分
// name:企业名称
export const requestGetGrade = data => {
  return axios({
    method:'get',
    url:'/credit/grade',
    params:data
  })
}


//信用等级
export const getCalcScore = data => {
  return axios({
      method:'get',
      url:'/credit/calcScore',
      params: data
  })
}
//风险状况
export const scorePortrait = data => {
  return axios({
      method:'get',
      url:'/credit/scorePortrait',
      params: data
  })
}
//信用评价
export const scorePercent = data => {
  return axios({
      method:'get',
      url:'/credit/scorePercent',
      params: data
  })
}

// 獲取企業認證狀態
// companyId
export const requestFindCompanyCertificationRecord = data => {
  return axios({
    method:'get',
    url:'/tAuthentic/findCompanyCertificationRecord',
    params:data
  })
}
//获取最新发布列表(新接口)
export const getNewArticleList = () => {
  //"pageNo=0" -d "pageSize=10"
  return axios({
    method:'get',
    url:'/column/getArticleList',
    params:{
      pageNo:0,
      pageSize:10
    }
  })
}
// 獲取最新新聞
export const getNewstColumn = () => {
  return axios({
    method:'get',
    url:'/column/selectNewColumn'
  })
}

// 获取类目分类
export const requestSelectAllColumn = () =>{
  return axios({
    method:'get',
    url:'/column/selectAllColumn',
    // url:'/column/getUrl'
  })
}
//信用发布栏目chinaBrandsColumn
export const getChinaBrandsColumn = data => {
  return axios({
    method:'get',
    url:'/column/chinaBrandsColumn',
    params:data
  })
}
//信用发布栏目chinaProjectColumn
export const getChinaProjectColumn = data => {
  return axios({
    method:'get',
    url:'/column/chinaProjectColumn',
    params:data
  })
}  
//信用发布栏目companyColumn
export const getCompanyColumn = data => {
  return axios({
    method:'get',
    url:'/column/companyColumn',
    params:data
  })
}
// 獲取類目下列表(loading)
export const getColumnList = data => {
  return axios({
    method:'post',
    url:"/column/getUrl?isLoading=1&stamp="+new Date().getTime(),
    data
  })
}
// 獲取類目下列表(无loading)
export const getColumnList_2 = data => {
  return axios({
    method:'post',
    url:"/column/getUrl?stamp="+new Date().getTime(),
    data
  })
}
//发布列表（审核通过的，且计算点击率搞的6个）
export const getReleaseList = data => {
  return axios({
    url:'/commpany/ReleaseList',
    data,
  })
}
//发布详情
export const selectReleaseDetail = data => {
  return axios({
    url:'/commpany/selectReleaseDetail',
    data,
  })
}
//公司基本信息
export const getCompanyInfo = data => {
  return axios({
    method:'get',
    url:'/companyExt/getCompanyInfo',
    params:data
  })
}  

// 廣告為信息
export const getAdvertList = async data => {
  const url = await axios({
      method:'get',
      url:'/column/advertising',
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

// 獲取是否民族品牌：data：1、0
export const getIsBrand = data=> {
  return axios({
    url:'/tAuthentic/checkCompanyNational',
    data
  })
}


// 民族品牌列表
export const requestGetyNationalBrandList = () => {
  return axios({
    method:'get',
    url:'/national_brand/getyNationalBrandList?isLoading=1'
  })
}

// 民族品牌详情
export const requestGetyNationalBrandInfo = (params) => {
  return axios({
    method:'get',
    url:'/national_brand/getyNationalBrandInfoByCompanyId?isLoading=1',
    params
  })
}

// 企業分享信息
export const getShareEnterpriseDetail = params => {
  return axios({
    method:'get',
    url:'/tAuthentic/authenticShare',
    params
  })
}

// 企業認證證書
export const getCertShareImg = params => {
  return axios({
    method:'get',
    url:'/tAuthentic/authenticShareImg',
    params
  })
}


//根据公司id 判断企业是否已认证
export const getEnterIsCerted = data => {
  return axios({
      method:'get',
      url:'/tAuthentic/findCompanyCertificationRecord',
      params: data
  })
}


// 发送名片
export const sendCard = data => {
  return axios({
    method:'post',
    url:'/ucenter/sendCard',
    data
  })
}
