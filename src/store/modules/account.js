import { asyncUC ,sendCode, register, loginByCode, login, getImageCode, resetPassword, logout, updatePassword, authorize, getAccessToken } from '../../request/axios.account.js';
import pattern from '../../utils/pattern.js'
const state = {
  sign: '',
  timeStamp: '',
  imgUrl: '',
  response_type: 'code',//授权模式固定值[code]localStorage.setItem('client_id', data.client_id)
  redirect_uri: location.origin + '/userCenter/mine',
  client_id: 'c1ebe466-1cdc-4bd3-ab69-77c3561b9de1',//客户端ID
  code: localStorage.code || '',//获取token的code
  client_secret: 'd8346ea2-6017-43ed-ad68-19c0f9717382',//客戶端秘钥(获取token的参数)
  filed: 0,//验证失败改变input框颜色
  htmlUC: localStorage.scriptUC||'',

}
const getters = {

}
const mutations = {
  changeKey(state,payload){
    for(let i in payload){
      state[i] = undefined ;
      state[i] = payload[i] ;
    }
  },
  updateUC(state, htmlUC){
    if(htmlUC){
      state.htmlUC = htmlUC.replace(/https:|http:/g, location.protocol);
    }else{
      state.htmlUC = ''
    }
  },
  changeColor(state, payload) {
    state.filed = payload
  },
  getSign(state, payload) {
    state.sign = payload.sign;
    state.timeStamp = payload.timeStamp
  },
  getImageUrl(state, payload) {
    state.imgUrl = payload.url
  },
}
const actions = {
  //获取accessToken
  getAccessToken({ state, getters, commit, rootState }, option) {
    return new Promise((resolve, reject) => {
      let params = {
        client_id: option.client_id,
        client_secret: option.client_secret,
        code: option.code
      }
      getAccessToken(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          localStorage.setItem("access_token", res.data.access_token);
          resolve(res.data.access_token)
        }else if(res.code == 400){
          reject()
        }
      }).catch(()=>{
        reject()
      })
    }).catch(()=>{
      reject()
    })
  },
  //授权码回调
  authorize({ state, getters, commit, rootState }, option) {
    console.log(111)
    let url = `${window.config.apiUc}/oauth-server/authorize`;
    let redirect_uri = encodeURIComponent(option.redirect_uri);
    const loginTicket = typeof option.loginTicket === 'string'? option.loginTicket : option.loginTicket.loginTicket;
    window.location.href = url + "?redirect_uri=" + redirect_uri + "&client_id=" + option.client_id + "&response_type=" + option.response_type + "&loginTicket=" + loginTicket;
    // window.location.href = url + "?redirect_uri=" + redirect_uri + "&client_id=" + option.client_id + "&response_type=" + option.response_type + "&loginTicket=" + option.loginTicket;
    
  },
  //修改密码
  updatePassword({ state, getters, commit, rootState }, option) {
    // console.log(option)
    return new Promise((resolve, reject) => {
      if (!option.oldPassword) {
        Vue.prototype.$toast('Please enter your old password')
        commit('changeColor', '1')
        return false;
      }
      if (!pattern.password.test(option.oldPassword)) {
        Vue.prototype.$toast('Old password is composed of 6-18 digit upper or lower case letters or characters')
        commit('changeColor', '1')
        return false;
      }
      if (!option.password) {
        Vue.prototype.$toast('Please enter a new password')
        commit('changeColor', '2')
        return false;
      }
      if (!pattern.password.test(option.password)) {
        Vue.prototype.$toast('New password is composed of 6-18 digit upper or lower case letters or characters')
        commit('changeColor', '2')
        return false;
      }
      updatePassword({
        access_token: option.access_token,
        oldPassword: option.oldPassword,
        password: option.password,
      }).then(res => {
        if (res.code == 200) {
          resolve();
        }
      }).catch(() => {

      })
    }).catch(() => { reject() })
  },
  //退出
  logout({ state, getters, commit, rootState }, option) {
    return new Promise((resolve, reject) => {
      logout({
        access_token: option
      }).then(res => {
        if (res.code == 200) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('code');
          Cookies.remove('access_token',{domain: '.'+document.domain.split('.').reverse().splice(0,2).reverse().join('.')});
          commit('updateUC', res.data);
          var data = res.data && res.data.replace(/https:|http:/g, location.protocol);
          $('#uc-iframe').html(`<div class='loginScript'>${data}</div>`)
          setTimeout(()=>{
            resolve(res);
          },200)
        }
      }).catch(() => {

      })
    }).catch((res) => {
     
    })
  },
  //找回密码
  resetPassword({ state, getters, commit, rootState }, option) {
    return new Promise((resolve, reject) => {
      if (!option.username) {
        Vue.prototype.$toast('Please enter email address or mobile number')
        commit('changeColor', '1')
        return false;
      }
      if (!(pattern.email.test(option.username) || pattern.mobile.test(option.username))) {
        Vue.prototype.$toast('Please enter your mobile number or email address in the correct format')
        commit('changeColor', '1')
        return false;
      }
      if (!option.code) {
        Vue.prototype.$toast('Please enter SMS verification code')
        commit('changeColor', '2')
        return false;
      }
      if (!option.password) {
        Vue.prototype.$toast('Please enter password')
        commit('changeColor', '3')
        return false;
      }
      if (!pattern.password.test(option.password)) {
        Vue.prototype.$toast('Password is composed of 6-18 digit upper or lower case letters or characters')
        commit('changeColor', '3')
        return false;
      }
      if (!option.password2) {
        Vue.prototype.$toast('Please enter your confirmation password')
        commit('changeColor', '4')
        return false;
      }
      if (option.password !== option.password2) {
        Vue.prototype.$toast('Passwords entered twice are inconsistent. Please confirm')
        commit('changeColor', '4')
        return false;
      }
      resetPassword({
        username: option.username,
        password: option.password,
        code: option.code,
        sign: option.sign,
        timeStamp: option.timeStamp
      }).then(res => {
        // console.log(res)
        if (res.code == 200) {
          resolve()
        }
      }).catch(() => {

      })
    }).catch((res) => {
      
    })
  },
  //获取图形验证码
  getImageCode({ state, getters, commit, rootState }, option) {
    // console.log(option)
    let params = {
      uuid: option
    }
    getImageCode(params).then(res => {
      // console.log(res)
      var reader = new FileReader();
      reader.onload = function (e) {
        commit('getImageUrl', { url: e.target.result })
      }
      reader.readAsDataURL(res);
    }).catch(() => {

    })
  },
  //普通密码登录
  async login({ state, getters, commit, rootState }, option) {
    return new Promise(async (resolve, reject) => {
      if (!option.username) {
        Vue.prototype.$toast('Please enter username or email address or mobile number')
        commit('changeColor', '1')
        option.err && option.err()
        return false;
      }
      // if (!(pattern.email.test(option.username) || pattern.mobile.test(option.username))) {
      //   Vue.prototype.$toast('Please enter your mobile number or email address in the correct format')
      //   commit('changeColor', '1')
      //   option.err && option.err()
      //   return false;
      // }
      if (!option.password) {
        Vue.prototype.$toast('Please enter password')
        commit('changeColor', '2')
        option.err && option.err()
        return false;
      }
      if (!pattern.password.test(option.password)) {
        Vue.prototype.$toast('Password is composed of 6-18 digit upper or lower case letters or characters')
        commit('changeColor', '2')
        option.err && option.err()
        return false;
      }
      if (!option.code) {
        Vue.prototype.$toast('Please enter correct graphic verification code')
        commit('changeColor', '3')
        option.err && option.err()
        return false;
      }
      login({
        username: option.username,
        password: option.password,
        code: option.code,
        uuid: option.uuid
      }).then(async res => {
        if (res.code == 200) {
          !!localStorage.access_token&&localStorage.removeItem('access_token');
          await asyncUC({uid: res.data.uid}).then(res=>{
            localStorage.scriptUC = res.data && res.data.replace(/https:|http:/g, location.protocol);
            var data = res.data && res.data.replace(/https:|http:/g, location.protocol);
            commit('updateUC',  res.data);
            $('#uc-iframe').html(`<div class='loginScript'>${data}</div>`)
          })
          setTimeout(()=>{
            resolve(res.data)
          },1000)  
          // const timer = setTimeout(() => {
          //   clearTimeout(timer);
          // }, 300)
        }else{
          option.err && option.err()
        }
      }).catch(() => {
        option.err && option.err()
      })
    }).catch((res) => {
      // console.log(res)
      option.err && option.err()
    })
  },
  //验证码登录
  loginByCode({ state, getters, commit, rootState }, option) {
    // console.log(option)
    var that = this
    return new Promise((resolve, reject) => {
      if (!option.username) {
        Vue.prototype.$toast('Please enter email address or mobile number')
        commit('changeColor', '1')
        return false;
      }
      if (!(pattern.email.test(option.username) || pattern.mobile.test(option.username))) {
        Vue.prototype.$toast('Please enter your mobile number or email address in the correct format')
        commit('changeColor', '1')
        return false;
      }
      if (!option.code) {
        Vue.prototype.$toast('Please enter SMS verification code')
        commit('changeColor', '2')
        return false;
      }
      loginByCode({
        code: option.code,
        response_type: option.response_type,
        timeStamp: option.timeStamp,
        username: option.username,
        sign: option.sign
      }).then(res => {
        // console.log(res.data)
        if (res.code == 200) {
          !!localStorage.access_token&&localStorage.removeItem('access_token')
          resolve(res.data)
        }
      }).catch(() => {

      })
    }).catch((res) => {

    })
  },
  //注册
  register({ state, getters, commit, rootState }, option) {
    // console.log(option)
    var that = this
    return new Promise((resolve, reject) => {
      if (!option.username) {
        Vue.prototype.$toast('Please enter email address or mobile number')
        commit('changeColor', '1')
        return false;
      }
      if (!(pattern.email.test(option.username) || pattern.mobile.test(option.username))) {
        Vue.prototype.$toast('Please enter your mobile number or email address in the correct format')
        commit('changeColor', '1')
        return false;
      }
      if (!option.code) {
        Vue.prototype.$toast('Please enter SMS verification code')
        commit('changeColor', '2')
        return false
      }
      if (!option.password) {
        Vue.prototype.$toast('Please enter password')
        commit('changeColor', '3')
        return false;
      }
      if (!pattern.password.test(option.password)) {
        Vue.prototype.$toast('Password is composed of 6-18 digit upper or lower case letters or characters')
        commit('changeColor', '3')
        return false;
      }
      if (!option.password2) {
        Vue.prototype.$toast('Please further confirm the password')
        commit('changeColor', '4')
        return false;
      }
      if (option.password !== option.password2) {
        Vue.prototype.$toast('Passwords entered twice are inconsistent. Please confirm')
        commit('changeColor', '4')
        return false;
      }
      if (!option.checked) {
        Vue.prototype.$toast('Please agree to the registration agreement first')
        return false;
      }
      register({
        code: option.code,
        username: option.username,
        password: option.password,
        timeStamp: option.timeStamp,
        sign: option.sign
      }).then(res => {
        // console.log(res.data)
        if (res.code == 200) {
          resolve()
        }
      }).catch(() => {

      })
    }).catch((res) => {
      
    })
  },
  //发送邮箱/手机验证码
  sendCode({ state, getters, commit, rootState }, option) {
    // console.log(option)
    if (!option.username) {
      Vue.prototype.$toast('Please enter email address or mobile number')
      commit('changeColor', '1')
      option.err && option.err()
      return false;
    }
    if (!(pattern.email.test(option.username) || pattern.mobile.test(option.username))) {
      Vue.prototype.$toast('Please enter your mobile number or email address in the correct format')
      commit('changeColor', '1')
      option.err && option.err()
      return false;
    }
    let params = {
      type: option.type,
      username: option.username,
      lan: option.lan,
    }
    sendCode(params).then(res => {
      if (res.code == 200) {
        // console.log(res.data)
        commit('getSign', { sign: res.data.sign, timeStamp: res.data.timeStamp })
        option.sus && option.sus()
      } else {
        option.err && option.err()
      }
    }).catch(() => {
      option.err && option.err()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}