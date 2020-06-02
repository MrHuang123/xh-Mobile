import axios from 'axios'
import formatParams from '../utils/formData';
import router from '../router.config';
import {Decrypt,Encrypt,md5encode} from '../utils/crypto.js';
import getUdid from "../utils/getUdid.js";

axios.defaults.method = 'post';
axios.defaults.baseURL = window.config && window.config.api;
axios.defaults.transformRequest = [(data,res) =>{
  return formatParams(Object.assign({},data,{
    access_token:localStorage.access_token
  }))
} 
];

axios.interceptors.request.use(config=>{
  var ec = new evercookie();
  var token = ''
  ec.get("token", function(value) { 
      if(!value){
        var MacAddress;
        new Fingerprint2({
            // 配置项（可选）
            excludeSessionStorage: true, // 排除会话存储用户的浏览器支持
            excludeOpenDatabase: true, // 排除式用户浏览器的支持
            excludeIndexedDB: true, // 排除IndexedDB用户浏览器的支持
            excludeLanguage: true, // 排除浏览器的语言
            userAgent: true, // 用户代理，包含浏览器版本号
            excludeUserAgent: true
        }).get(function(result, components){
           ec.set("token", result);
        });
      }else{
        token = value
      }
  });
  var nonce = String(getUdid())
  var timestamp =String(Date.now())
  var str = {
      "nonce":nonce,
      "secrekey":'ABCD123DEF',
      "timestamp":timestamp,
  };
  if(config.method === 'post'&&!config.url.includes('/file/localUpload')) {

      config.data = Object.assign({},config.data,{
        sign:md5encode(JSON.stringify(str)),
        nonce:nonce,
        timestamp:timestamp,
        token:token,
        terminal:'h5',
        ...config.data
      })
  } else if(config.method === 'get'&&!config.url.includes('/file/localUpload')) {
      config.params = Object.assign({},config.params,{
        sign:md5encode(JSON.stringify(str)),
        nonce:nonce,
        timestamp:timestamp,
        token:token,
        terminal:'h5',
        access_token:localStorage.access_token,
        ...config.params
      })
  }
  return config.url.includes('http') ? 
         config : 
         Object.assign({},config,{
          baseURL:
            config.url.includes('/company_search/') ||  config.url.includes('/searchHint/')?
            window.config.apiSearch :
            config.url.includes('/ucApi/') ?
            window.config.apiUc :
            config.url.includes('/file/') ?
            window.config.apiFile :
            window.config.api
         }) 

},error=>{
  return Promise.reject(error)
})


axios.interceptors.response.use((res)=>{
  
  if(res.config.url.includes("isLoading")){
    let timer = setTimeout(()=>{
      clearTimeout(timer)
      Vue.prototype.$toast.clear()
    },500)
  }

  
  const data = res.data ;
  
  if( (res.request.responseURL.includes('/ucApi/checkCode')||res.request.responseURL.includes('/ucApi/checkRedis')) && data.code == 0) {
    return res.data;
  }
  if( res.request.responseURL.includes('/bench/articles') &&  data.status == 1){
    return data ;
  }

  if( res.request.responseURL.includes('/file/') && data.code == 0 ){
    return data ;
  }

  if( res.request.responseURL.includes('column/getUrl') && (data.code == 0 ||  data.status == 1) ){
    return data ;
  }

  // if(data.code == 81000012) {
  //   // Cookies.remove('access_token',{domain: '.'+document.domain.split('.').reverse().splice(0,2).reverse().join('.')});
  //   // localStorage.removeItem("code");
  //   // localStorage.removeItem("access_token");

  // }
  if(!!data.updating){
    Vue.prototype.$toast('Enterprise data is being updated. Please try again late')
  }
  
  if( data.code == 200  ){
    return data;
  };
  const codeObj = localStorage.codeObj ? JSON.parse(localStorage.codeObj) : {};
  if(data.code == 81000012 ){
    Cookies.remove('access_token',{domain: '.'+document.domain.split('.').reverse().splice(0,2).reverse().join('.')});
    localStorage.removeItem("code");
    localStorage.removeItem("access_token");
    Vue.prototype.$cleanToken();
    if(window.location.href.includes('/userCenter')||window.location.href.includes('/notificationCenter')||window.location.href.includes('/enterprise')){
      window.isExpired = true;
      // debugger
      Vue.prototype.$toast('User information invalid, please login again')
      setTimeout(()=>{
        // debugger
        location.href='/login'
      },500)
    }
  }else if(data.code == 81000199||data.code == 83000001){
    
 
  }else if(data.code == 83000001){
    
 
  }else if(data.code == 81000011){
    Cookies.remove('access_token',{domain: '.'+document.domain.split('.').reverse().splice(0,2).reverse().join('.')});
    Vue.prototype.$cleanToken();
    if((codeObj[data.code]&&codeObj[data.code].msg)){
      Vue.prototype.$toast((codeObj[data.code]&&codeObj[data.code].msg)||'')
    }
  }else{
    if(codeObj[data.code]&&codeObj[data.code].msg){
      Vue.prototype.$toast((codeObj[data.code]&&codeObj[data.code].msg)||'')
    }
  }

  


  return Promise.reject(data)
  


},(err)=>{
  // Vue.prototype.$toast('network error')

  return Promise.reject(err)
})

export const http = axios ;

export default axios;