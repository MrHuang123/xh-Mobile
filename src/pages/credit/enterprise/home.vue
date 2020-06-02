<template>
  <div class='p-30 p-t-130 '>
      <van-notice-bar
        :speed='40'
        class="p-f pos-t-100 pos-l-0 w-per-100 h-88 p-lr-30"
        color="#1C71B7"
        background="#e7eef7"
        left-icon="warning-o c-1C71B7 m-lr-10 f-s-32 f-w-600"
      >
        <template slot='default'>
          Part of the following information is from machine translation, for reference only, not as a legal basis.
        </template>
      </van-notice-bar>
      <!-- 企业信息 -->
      <section>
        <div class="d-f">
          <h3 class="f-s-36 f-w-600 c-333">{{company.companyName}}</h3>
          <Icon @click='toggleFocus' class='m-t-5 m-l-20 c-ddd  f-s-34 ease-300 scale-80-active' :type='isFocus ? "icon-like" : "icon-dislike"' :class='{"c-red":isFocus}' />
        </div>
        <div class="m-t-15">
          <p class="h-30 f-s-22 c-999">Unified Social Credit Code: {{company.creditCode}}</p>
          <p class="h-30 f-s-22 c-999">Legal Representative: {{company.operName}}</p>
        </div>
        <div class="m-t-25 d-f h-40 ">
          <router-link to='grades' tag='p' class="bg-color-FFBB47-1 h-40  b-r-20 f-b-c p-r-25">
            <img src="../../../image/icon/icon_stars.png" class='h-40 w-40 ' />
            <span class="c-FFBB47 f-s-24 p-lr-10">Credit Rating：{{qualratingnmNum}}</span>
          </router-link>
          <p v-if='isCertificated' class="bg-color-32BA59-1 w-180 m-l-15 b-r-20  f-b-c p-r-15">
            <Icon class="c-32BA59 f-s-42" type='icon-ok' />
            <span class="c-32BA59 f-s-24">Certified</span>
            
          </p>
          <p v-else class="bg-ccc w-180  m-l-15 b-r-20  f-c ">
            <span  class="f-s-24 c-fff" >
             Not Settled
            </span>
          </p>
          <img v-if='isBrand' src='../../../image/icon/icon_brand_label.png' class="h-40 w-40 m-l-15" />
        </div>
        <div class="m-t-30 p-lr-25 p-tb-30 bg-fff shadow-app b-app b-r-8">
          <section class="f-s-c">
             <Icon class="f-s-30 c-999 m-r-25 m-t-2" type='icon-email' />
             <p class="f-s-22 c-999">{{eci.companyAttribute.email}}</p>
          </section>
          <section class="f-s-c m-t-15">
             <Icon class="f-s-30 c-999 m-r-25 m-t-2" type='icon-earth' />
             <p class="f-s-22 c-999">{{eci.companyAttribute.webSite}}</p>
          </section>
          <section class="d-f m-t-15">
             <Icon class="f-s-30 c-999 m-r-25 m-t-4" type='icon-position' />
             <p class="f-s-22 c-999">{{company.address}}</p>
          </section>
        </div>  

      </section>
      <!-- 企业模块入口 -->
      <section class="">
         <ul class="f-b-c m-t-30">
           <li  v-for='(item,index) in tabs' @click="goNext(item.path)" :to='item.path' tag='li' :style='{display:index<3?"flex":"none!important"}' :key='index' class="scale-80-active h-220 w-208 b-app b-r-8 shadow-app p-t-40 p-lr-5 f-column f-s-c">
             <img :src="item.icon" class='h-72' />
             <p class="f-1 f-c p-b-5"><span class="t-c f-s-24 f-w-600 break-word"> {{item.label}}</span></p>
           </li>
         </ul>
         <ul class="f-b-c m-t-30">
           <li v-for='(item,index) in tabs' @click="goNext(item.path)" :to='item.path' tag='li' :style='{display:index>=3&&index<6?"flex":"none!important"}' :key='index' class="scale-80-active h-220 w-208 b-app b-r-8 shadow-app p-t-40 p-lr-5 f-column f-s-c">
             <img :src="item.icon" class='h-72' />
             <p class="f-1 f-c p-b-5"><span class="t-c f-s-24 f-w-600 break-word"> {{item.label}}</span></p>
           </li>
         </ul>
         <ul class="f-b-c m-t-30">
           <li  @click='goNext(tabs[6].path)'  class="scale-80-active h-220 w-208 b-app b-r-8 shadow-app p-t-40 p-lr-5 f-column f-s-c">
             <img :src="tabs[6].icon" class='h-72' />
             <p class="f-1 f-c p-b-5"><span class="t-c f-s-24 f-w-600 break-word"> {{tabs[6].label}}</span></p>
           </li>
           <vEntry :id='$route.params.id' :source='1' class="scale-80-active h-220 w-208 b-app b-r-8 shadow-app p-t-40 p-lr-5 f-column f-s-c">
             <img :src="tabs[7].icon" class='h-72' />
             <p class="f-1 f-c p-b-5"><span class="t-c f-s-24 f-w-600 break-word"> {{tabs[7].label}}</span></p>
           </vEntry>
           <li v-if='tabs.length>=9' @click='jumpRoute(tabs[8].path)'  class="scale-80-active h-220 w-208 b-app b-r-8 shadow-app p-t-40 p-lr-5 f-column f-s-c">
             <img :src="tabs[8].icon" class='h-72' />
             <p class="f-1 f-c p-b-5"><span class="t-c f-s-24 f-w-600 break-word"> {{tabs[8].label}}</span></p>
           </li>
           <li v-else class="h-220 w-208"></li>
         </ul>
      </section>
      <tokenModal ref='tokenModal' @submitSucess='submitSucess_1'/>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'
