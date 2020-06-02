<template>
  <div v-show='isBrand!=="hello"' class="nationalBrand p-b-220 " :style='{background:isBrand?"#FFECEF":"#E8F4FF"}'>
    <!-- 入驻证书部分 -->
    <div class="p-t-30 p-lr-30 p-b-50 " :class="isBrand?'bg-brand':'bg-other'">
      <h3 class="d-f justify-b">
        <Icon @click='$router.back()' type='icon-left' class="f-s-30 c-fff" />
        <img v-if='isBrand' src="../../image/icon/icon_brand.png" alt="" class="w-285 h-188">
        <span v-else class="c-fff f-w-600">Xinhua Credit</span>
        <span class="w-32"></span>
      </h3>
      <dl class="m-t-40">
        <dt class="f-s-64 c-fff f-w-700 t-c l-h-88">Congratulations!</dt>
        <dd class="f-s-28 c-fff t-c l-h-40 m-t-10 f-w-600">{{company.companyName}}</dd>
      </dl>
      <dl class="m-t-25 f-column f-c">
          <div class="w-320 h-120 b-r-20  p-t-16" :class='isBrand?"Brand-bg":"notBrand-bg"'>
              <p class="w-per-100 t-c f-w-600 f-f-PingFangSC-Semibold f-s-36">{{authenticDateNumber}} <span class="m-l-4">days</span></p>
              <p class="w-per-100 t-c f-s-24 f-f-PingFangSC-Regular l-h-34 txt">in Xinhua Credit</p>
          </div>
        <!-- <dt class="f-c h-120 p-lr-70  b-r-10" :class='isBrand?"bg-color-FF5144":"bg-color-38ADFF"'><span class="f-s-60 c-fff f-w-600">{{authenticDateNumber}}</span></dt>
        <dd class="m-t-15 f-s-28 c-fff-70 l-h-40">days in Xinhua Credit</dd> -->
      </dl>
      <section class="f-c m-t-30" style='minHeight:462px;'>
        <img class="w-650" :src="shareImg" alt="">
      </section>
    </div>
    <!-- 企业评价部分 -->
    <div >
      <section v-if='!!video' class="h-450 w-per-100 m-b-30 p-r">
        <video
          class='w-per-100 h-per-100'
          :src="video"
          controls
        ></video>
      </section>
      <section class="p-l-30 o-h m-b-40">
          <swiper
            :options="swiperOption"
          >
            <swiper-slide
              v-for="(v,i) in imgList"
              :key="i"
              class='bg-color-1C71B7 m-r-16 w-200 h-150 b-r-4 o-h'
            >
              <img
                :src="v"
                class='w-per-100 h-per-100 d-b'
                @click='previewImg(i)'
              />
            </swiper-slide>
          </swiper>
      </section>
      <section class= "m-lr-30 p-lr-30  sectionBorder bg-color-fff">

          <div class=" p-tb-40">
            <div class="f-b m-b-16">
              <router-link
                :to='`/credit/${$route.params.id}/enter/home`'
                class="w-495 f-s-36 h-100 l-h-50 f-f-PingFangSC-Semibold f-w-600 txt"
              >{{company.companyName}}</router-link>
              <div class="h-96 w-96 bg"></div>
            </div>
           
          </div>


          <div class=" p-tb-40 border">
            <p class="f-b h-30 l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Unified Social Credit Code</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular c-666">
                {{creditCode}}
              </span>
            </p>
            <p class="f-b h-30 l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Company Offcial Website</span>
              <a :href='website' class="f-s-24 f-w-400 f-f-PingFangSC-Regular c-blue b-blue b-no-lr b-no-t">
                {{website}}
              </a>
            </p>
            <p class="f-b h-30 l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Registered Capital</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular c-666">
                {{company.rawRegistCapi}}
              </span>
            </p>
          </div>
          <div class="p-tb-40">
            <p class="f-b-c h-32 l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Legal Representative</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular c-666">
                {{company.operName}}
              </span>
            </p>
            <p class="f-b-c  l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Date of Establishment</span>
              <span  class=" f-s-24 f-w-400 c-666">{{company.startDate}}</span>
            </p>

            <!--  -->
            <p class="f-b-c  l-h-34 m-b-24 ">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold ">Contact Information</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular c-666 ">{{phoneNumber}}</span>
            </p>
          </div>
      </section>
      <ul class='p-lr-30 m-lr-30'>
        <li v-for='(item,index) in graphs' :key='index' class="p-t-40">
          <h3 class="f-s-c"><i class="w-12 h-12 b-r-circle bg-color-1C71B7"></i><span class="f-w-600 f-s-24 m-l-16 l-h-34">{{item.title}}</span></h3>
          <div class="m-t-8 l-h-34 f-s-24 c-999">{{item.content}}</div>
        </li>
      </ul>
      <!-- <section class="m-lr-30 m-t-30">
        <div class="p-lr-32">
          <p class='t-c m-b-0 f-s-36 l-h-50  f-f-PingFangSC-Semibold f-w-600 p-b-10 b-666 b-no-lrt m-b-20'>Non-financial Evaluation Model</p>
          <p
            class="f-s-c l-h-40 h-40 f-s-28 f-w-600 f-f-PingFangSC-Semibold c-0089D1 m-b-24 circle "
          >Evaluation Grade:{{qualratingnm}}</p>
          <div class="h-412" v-if='isShowEvaluation'>
            <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
          </div>
          <p v-else class='c-333 f-w-400 f-s-24 m-t-24 m-b-32'>No Evaluation Data</p>
        </div>
        <div class="p-lr-32 m-b-32" >
          <p
            class="l-h-40 h-40 f-s-28 f-w-600 f-f-PingFangSC-Semibold c-0089D1 m-b-24 f-s-c  circle"
          >Evaluation Conclusion</p>
          <p
            v-if='!!desc'
            class="c-333 f-w-400 f-s-24 l-h-34"
            v-html='desc'
          ></p>
          <p  v-else class="c-333 f-w-400 f-s-24 l-h-34">No Evaluation Data</p>
        </div>
      </section> -->
      <p @click='jumpToIdentify' to='/enterprise/identify/step0' tag='div' class="m-t-40 w-650 h-88 b-r-44 m-a bg-linear-header p-r">
        <span class="p-a-c w-per-100 t-c f-s-36 c-fff">Immediately Settled</span>
      </p>
    </div>
    <tokenModal ref='tokenModal' @submitSucess='submitSucess'/>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { requestGetyNationalBrandInfo } from "*/request/axios.credit";
