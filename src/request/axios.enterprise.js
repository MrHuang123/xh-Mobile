import axios from './axios'


// 我的企業
export const requestGetMyCompanyList = data => {
  return axios({
    url:'/ucenter/myCompanyList',
    data
  })
}


// 根据省、市、银行获取连行号
// bankId
// cityCode
// provinceId
export const requestGetCNAPS = data => {
  return axios({
    method:'get',
    url:'/bank/bankLineNo',
    params:data,
  })
}

// 认证
export const requestSaveCompanyCertification = data => {
  return axios({
    method:'post',
    url:'/tAuthentic/saveCompanyCertification',
    data
  })
}

// 开户行验证
export const requestCertBank = data => {
  return axios({
    method:'get',
    url:'/tAuthentic/checkCorporateAccount',
    params:data
  })
}

// 查询我的企业-基本信息
export const requestGetBasicInfo = data => {
  return axios({
    method:'get',
    url:'/companyExt/getCompanyInfo?isLoading=1',
    params:data
  })
}

// 保存我的基本信息
export const requestSaveBasicInfo = data => {
  return axios({
    method:'post',
    url:'/companyExt/updateT_company',
    data
  })
}


// 企業風采查詢
// companyId
// tableName 表名(企业视界:t_horizon,发展历程:t_dev_path," +\n "照片墙:t_photo_wall,产品服务:t_product_service,资质信息:t_qa_info)
// 
export const requestVision = data => {
  return axios({
    method:'get',
    url:'/companyExt/getList',
    params:data
  })
}

// 前端页面提交审核
// ids,tableName
export const requestSubmitVision = data => {
  return axios({
    method:'post',
    url:'/companyExt/auditSubmit',
    data
  })
}

// 企業風采刪除
// 表名(企业视界:t_horizon,发展历程:t_dev_path," +\n "照片墙:t_photo_wall,产品服务:t_product_service,资质信息:t_qa_info)
export const requestDeleteVision = data => {
  return axios({
    method:'post',
    url:'/companyExt/delete.do',
    data
  })
}

// 新增资质信息

export const requestAddQaInfo = data => {
  return axios({
    method:'post',
    url:'/companyExt/addT_qa_info.do',
    data
  })
}

// 修改资质信息
export const requestEditQaInfo = data => {
  return axios({
    method:'post',
    url:'/companyExt/updateT_qa_info.do',
    data
  })
}

// 新增资质信息

export const requestAddPhoto = data => {
  return axios({
    method:'post',
    url:'/companyExt/addT_photo_wall.do',
    data
  })
}

// 修改资质信息
export const requestEditPhoto = data => {
  return axios({
    method:'post',
    url:'/companyExt/updateT_photo_wall.do',
    data
  })
}

// 
export const getIsEnableButtom = data => {
  return axios({
    url:'/companyExt/isEnableButtom',
    data
  })
}