import {requestToggleFocus,requestIsFocusCompany,getUserIsCert} from '../../../request/axios.userCenter'
import {requestFindCompanyCertificationRecord} from '../../../request/axios.credit'
import {getUserCenterUserInfo} from '*/request/axios.userCenter'
import { NoticeBar } from 'vant';
import vEntry from '@/entry/index.vue'
import { checkAuthority} from "*/request/axios.checkAuthority";
import {checkRedis} from "../../../request/axios.account.js";
import tokenModal from '@/tokenModal/tokenModal.vue'
Vue.use(NoticeBar);

export default {
  components:{vEntry,tokenModal},
  data(){
    return {
      isFocus:false,
      isCertificated:false,
      isCertificatedPerson:false,
      token:'',//防爬token
    }
  },
  computed:{
    ...mapState(['access_token']),
    ...mapState('userCenter',['ucenterUserInfo']),
    ...mapState('creditEnterprise',['eci','isBrand']),
    ...mapGetters('creditInfo',['qualratingnmNum']),
    company(){
      return this.eci.company
    },
    tabs(){
      const tabs = [
        // 基本信息
        {path:'base',icon:require('../../../image/icon/icon_file.png'),label:'Basic Information'},
        // 知識產權
        {path:'intellectual',icon:require('../../../image/icon/icon_property.png'),label:'IPR Information'},
        // 司法信息
        {path:'judicial',icon:require('../../../image/icon/icon_info.png'),label:'Justice Information'},
        // 經營狀況
        {path:'operate',icon:require('../../../image/icon/icon_condition.png'),label:'State of Operation'},
        // 經營風險
        {path:'hazard',icon:require('../../../image/icon/icon_risk.png'),label:'Operation Risk'},
        // 風采展示
        {path:'mien',icon:require('../../../image/icon/icon_honorary.png'),label:'Enterprise Style'},
        // 信用評級*暂时只显示一部分
        // {path:'comment',icon:require('../../../image/icon/icon_evaluation.png'),label:'Credit evaluation'},
        {path:'comment/grade',icon:require('../../../image/icon/icon_evaluation.png'),label:'Credit Evaluation'},
        // 企業互動
        {path:'/action/concat',icon:require('../../../image/notificationCenter/iconTop.png'),label:'Enterprise Interaction'},
        // 分享入口
        
      ]
      return this.isCertificated ? [...tabs,{path:`/share/${this.$route.params.id}`,icon:require('../../../image/icon/icon_share.png'),label:'Certification Sharing'},] : tabs;
    }
  },
  async mounted(){
    !!localStorage.access_token&&this.getUserCenterUserInfo()
    !!localStorage.access_token&&this.requestIsFocusCompany();
    this.requestFindCompanyCertificationRecord()
    
  },
  methods:{
    ...mapActions("userCenter", ["getUserCenterUserInfo"]),
    goNext(path){
      this.isTokenModal().then(res=>{
        this.checkAuthority(path).then(res=>{
          this.$router.push(path)
        })
      })
    },
    submitSucess_1(obj){
      // this.getCompanyDetail();
    },
    showTokenModal(){
      this.$refs.tokenModal.code  = ''
      this.$refs.tokenModal.token  = this.token
      this.$refs.tokenModal.show  = true
      this.$refs.tokenModal.getUdid()
    },
     //判断是否有token
    isTokenModal(){
      var that = this
      var ec = new evercookie();
      return new Promise((resolve, reject)=>{
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
                that.token = result
                checkRedis({
                  code:result+"detail"
                }).then(res=>{
                  if(res.code == 200){
                    that.isState = true;
                    resolve()
                  }else{
                    that.showTokenModal()
                    that.isState = false;
                  }
                    // return that.isState
                })
              });
            }else{
              that.token = value
              checkRedis({
                  code:value+"detail"
                }).then(res=>{
                  if(res.code == 200){
                    that.isState = true;
                    resolve()
                  }else{
                    that.showTokenModal()
                    that.isState = false;
                  }
                    // return that.isState
                })
            }
        });
      })
    },
     //判断是否有权限访问
    checkAuthority(path){
        var moduleName = ''
        switch(path) {
            case 'base':
                moduleName = 'basidInformation'
                break;
            case 'intellectual':
                moduleName = 'iprInformation'
                break;
            case 'judicial':
                moduleName = 'justiceInformation'
                break;
            case 'operate':
                moduleName = 'stateOfOperation'
                break;
            case 'hazard':
                moduleName = 'operationRisk'
                break;
            case 'comment/grade':
              moduleName = 'creditScoringModel'
              break;
            // case 'mien':
            //   moduleName = 'csss'
            //   break;
            default:
                break;
        } 
        return new Promise((resolve, reject)=>{
            if(!!moduleName){
              checkAuthority({
                  moduleName:moduleName,
                  number:0,
                  userName:this.ucenterUserInfo.username?this.ucenterUserInfo.username:'',
                  // token:token
              }).then(res=>{
                  if(res.code == 200){
                      resolve()
                  }
              }).catch(err=>{
                  console.log(err)
                  if(!!err&&!!err.code&&err.code == 81000199){
                  this.$dialog.alert({
                      message:`<p class="c-666 t-c">Content access is limited. Please contact us for more privilege.</p><p class="c-333 t-c">Hotline：（86）010-88052705</p>`,
                      confirmButtonText:'OK'
                    }).then(() => {
                      // if(localStorage.access_token){
                        
                      // }else{
                      //   setTimeout(()=>{
                      //     location.href='/login'
                      //   },500)
                      // }
                        
                    });
                  }
              })
            }else{
              resolve()
            }
        })
    },
    // 获取企业是否被关注
    requestIsFocusCompany(){
      if(!!!localStorage.access_token){
        this.isFocus = false;
        return false;
      }
      requestIsFocusCompany({
        companyId:this.$route.params.id,
        source:1,//关注来源：英文版1 国际版2
      })
      .then(res=>{
        this.isFocus = !res.msg.includes('未');
        
      })
    },

    requestFindCompanyCertificationRecord(){
      requestFindCompanyCertificationRecord({
        companyId:this.$route.params.id
      })
      .then(res=>{
        this.isCertificated = res.data ;
        // this.isCertificated = true;
      })

    },
    
    // 关注、取消
    toggleFocus(){
      if(!!!localStorage.access_token){
        this._toast('Please login')
        this.$router.push('/login')
        return false;
      }
      requestToggleFocus({
        companyId:this.$route.params.id,
        source:1,//关注来源：英文版1 国际版2
      })
      .then(()=>{
        this.requestIsFocusCompany()
      })
    },
    async jumpRoute(path){
      
      this.isTokenModal().then(res=>{
          if(path.includes('/share')){
            location.href=`${window.location.origin}${path}`
            // console.log(location.href)
            // var ec = new evercookie();

            this.$router.push({
              path:path,
              query:{
                companyName:this.company.companyName
              }
            })
            return
          }
          if(path==='/action/concat'){
            this.$router.push(`${path}/${this.$route.params.id}`);
            return ;
          }
          this.$router.push(path)
      })
    }
  }
}
</script>
<style lang="stylus">
// .van-notice-bar
//   padding 0 30px!important
//   i
//     color #1C71B7
//     font-size 34px
//     font-weight 600
//     margin-right 10px
</style>
