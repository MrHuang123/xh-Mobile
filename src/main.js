import 'babel-polyfill';
import './utils/config'
import App from './App';
import router from './router.config';

import Store from './store/'
import './stylus/APP.styl'
import "swiper/dist/css/swiper.css"; ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import getParams from './utils/getParams'

import './mixin/filter'
import './mixin/directive'
import './mixin/functions'
import './mixin/mixins'
import './mixin/touch'

import  './utils/evercookie'
// import vConsole from 'vconsole';


import { Notify,Toast,Dialog  } from 'vant';


Notify.setDefaultOptions({
  background:'#C63639',
  duration:3000,
  color:'#fff'
})

Vue.use(Notify);
Vue.use(Toast);
Vue.use(Dialog);

// Vue.prototype.$vConsole=new vConsole();

// 解决ios，input关闭键盘后导致页面底部空缺问题
document.body.addEventListener('blur', function(e) {
  if(!!e&&e.target.tagName == 'INPUT'){
    window.scrollTo(0, 0)
  }
}, true)
Vue.prototype.$cleanToken = function(){//清除token
  localStorage.removeItem("access_token")//清除token
  localStorage.removeItem('code');
  Cookies.remove('access_token',{domain: '.'+document.domain.split('.').reverse().splice(0,2).reverse().join('.')});
  Store.mutations.updateToken(Store.state,'')
}

router.beforeEach((to, from, next)=>{
  
  // const params = getParams();
  // if(params.hasOwnProperty("token")){
  //   var ec = new evercookie();
  //   ec.set("token", params.token);
  // }
  
  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  const ua = navigator.userAgent.toLowerCase();
  const isWeixin = ua.indexOf('micromessenger') != -1;
  if (isiOS && (to.path !== global.location.pathname)) {
    
    if(to.path.includes('/enterprise/identify')||to.path.includes('/enterprise/home')||to.path.includes('/notificationCenter/index')||(to.path.includes('enterprise/detail')&&to.path.includes('/base'))||to.path.includes('/userCenter')||to.path.includes('/credit/search')){
    }else{
      if (isWeixin) {
        location.assign(to.fullPath);
      }
    }
  }


  const path = to.path ;
  const isAboutAccount = path.indexOf('/userCenter') ===0 || path.indexOf('/notificationCenter') ===0 || path.indexOf('/enterprise') === 0 ;



  if(isAboutAccount && (!localStorage.access_token || String(localStorage.access_token).length<10)&& !location.href.includes('code=')  ){
    Toast('Please login');
    next({path:'/login'})
    // localStorage.shareLink = window.location.origin+'#/login';

  }else{
    if(to.query.code){
      localStorage.setItem("code", to.query.code);
    }
    next(vm=>{
  // console.log(vm)
    })
  }
  
})



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />',
  store: new Vuex.Store(Store),
})