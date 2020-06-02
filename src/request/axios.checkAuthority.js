import axios from './axios.js';

//判断是否有权限访问
//moduleName 
// number
// token
export const checkAuthority = data => {
    return axios({
      method:'get',
      url:'/authority/checkAuthority',
      params:data
    })
  } 