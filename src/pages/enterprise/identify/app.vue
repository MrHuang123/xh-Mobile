<template>
  <!-- 企业认证 -->
  <div class='p-t-100 f-column' :style='{height:height+"px"}'>
    <xHeader slot='header' title='Enterprise Certification' />
    <article slot='main ' class='f-1 f-column'>
      <header v-if='!$route.path.includes("name")&&!$route.path.includes("code")' class='h-170 shadow-identify p-l-80 p-r-100 p-t-50 f-c'>
        <van-steps  :active='step'  class='f-1 '>
          <van-step v-for='(item,index) in steps' :key='index' >
            <div :class='step==index?"c-333":"c-999"' class='f-column f-c p-a translateY-per-100-reverse-center w-180 f-s-20' style='margin-top:-10px' >
              <span v-for='(unit,$i) in item.titles' :key='$i' class='f-s-20'>{{unit}}</span>
              <!-- <span class='f-s-20'>enterprise</span> -->
            </div>
          </van-step>
        </van-steps>
      </header>
      <main class='p-lr-30 f-1 f-column'>
        <!-- <keep-alive include="step0"> -->
          <transition :name='$route.path.includes("step")?"down":" "'>
            <keep-alive exclude="identifyHome">
                <router-view class='f-1'></router-view>
            </keep-alive>
          </transition>
      </main>
    </article>
    <!-- <div slot='footer' class="p-r f-c f-1 h-90 bg-linear-header b-r-45" >
      <span class="c-fff">Got it</span>
    </div> -->
    <tokenModal ref='tokenModal' @submitSucess='tokenSubmit'/>
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
import xHeader from '@/layout/header'
import { Step, Steps } from 'vant';
import { checkCode ,checkRedis} from "../../../request/axios.account.js";
import { checkAuthority} from "../../../request/axios.checkAuthority";
import tokenModal from '@/tokenModal/tokenModal.vue'

Vue.use(Step).use(Steps);

export default {
  components:{xHeader,tokenModal},
  data(){
    return{
      steps:[
        {titles:['Search','Enterprise']},
        {titles:['Business','License']},
        {titles:['Business','Account No.']},
        // {titles:['Submit for','Examination']},
      ],
      name:'down'
    }
  },
  computed:{
    ...mapState(['height','lan']),
    ...mapState('enterIdentify',['step']),
    ...mapGetters('enterDetail',['company']),


  },
  mounted(){
      // this._loading()

      this.changeKey({step:Number(this.$route.path.slice(-1))});
      
      this.clearDetail();

      this.requestBanks();
      this.requestProvinces();
      this.requestCitys();
      
      // this.step>0 && this.updateCompanyInfo()
      if(this.step>0 && (!!!this.company.companyName||from.path==='/enterprise/identify/step0')){
        this.isTokenModal().then(()=>{
          this.updateCompanyInfo()
        })
      }
  },
  watch:{
    $route(to,from){
      this.changeKey({step:Number(to.path.slice(-1))});
      //this.step>0 && (!!!this.company.companyName||from.path==='/enterprise/identify/step0') && this.updateCompanyInfo()
      if(this.step>0 && (!!!this.company.companyName||from.path==='/enterprise/identify/step0')){
        this.isTokenModal().then(()=>{
          this.updateCompanyInfo()
        })
      }
    }
  },
  methods:{
    ...mapMutations('enterIdentify',['changeKey','changeIdentify']),
    ...mapMutations('enterDetail',['clearDetail']),
    ...mapActions('enterDetail',['requesetGetCompanyDetail']),
    ...mapActions(['requestBanks','requestProvinces','requestCitys']),
    //图形验证码成功
    tokenSubmit(obj){
      this.updateCompanyInfo()
    },
    //打开图形验证码
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
                  code:result+"list"
                }).then(res=>{
                  if(res.code == 200){
                    resolve()
                  }else{
                    that.showTokenModal()
                  }
                    // return that.isState
                })
              });
            }else{
              that.token = value
              checkRedis({
                  code:value+"list"
                }).then(res=>{
                  if(res.code == 200){
                    that.isState = true;
                    resolve()
                  }else{
                    that.showTokenModal()
                  }
                    // return that.isState
                })
            }
        });
      })
    },
    updateCompanyInfo(){
      this._loading()
      this.requesetGetCompanyDetail(this.$route.params.id)
      .then(res=>{
        this.changeIdentify({
          addressEn:res.data.en.eci.company.address,
          addressCn:res.data.zh.eci.company.address,
          bankAccountName:'',
          bankName:'',
          bankNo:'',
          certificationImg:'',
          companyId:this.$route.params.id,
          companyNameCn:res.data.zh.eci.company.companyName,
          companyNameEn:res.data.en.eci.company.companyName,
          corporateAccount:'',
          creditCode:res.data[this.lan].eci.company.creditCode,
          // email:res.data[this.lan].eci.companyAttribute?res.data[this.lan].eci.companyAttribute.email:'',
          operName:res.data[this.lan].eci.company.operName,
          // uid:'',
          // website:res.data[this.lan].eci.companyAttribute.webSite?res.data[this.lan].eci.companyAttribute.webSite:'',
          // industry:res.data[this.lan].eci.industry.industry,
          registCapi:res.data[this.lan].eci.company.registCapi

        })
      })
    }
  }  
}
</script>
<style lang="stylus">
.shadow-identify
  box-shadow:0px 4px 8px 0px rgba(0,0,0,0.1);


</style>
