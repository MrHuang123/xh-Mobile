<template>
  <div class="p-enter-home p-t-100 p-b-120">
    <xHeader :title='title'>
      <a :href='`http://m.credit100.com/#/companyInfo?companyId=${$route.params.id}&companyName=${companyNameCN}`' class='d-f f-c h-50 w-60 b-r-4 b-toggle-cn' >
        <span class="f-s-24 c-fff">CN</span>
      </a>
    </xHeader>
    <main class=" bg-fff">
      <!-- <transition :name='name'> -->
        <keep-alive exclude='detailEnter'>
          <router-view></router-view>
        </keep-alive>
      <!-- </transition> -->
    </main>
    <tokenModal ref='tokenModal' @submitSucess='submitSucess'/>
  </div>
</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex'
import xHeader from '@/layout/header'
import {checkRedis} from "../../../request/axios.account.js";
import tokenModal from '@/tokenModal/tokenModal.vue'
import { checkAuthority} from "*/request/axios.checkAuthority";
import {
  // requesetGetCompanyDetail,
  getIsBrand,
  requestGetGrade,
  scorePortrait,
} from '../../../request/axios.credit.js'
import {
  getCompanyInfo,
  getAtrribute,
  getIndustry,
} from '*/request/axios.company.js'

export default {
  components:{xHeader,tokenModal},
  data(){
    return{
      name:'route-100',
      companyNameCN:'',
      token:'',
      companyNameEN:'',
    }
  },
  computed:{
    ...mapState(['lan',"access_token"]),
    ...mapState('creditEnterprise',['title']),
    ...mapState("userCenter", ["ucenterUserInfo"]),
  },
  created(){
    !!localStorage.access_token&&this.getUserCenterUserInfo()
    this.isTokenModal().then(()=>{
      this.checkAuthority().then(()=>{
        this.getCompanyDetail();
        getIsBrand({companyId:this.$route.params.id})
        .then(res=>this.changeKey({isBrand:res.data==1}))
      })
    })
    this.changeTitle();
  },
  beforeDestroy(){
    this.clearDetail()
  },
  watch:{
    $route(to,from){
      this.name = to.path.includes('/enter/detail')||to.path.includes("action")||to.path.includes("actionenter/mien/gallery")||to.path.includes("actionenter/mien/aptitude")?'':'route-100';
      this.changeTitle()
      // !!this.companyNameEN&&this.updateWxShareTitle({wxShareTitle:`[Credit Archives] ${this.companyNameEN}`})
      !!this.companyNameEN&&this.setWxShare({wxShareTitle:`[Credit Archives] ${this.companyNameEN}`})
      this.isTokenModal().then(()=>{
        // this.getCompanyDetail();
      })
    }
  },
  methods:{
    ...mapMutations('creditEnterprise',['changeKey','changeEci','clearDetail']),
    ...mapMutations('creditInfo',{
      changeKeyCreditInfo:'changeKey'
    }),
    ...mapActions("userCenter", ["getUserCenterUserInfo"]),
    //判断是否有权限访问
    checkAuthority(){
       return new Promise((resolve, reject)=>{
          checkAuthority({
            moduleName:'/company_search/g',
            number:0,
            userName:this.ucenterUserInfo.username?this.ucenterUserInfo.username:'',
            // token:token
          }).then(res=>{
              if(res.code == 200){
                 resolve()
              }
          }).catch(err=>{
              if(!!err&&!!err.code&&err.code == 81000199){
               this.$dialog.alert({
                  message:`<p class="c-666 t-c">You have used up the number of queries today. Please contact us for more.</p><p class="c-333 t-c">Hotline：（86）010-88052705</p>`,
                  confirmButtonText:'OK'
                }).then(() => {
                  // if(localStorage.access_token){
                  //   setTimeout(()=>{
                  //     location.href='/'
                  //   },500)
                  // }else{
                  //   setTimeout(()=>{
                  //     location.href='/login'
                  //   },500)
                  // }
                    
                });
              }
          })
       })
    },
    submitSucess(obj){
      this.getCompanyDetail();
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
    //改变标题
    changeTitle(){
      const path = this.$route.path;
          const title = path.includes('/enter/home') ?
                        (this.lan == 'zh' ? '企业首页' : 'Enterprise Details') :
                        path.includes('/enter/base/index') ?
                        (this.lan == 'zh' ? '基本信息' : 'Basic Information') :
                        path.includes('/enter/base/basic') ?
                        (this.lan == 'zh' ? '基本信息' : 'Basic Info') :
                        path.includes('/enter/intellectual') ?
                        (this.lan == 'zh' ? '知识产权' : 'IPR Information') :
                        path.includes('/enter/judicial')?
                        (this.lan == 'zh' ? '司法信息' : 'Justice Information') :
                        path.includes('/enter/operate')?
                        (this.lan == 'zh' ? '经营状况' : 'State of Operation') :
                        path.includes('/enter/hazard')?
                        (this.lan == 'zh' ? '经营风险' : 'Operation Risk') :
                        path.includes('enter/mien/index')?
                        'Enterprise Style':
                        path.includes('enter/mien/base')?
                        'Essential Info':
                        path.includes('enter/mien/aptitude')?
                        'Certificate Information':
                        path.includes('enter/mien/gallery')?
                        'Photo Wall':
                        path.includes('enter/comment/grade')?
                        'Credit Evaluation':
                        path.includes('enter/action')?
                        'Enterprise Interaction':
                        'Detail';
            
          this.changeKey({title});
    },

    // 請求企業信息
    async getCompanyDetail(){

      this._loading();

      const path = this.$route.path ;

      const isClear = path.includes('detail') || path.includes('enter/home')||path.includes('enter/base/basic')||path.includes('detail/partner') 

      Promise.all([
          getCompanyInfo(this.$route.params.id),
          getAtrribute(this.$route.params.id),
          getIndustry(this.$route.params.id)
      ])
      .then(resList=>{
        const [compannyInfo,attribue,industryInfo] = resList ;
        this.companyNameEN = compannyInfo.data.en.eci.company.companyName;
        // !!compannyInfo.data.en.eci.company.companyName&&this.updateWxShareTitle({wxShareTitle:`[Credit Archives] ${compannyInfo.data.en.eci.company.companyName}`})
        !!compannyInfo.data.en.eci.company.companyName&&this.setWxShare({wxShareTitle:`[Credit Archives] ${compannyInfo.data.en.eci.company.companyName}`})
        this.companyNameCN = compannyInfo.data.zh.eci.company.companyName||'';
        this.changeEci({
          company:Object.assign({},compannyInfo.data[this.lan].eci.company,{
            creditCode:compannyInfo.data.zh.eci.company.creditCode||'',
            updatedDate:compannyInfo.data.zh.eci.company.updatedDate||'',

          }),
          companyAttribute:Object.assign({},!!attribue.data[this.lan].eci.companyAttribute?attribue.data[this.lan].eci.companyAttribute:{},{
            webSite:!!attribue.data.zh.eci.companyAttribute&&!!attribue.data.zh.eci.companyAttribute.webSite&&attribue.data.zh.eci.companyAttribute.webSite||'',
            email:!!attribue.data.zh.eci.companyAttribute&&!!attribue.data.zh.eci.companyAttribute.email&&attribue.data.zh.eci.companyAttribute.email||'',
          }),
          industry:!!industryInfo.data[this.lan].eci.industry||''
        });
        this.getGrade(this.companyNameCN);
        this.scorePortrait(this.$route.params.id)
        this.scorePercent(his.$route.params.id)
        isClear && this._clear()

        // (path.includes('enter/home')||path.includes('enter/base/basic')||path.includes('detail/partner')) && this._clear()
      })
      .catch(()=>{
        isClear && this._clear()

        // (path.includes('enter/home')||path.includes('enter/base/basic')) && this._clear()
      })


    },
    scorePercent(companyId){
      scorePercent({
        companyId,
      }).then(res=>{
         if(!!res.data&&!! res.data.data){
           this.changeKeyCreditInfo({
              riskEvaluation:res.data.data
            })
         }
      })
    },
    scorePortrait(companyId){
      scorePortrait({
        companyId,
      }).then(res=>{
        this.changeKeyCreditInfo({
          riskStatus: res.data?res.data.data.riskNum:'',
          currentScore: res.data?res.data.data.companyScore:'',
          differScore: res.data?res.data.data.differScore:''
        })
      })
    },
    // 获取企业信用信息
    getGrade(name){
      requestGetGrade({
        name
      })
      .then(res=>{
        this.changeKeyCreditInfo({
          gradeInfo:res.data,
          
        })
      })
    },
  }
}

</script>
<style lang="stylus">
.b-toggle-cn
  border 1px solid rgba(255,255,255,.4)
.van-notice-bar__wrap
  height 36px!important
.van-notice-bar__play,.van-notice-bar__play--infinite
  font-size 24px
  line-height 36px
  height 36px
</style>