import { ImagePreview } from 'vant'
import { getShareEnterpriseDetail,getCertShareImg,requesetGetCompanyDetail ,requestGetGrade} from '*/request/axios.credit'
import { getUserCenterUserInfo } from '*/request/axios.userCenter.js'
import { requestGetMyCompanyList } from '*/request/axios.enterprise.js'
import { getCompanyInfo,getAtrribute } from '*/request/axios.company'
import {checkRedis} from "../../request/axios.account.js";
import tokenModal from '@/tokenModal/tokenModal.vue'
Vue.use(ImagePreview)

export default {
  components: { swiper,swiperSlide ,tokenModal},
  data() {
    return {
      isBrand:'',
      imgList: [], //图片
      video: "", //视频
      company:{},//企业基本信息
      // website:'',//企业网站
      // capital:'',//注册资金
      companyAttribue:{},
      authenticDateNumber:'',
      shareImg:'',
      website:'',
      phoneNumber:'',
      creditCode:'',
      token:'',//
      gradeList:[
        {
            grade:'R1',
            value:'0.03%',
            detail:"The best credit grade represents the best credit quality."
        },
        {
            grade:'R2',
            value:'0.10%',
            detail:"Sub-optimal grade represents almost the best credit quality."
        },
        {
            grade:'R3',
            value:'0.21%',
            detail:"Very strong solvent."
        },
          {
            grade:'R4',
            value:'0.37%',
            detail:"Strong solvent."
        },
          {
            grade:'R5',
            value:'0.66%',
            detail:"Relatively good solvent and hardly susceptible to minor changes in external environment."
        },
        {
            grade:'R6',
            value:'1.07%',
            detail:"Generally solvent and susceptible to minor changes in external environment."
        },
        {
            grade:'R7',
            value:'1.53%',
            detail:"Generally solvent and susceptible to changes in external environment."
        },
        {
            grade:'R8',
            value:'2.16%',
            detail:"Reluctantly solvent but exposed to risks caused by changes in external environment."
        },
        {
            grade:'R9',
            value:'3.10%',
            detail:"Reluctantly solvent but unfavorable business, financial or economic environment may undermine the debtor's ability or will to some extent."
        },
        {
            grade:'R10',
            value:'4.30%',
            detail:"Reluctantly solvent but unfavorable business, financial or economic environment may undermine the debtor's ability or will."
        },
        {
            grade:'R11',
            value:'5.66%',
            detail:"Reluctantly solvent but unfavorable business, financial or economic environment may undermine the debtor's ability or will soon."
        },
          {
            grade:'R12',
            value:'7.16%',
            detail:"When credit quality is very poor, it is difficult to repay corresponding debt, and solvency depends on a stable business, financial or economic environment."
        },
        {
            grade:'R13',
            value:'8.94%',
            detail:"When credit quality is very poor, it is probably difficult to repay corresponding debt, and solvency depends on a good business, financial or economic environment."
        },
          {
            grade:'R14',
            value:'31.62%',
            detail:"When credit quality is very poor, it is very difficult to repay corresponding debt, and solvency highly depends on a good business, financial or economic environment."
        },
          {
            grade:'R15',
            value:'100.00%',
            detail:"Default."
        },
      ],
    };
  },
  computed: {
    ...mapState(["lan",'access_token']),
    // website(){
    //   if(!!!this.companyAttribue.webSite) return '';
    //   return this.companyAttribue.webSite.includes('http')?this.companyAttribue.webSite:`http://${this.companyAttribue.webSite}`
    // },
    swiperOption() {
      return {
          slidesPerView: 3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
    },
    graphs(){
      return [
        {
          title:'Type of Company',
          content:this.company.econKind
        },
        {
          title:'Registered Address',
          content:this.company.address
        },
        {
          title:'business Scope',
          content:this.company.scope
        }
      ]
    },
  },
  mounted() {
    if(this.$route.query.companyName){
      this.setWxShare({wxShareTitle:`[Settle-in Sharing] ${this.$route.query.companyName}`})
    }
    this._loading();
    this.getEnterpriseDetail()
    !!localStorage.access_token&&this.getUserCenterUserInfo()
  },
  methods: {
    ...mapActions("userCenter", [ "getUserCenterUserInfo"]),
    submitSucess(obj){
      this.gteCompanyData()
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
    async jumpToIdentify(){
      if(!!localStorage.access_token){
        // const isIdentifySelef = await getUserCenterUserInfo().then(res=>res.data.userState==1).catch(()=>false)

        // const isIdentifyCompany = await requestGetMyCompanyList().then(res=>res.data.total>0).catch(()=>false)

        // console.log(isIdentifySelef,isIdentifyCompany)

        // this.$router.push(isIdentifySelef&&isIdentifyCompany?"/enterprise/home":isIdentifySelef&&!isIdentifyCompany?'/enterprise/identify/step0':'/userCenter/certification')
        this.$router.push('/enterprise/home')

      }else{
        this.$router.push('/login')
      }
    },
    gteCompanyData(){
      const companyId = this.$route.params.id;
      getCompanyInfo(
        companyId
      )
      .then(res=>{
        this.company = res.data[this.lan].eci.company;
        const companyNameZh = res.data.zh.eci.company.companyName||''
        this.creditCode = res.data.zh.eci.company.creditCode;
        // this.updateWxShareTitle({wxShareTitle:`[Settle-in Sharing] ${this.company.companyName}`})
        !!this.company.companyName&&this.setWxShare({wxShareTitle:`[Settle-in Sharing] ${this.company.companyName}`})
        // requestGetGrade({
        //    name:companyNameZh
        // }).then(res_1=>{
        //   console.log(res_1)
        // })
      })

      getAtrribute(companyId)
        .then(res=>{
          this.companyAttribue = res.data[this.lan].eci.companyAttribute;
          this.website = !!res.data.zh.eci.companyAttribute&&!!res.data.zh.eci.companyAttribute.webSite?res.data.zh.eci.companyAttribute.webSite.includes('http')?res.data.zh.eci.companyAttribute.webSite:`http://${res.data.zh.eci.companyAttribute.webSite}`:''
          this.phoneNumber= !!res.data.zh.eci.companyAttribute&&res.data.zh.eci.companyAttribute.phoneNumber?res.data.zh.eci.companyAttribute.phoneNumber:'';
        })
    },
    async getEnterpriseDetail() {
  
      const companyId = this.$route.params.id;
      
      this.shareImg = `${window.config.api}/tAuthentic/authenticShareImg?companyId=${companyId}`;

      
      this.isTokenModal().then(res=>{
        this.gteCompanyData()
      })



      await getShareEnterpriseDetail({
        companyId
      })
      .then(res=>{
        if(res.code == 200){
          this.video = res.data.allVideo?res.data.allVideo[0]:'';
          this.imgList = res.data.allImg;
          this.authenticDateNumber = res.data.authenticDateNumber;
          this.isBrand = res.data.checkBrand>0;
        }
      });

      this._clear()

    },
    previewImg(index){
      ImagePreview({
          images: this.imgList,
          startPosition: index,
      })
    }
  }
};
</script>
<style lang="stylus">
.nationalBrand {
  .bg {
    background: url('../../image/userCenter/nationImg.png') no-repeat;
    background-size: 100% 100%;
  }
  .Brand-bg{
    background:linear-gradient(90deg,rgba(204,47,49,1) 0%,rgba(236,107,46,1) 100%);
    color:rgba(255,255,255,1);
    .txt{
      color:rgba(255,255,255,.6);
    }
  }
  .notBrand-bg{
    background:linear-gradient(90deg,rgba(40,172,242,1) 0%,rgba(54,219,227,1) 100%);
    color:rgba(255,255,255,1);
    .txt{
      color:rgba(255,255,255,.6);
    }
  }
  .sectionBorder {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    border: 2px solid rgba(246, 246, 246, 1);
  }

  // .certifiedBg {
  //   background: url('../../image/userCenter/certified.png') no-repeat;
  //   background-size: 100% 100%;
  // }

  .txt {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .circle:before{
     content: '';
      margin-right : 14px;
      display: table;
      width: 12px;
      height: 12px;
      background: #1C71B7;
      border-radius: 50%;
  }
  .border {
    border-bottom: 2px solid #F6F6F6;
    border-top: 2px solid #F6F6F6;
  }
}
.bg-other
  background url('../../image/bg/bg_share_other.png') no-repeat 0 0 #288ee9
  background-size 750px 1277px
.bg-brand
  background url('../../image/bg/bg_share_brand.png') no-repeat 0 0 #aa1f23
  background-size 750px 1427px
</style>
