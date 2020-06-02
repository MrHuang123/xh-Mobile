import axios from './axios.js';

// eci模块
export const getCompanyInfo = (companyId)=> {
  return axios({
    url:`/company_search/g/eci/company/${companyId}?isLoading=1`
  })
}

export const getAtrribute = (companyId)=> {
  return axios({
    url:`/company_search/g/eci/company_attribute/${companyId}?isLoading=1`
  })
}

export const getIndustry = (companyId)=> {
  return axios({
    url:`/company_search/g/eci/industry/${companyId}`
  })
}



export const getPartner = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eci/partner/${companyId}?page=${page-1}`
  })
}

export const getEmployee = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eci/employee/${companyId}?page=${page-1}`
  })
}

export const getBranch = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eci/branch/${companyId}?page=${page-1}`
  })
}

export const getChange = ({companyId,page=1,size,type })=> {
  return axios({
    url:`/company_search/g/eci/change/${companyId}?page=${page-1}&scope=${type}`
  })
}

export const getOpexception = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eci/opexception/${companyId}?page=${page-1}`
  })
}

// ************eciAsset模块
export const getSoftwareCopyrights = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciAsset/software_copyrights/${companyId}?page=${page-1}`
  })
}

export const getWebsites = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciAsset/website/${companyId}?page=${page-1}`
  })
}

export const getCopyrights = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciAsset/copyright/${companyId}?page=${page-1}`
  })
}

export const getCertification = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciAsset/certification/${companyId}?page=${page-1}`
  })
}

export const getPatentDetail = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciAsset/patent_detail/${companyId}?page=${page-1}`
  })
}

export const getTmInfo = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciAsset/tm_info/${companyId}?page=${page-1}`
  })
}

// *********eciOperation模块
export const getTaxes = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/financingtax/${companyId}?page=${page-1}`
  })
}

export const getFinancing = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/financing/${companyId}?page=${page-1}`
  })
}

export const getInvest = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/invest_info/${companyId}?page=${page-1}`
  })
}

export const getLiquidation = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/liquidation/${companyId}?page=${page-1}`
  })
}

export const getMpledge = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/mpledge/${companyId}?page=${page-1}`
  })
}

export const getPenalty = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/penalty/${companyId}?page=${page-1}`
  })
}

export const getPledge = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/pledge/${companyId}?page=${page-1}`
  })
}

export const getProduct = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/product/${companyId}?page=${page-1}`
  })
}

export const getRecruit = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/recruit_info/${companyId}?page=${page-1}`
  })
}

export const getSpotcheck = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/eciOperation/spotcheck/${companyId}?page=${page-1}`
  })
}

// **********law模块
export const getCase = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/law/case/${companyId}?page=${page-1}`
  })
}
export const getCourts = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/law/chinacourts/${companyId}?page=${page-1}`
  })
}

export const getShixin = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/law/shi_xin/${companyId}?page=${page-1}`
  })
}

export const getZhixing = ({companyId,page=1,size })=> {
  return axios({
    url:`/company_search/g/law/zhi_xing/${companyId}?page=${page-1}`
  })
}
