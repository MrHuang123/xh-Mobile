import axios from './axios'

// 关注
// companyId
export const requestToggleFocus = data => {
  return axios({
    url:'/ucenter/focus',
    data
  })
} 

// 企业是否关注
// companyId
export const requestIsFocusCompany = data => {
  return axios({
    url:'/ucenter/isfocus',
    data
  })
}

// 我关注的企业
// currentPage
// pageSize
export const requestGetMyFocusedCompanyList = data => {
  return axios({
    url:'/ucenter/focusCompanyList?isLoading=1',
    data
  })
}

// 合作邀请
// content
// companyId
export const requestAskForCoopration = data => {
  return axios({
    url:'/ucenter/sendCooperation',
    data
  })
}

// 获取名片图片
// token
export const requestUserCardImg = data => {
  return axios({
    url:'/ucenter/userCardImg',
    data
  })
}


// 发送名片
// companyId
export const requestSendCard = data => {
  return axios({
    url:'/ucenter/sendCard',
    data
  })
}
/********************************** 用户中心模块 *******************************************/
/**
  //  * 获取用户信息
  //  * @param {
  //  *  access_token
  //  * }
  //  */
  // export const getUserInfo = params => {
  //   return axios.get('/ucApi/userInfo',{params},)
// } 
/**
   * 用户信息
   * @param {
   *  access_token
   * }
   */
  export const getUserCenterUserInfo = params => {
    return axios({
        url:'/ucenter/userInfo',
        data:params
      })
} 
/**
   * 我的企业
   * @param {
   *  access_token 用户令牌
   *  currentPage 当前页码默认1
   *  pageSize 每页显示多少条默认10
   * }
   */
  export const myCompanyList = params => {
    return axios({
        url:'/ucenter/myCompanyList',
        data:params
      })
} 
/**
   * 我关注的企业
   * @param {
   *  access_token 用户令牌
   *  currentPage 当前页码默认1
   *  pageSize 每页显示多少条默认10
   * }
   */
  export const focusCompanyList = params => {
    return axios({
        url:'/ucenter/focusCompanyList?isLoading=1',
        data:params
      })
} 

/**
   * 个人认证
   * @param {
   *  access_token 用户令牌
   *  cardNum 证件号码
   *  cardType 证件类型
   *  name 姓名
   *  positive 证件照正面文件ID
   *  reverse  证件照反面面文件ID
   * }
   */
  export const myAuthentication = params => {
    return axios({
        url:'/ucenter/myAuthentication?isLoading=1',
        data:params
      })
} 

/**
   * 修改昵称
   * @param {
   *  access_token 用户令牌
   *  nickName nickName
   * }
   */
  export const updateNickName = params => {
    return axios({
        url:'/ucenter/updateNickName',
        data:params
      })
}
/**
   * 用户信息修改
   * @param {
   *  access_token 用户令牌
   *  address 地址
   *  industry 行业
   *  nickName 昵称
   *  position 职务
   * }
   */
  export const userInfoUpdate = params => {
    return axios({
        url:'/ucenter/userInfoUpdate',
        data:params
      })
} 


export const getUserIsCert = params => {
  return axios({
    url:'/tAuthentic/findUserCertificationRecord',
    params,
    method:'get',
  })
}


// 获取企业互动用户信息
export const getInfoAboutAction = data => {
  return axios({
    url:'/ucenter/getMyMessage',
    data,
    method:'post'
  })
}