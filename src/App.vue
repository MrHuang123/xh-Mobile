<template>
  <div>
    <transition name="route">
      <router-view ></router-view>
    </transition>
    <x-footer v-if="summitShow" />
    <div id='uc-iframe' v-show='!!htmlUC'  class="p-f-xl-yt o-0 h-0 w-0">
    </div>
    <!-- <div @click='saveVuexData' id="ios-locale" class='p-f-xl-yt o-0 h-0 w-0'></div> -->
    <!-- <iframe class='p-f-xl-yt h-0 w-0 o-0' v-show='srcUC.length>0' v-for='(item,index) in srcUC' :src='item' :key='index' frameborder="0"></iframe> -->
  </div>
</template>
<script>
import { getCodeConfig,getWxSign } from '*/request/axios.common.js'
import xFooter from '@/layout/footer.vue'
import { mapState,mapMutations,mapActions } from 'vuex'
import getParams from '*/utils/getParams'
import axios from './request/axios';
// import {} fr

export default {
  components:{xFooter},
  data(){
    return{
      isIOS : !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      isWx: window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
      // isHide: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
      params:getParams(),
      srcUC: [],
      summitShow : false,
    }
  },
  computed:{
    ...mapState(['lan','wxShareTitle','wxShareDesc','isInter']),
    ...mapState("account", ["client_id",'client_secret','htmlUC'])
    // title(){
        
		// 		return this.wxShareTitle;
		// 	}

  },
  watch: {
    $route(to){
      // console.log(window.location.href);
      //除上线宣传页不显示底部导航，其他都显示
      if(to.path == '/summit'){
        this.summitShow = false
      }else{
        this.summitShow = true
      }
      if(to.path.includes('/credit')&&to.path.includes('/enter')){
        // this.setWxShare()
      }else if(to.path.includes('/credit/infor/detail')||to.path.includes('/summitDetail')||to.path.includes('/share')||to.path.includes('/home/vendorquery')){
          // console.log(to.path)
          // console.log(111)
      }else if(location.pathname == '/summit'){
        this.setWxShare({wxShareTitle:'新华信用【英文版】上线啦~',wxShareDesc:'【新华信用】权威专业可靠的信用信息查询和发布平台'})
      }else{
        // this.updateWxShareTitle({wxShareTitle:'',wxShareDesc:''})
        // this.updateWxShareTitle({wxShareTitle:'Welcome to Xinhua Credit',wxShareDesc:'Credit inquiry and release platform.'})
        this.setWxShare()
      }
      
    },
    // title(nV,oV){
    //   this.setWxShare()
    // },
    htmlUC(){
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.srcUC = [...new Set(document.querySelector('#uc-iframe').querySelectorAll('script'))].map(dom=>{
          return dom.getAttribute('src');      
        });
      }, 1000)
    },
  },
  async created(){
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    
    await this.judgeIsLogin()
    getCodeConfig({lan:this.lan})
      .then(res=>{
        let codeObj = {};

        res.data.forEach(item=>{
          codeObj[item.code] = item ;
        })

        localStorage.codeObj = JSON.stringify(codeObj);

      })
  
  },
  mounted(){
    // axios({
    //   url:'https://www.imsilkroad.com/api/uc?time=1568942935&code=7c22uh1VGzibBmssG21E4jOQfrv8Z%2FlueMleUn54m7LTlckewKFSrcUnBpr2DNyQ1bNOFI8SK%2Bl6CkGOxg'
    // })

    const timer = setTimeout(()=>{
      clearTimeout(timer);
      // !!this.htmlUC && (this.srcUC = document.querySelector('#uc-iframe').querySelector('script').getAttribute('src'));
      !!this.htmlUC && (this.srcUC = [...new Set(document.querySelector('#uc-iframe').querySelectorAll('script'))].map(dom=>{
          return dom.getAttribute('src');      
        }));
      localStorage.htmlUC = '';
    },1000);

    window.addEventListener('resize',()=>{
      this.changeKey({
        height:window.innerHeight,
        width:window.innerWidth,
      })
    });
    // this.setWxShare()
    
  },
 
  methods:{
    ...mapActions("account", ["logout", "getAccessToken"]),
    ...mapMutations(['updateToken']),
    ...mapMutations(['changeKey']),

    // saveVuexData(){
    //   console.log(this.$store.state);
    //   sessionStorage.store = JSON.stringify(this.$store.state);
    // },

    // 微信分享
    // setWxShare(){
    //   const ua = navigator.userAgent.toLowerCase();
    //   const isWeixin = ua.indexOf('micromessenger') != -1;
    //   if (!isWeixin) {
    //     return false;
    //   }
    //   const origin = 'https://em.credit100.com';
    //   const img = `${origin}/static/xhxyLOGO.png`;
    //   // console.log(this.wxShareTitle)
    //   var title = this.wxShareTitle?this.wxShareTitle:'Welcome to Xinhua Credit';
    //   var desc = this.wxShareDesc;
    //   getWxSign({
    //     url: window.location.href
    //   })
    //   .then(res=>{
    //       wx.config({
    //         debug: false,
    //         appId: res.data.appId,
    //         timestamp: res.data.timestamp,
    //         nonceStr: res.data.nonceStr,
    //         signature: res.data.signature,
    //         jsApiList: [
    //           'onMenuShareWeibo', // 分享到微博
    //           'updateAppMessageShareData', // 转发给微信、qq
    //           'updateTimelineShareData', // 分享至朋友圈、qq空间
    //           'onMenuShareAppMessage',
    //           'onMenuShareTimeline',
    //           'onMenuShareQQ'
    //         ]
    //       });
    //       wx.ready(() => {
    //         //移动端分享
    //         wx.updateAppMessageShareData({
    //           title,
    //           desc,
    //           link: window.location.href,
    //           imgUrl: img,
    //         });
    //         wx.updateTimelineShareData({
    //           title,
    //           link: window.location.href,
    //           imgUrl: img,
    //         });
    //         //电脑端分享
    //         wx.onMenuShareWeibo({
    //           title,
    //           desc,
    //           link: window.location.href,
    //           imgUrl: img,
    //         });
    //         wx.onMenuShareAppMessage({
    //           title,
    //           desc,
    //           link: window.location.href,
    //           imgUrl: img,
    //         });
    //         wx.onMenuShareTimeline({
    //           title,
    //           desc,
    //           link: window.location.href,
    //           imgUrl: img,
    //         });
    //         wx.onMenuShareQQ({
    //           title,
    //           desc,
    //           link: window.location.href,
    //           imgUrl: img,
    //         })
    //       });
        
    //   })
    // },

    judgeIsLogin(){

      if(this.$route.path.includes('/login')||this.$route.path.includes('/mine')||this.$route.path.includes('/regist')||this.$route.path.includes('/forgotPwd')){
        return ;
      }
      if(!!localStorage.code&&!!!localStorage.access_token){
        this.getAccessToken({
          client_id:this.client_id,
          code:localStorage.code,
          client_secret:this.client_secret
        })
        .then(token=>{
          this.updateToken(token)
        })
        .catch(()=>{
          this.updateToken('')
          localStorage.removeItem('code');
          localStorage.removeItem('access_token');
        })
      }
  },
  
}
}

</script>

<style lang="stylus">
.slide-bar-linear
  background:linear-gradient(180deg,rgba(28,113,183,1) 0%,rgba(255,255,255,1) 100%);
.zezhao-footer
  background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
.add-shadow
  box-shadow:0px 0px 20px 0px rgba(28,113,183,0.3);
</style>
