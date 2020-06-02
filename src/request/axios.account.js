import axios from './axios'

/********************************** 用户账号相关（注册、登录、找回密码、修改密码） *******************************************/
//判断浏览器 redis
//code 浏览器指纹
export const checkRedis = params => {
  return axios({
    method:'get',
    url: window.config.apiUc+'/ucApi/checkRedis',
    params:params
  })
}


//图片验证码的接口
//code 是用户输入的验证码
//uuid  请求图形验证码的 uuid
export const checkCode = params => {
  return axios({
    method:'get',
    url: window.config.apiUc+'/ucApi/checkCode',
    params:params
  })
}



  /**
   * 发送验证码
   * @param {
   * type 短信类型 注册:register,登录:login,找回密码:resetPassword,修改密码:updatePassword
   *  username 邮箱/手机号
   *  lan  语种 中文:zh,英文:en，默认en
   * }
   */
export const sendCode = params => {
    return axios({
      url: window.config.apiUc +'/ucApi/sendCode',
      data:params
    })
}
 /**
   * 注册
   * @param {
   *  code 验证码
   *  name 姓名
   *  password 密码
   *  timeStamp 时间戳
   *  username 邮箱/手机号
   *  
   * }
   */
  export const register = params => {
    return axios({
      url: window.config.apiUc +'/ucApi/register',
      data:params
    })
}
/**
   * 验证码登录
   * @param {
   *  client_id 客户端ID
   *  code 验证码
   *  response_type 授权模式固定值code
   *  timeStamp 时间戳
   *  username 邮箱/手机号
   *   sign
   * }
   */
  export const loginByCode = params => {
    return axios({
      url:window.config.apiUc +'/ucApi/loginByCode',
      data:params
    })
}
/**
   * 授权码回调
   * @param {
   *  client_id 客户端ID
   *  loginTicket 登录成功后的凭证
   *  redirect_uri 回调地址
   *  response_type 授权模式固定值code
   *  
   * }
   */
  export const authorize = params => {
    return axios.get(`${window.config.apiUc}/oauth-server/authorize`,{params})
}
/**
   * 获取图形验证码
   * @param {
   *  uuid 随机不重复ID
   * }
   */
  export const getImageCode = params => {
    return axios.get(`${window.config.apiUc}/ucApi/getImageCode`,{params,responseType: 'blob',},)
}
/**
   * 普通密码登录
   * @param {
   *  client_id 客户端ID
   *  code 图形验证码
   *  password 密码
   *  username 用户名
   *  response_type 授权模式固定值code
   *  uuid 随机不重复ID
   * }
   */
  export const login = params => {
    return axios({
      url:window.config.apiUc+'/ucApi/loginUC',
      data:params
    })
}
/**
   * 找回密码
   * @param {
   *  code 验证码
   *  password 密码
   *  username 用户名
   *  sign 验证码Sign
   *  timeStamp 时间戳
   * }
   */
  export const resetPassword = params => {
    return axios({
      url:window.config.apiUc+'/ucApi/resetPassword',
      data:params
    })
}
/**
   * 修改密码
   * @param {
   *  access_token 用户令牌
   *  oldPassword 旧密码
   *  password  密码
   * }
   */
  export const updatePassword = params => {
    return axios({
      url:window.config.apiUc+'/ucApi/updatePassword',
      data:params
    })
}
/**
   * 登录入口
   * @param {
   *  
   *  
   * }
   */
  export const loginInto = () => {
    return axios.get({
      url:window.config.apiUc+'/oauth-client/loginInto',
    })
}
/**
   * 用户退出
   * @param {
   *  
   *  access_token 
   * }
   */
  export const logout = params => {
    return axios({
      url:window.config.apiUc+'/ucApi/logoutUC',
      data:params
    })
}
/**
   * 获取accessToken
   * @param {
   *  
   * client_id  客户端ID 
   * client_secret 客戶端秘钥
   * code 服务端传递过来的授权码
   * }
   */
  export const getAccessToken = params => {
    return axios.get(`${window.config.apiUc}/oauth-server/accessToken`,{params})
}

// uc同步
export const asyncUC = (data) => {
  return axios({
    url: window.config.apiUc + '/ucApi/synlogin',
    data
  })
}