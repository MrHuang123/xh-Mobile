<template>
  <div class='f-column p-t-100 p-b-120 p-credit-search ' ref='box'  :style='{height:height+"px"}'>
    <xHeader title='Search Results' class="xHeader"/>
    <main class='f-1 f-column'>
      <section class='p-30 p-b-no search-input'>
        <van-search 
          placeholder="Please enter key words" 
          v-model="keyWord"
          shape="round"
          class='bg-transparent'
          id="myInput1"
          v-focusVant
          @clear='keyWord="";enterpriseList=[];resultTotal=0;'
          @search='()=>requestSearchCompany(1)'
        >
          <Icon @click='()=>requestSearchCompany(1)' slot='left-icon' class='c-999' type='icon-search' />
        </van-search>
      </section>
      <section class='w-per-100 h-88 o-x-a p-lr-20 list-container'>
        <ul class='clearfix h-88 o-h' id='keyContainer' :style='{width:width+40+"px"}'>
          <li v-for='(item,index) in filterTypes' @click='cond=item.value;!!keyWord && requestSearchCompany(1);' :key='index' class='h-88 f-c p-r f-l m-r-60'>
            <span>{{item.name}}</span>
            <transition name='fade'>
              <p v-if='cond==item.value' class='p-a-xc-yb w-80 h-4 bg-blue m-b-0'></p>
            </transition>

          </li>
        </ul>
      </section>
      <section class='f-1 f-column'  >
        <h3 class='bg-app h-60 f-s-c p-l-30 '><span class=' f-s-24 c-999'>{{resultTotal}} notices in total</span></h3>
        <van-list
          class='f-1 p-lr-30 w-per-100 o-x-h' 
          :finished="finished"
          :offset='100'
          finished-text=""
          loading-text='loading...'
          @load="page>1 && requestSearchCompany()"
        > 
          <div v-if='enterpriseList.length'>
          <router-link tag='div' v-for='(item,index) in enterpriseList' :to='"/credit/"+item.companyId+"/enter/home"'  :key='index' class='d-f p-t-30'>
            <div class='p-b-30 b-app b-no-lrt f-column f-1 w-per-100'>
                <div class='f-b-c p-l-5 w-per-100 white-1 p-r-20'>
                  <Icon type='icon-enterprise' class='f-s-32 c-blue m-r-20 m-t-2'/>
                  <p class='f-1 white-1 m-r-20 f-w-600 white-1' v-if='condFilter=="all"||condFilter=="companyname"' v-html='labekKeyWord(item.companyName,keyWordText)'></p>
                  <p class='f-1 white-1 m-r-20 f-w-600 white-1' v-else>{{item.companyName}}</p>
                  <!-- <span class='f-s-28 c-999  t-r'>{{item.status}}</span> -->
                </div>
                <div class='f-s-c p-l-5 w-per-100 white-1 m-t-10'>
                  <img v-if='item.nationStatus==1' src='../../image/icon/icon_brand_label.png' class="h-28 w-28 m-r-10">
                  <p class="f-s-c b-ccc p-r-15 b-no-tb b-no-l m-r-15" v-if='item.authStatus==1'>
                    <img src="../../image/icon/icon_settled.png" class="h-28 w-28 m-r-0"><span class="f-s-24 c-32BA59">Certified</span>
                  </p>
                  <!-- <p class='f-1 white-1 m-r-20' v-html='labekKeyWord(item.companyName,keyWord)'></p> -->
                  <span class='f-s-28 c-333  t-r  white-1'>{{item.status}}</span>
                </div>
                <div class='m-t-10  p-l-5 search_txt'>
                  <span class='f-s-24 c-666 l-h-34' v-if='condFilter=="all"||condFilter=="opername"'>Legal Representative: <span v-html='labekKeyWord(item.operName,keyWordText)'></span></span>
                  <span class='f-s-24 c-666 l-h-34' v-else>Legal Representative: <span >{{item.operName}}</span></span>
                </div>
                <div class='m-t-10 f-s-c d-f-w'>
                  <p class='f-s-c m-r-30'>
                    <Icon type='icon-time' class='f-s-32 c-999' />
                    <span class='f-s-24 c-666 '>{{item.startDate|convertDate}}</span>
                  </p>
                  <p class='f-s-c'>
                    <Icon type='icon-cash' class='f-s-32 c-999' />
                    <span class='f-s-24 c-666'>{{item.rawRegistCapi}}</span>
                  </p>
                </div>
                <div class="m-t-10 p-l-5      search_txt" v-if='item.name&&item.name.length>0'>
                  <Icon type='icon-xinhuaxinyongma' class='f-s-24 c-999 ' />
                  <span class='f-s-24 c-666 l-h-34' v-if='condFilter=="all"||condFilter=="name"'>Product of Brand: <span v-html='labekKeyWord(item.name[0],keyWordText)'></span></span>
                  <span class='f-s-24 c-   l-h-34' v-else>Product of Brand: <span >{{item.name[0]}}</span></span>
                </div>
                <div class="m-t-10 p-l-5 search_txt" v-if='item.original_name&&item.original_name.length>0'>
                  <Icon type='icon-zengyongming' class='f-s-24 c-999 ' />
                  <span class='f-s-24 c-666 l-h-34' v-if='condFilter=="all"||condFilter=="original_name"'>Used Name: <span v-html='labekKeyWord(item.original_name.slice(0,3).join(";&nbsp&nbsp"),keyWordText)'></span></span>
                  <span class='f-s-24 c-666 l-h-34' v-else>Used Name: <span v-html='item.original_name.slice(0,3).join(";&nbsp&nbsp")'></span></span>
                </div>
                <div class="m-t-10 p-l-5 search_txt" v-if='(item.employee || item.employee_en)&&(item.employee || item.employee_en).length>0'>
                  <Icon type='icon-gaoguan-shoujiduan' class='f-s-24 c-999 ' />
                  <span class='f-s-24 c-666 l-h-34' v-if='condFilter=="all"||condFilter=="partnerandemployee"'>Senior Officer: <span v-html='labekKeyWord((item.employee|| item.employee_en).slice(0,3).join(";&nbsp&nbsp"),keyWordText)'></span></span>
                  <!-- <span class='f-s-24 c-666 l-h-34' v-else>Senior Officer: <span v-html='(item.employee|| item.employee_en).slice(0,3).join(";&nbsp&nbsp")'></span></span> -->
                </div>
                <div class="m-t-10 p-l-5 search_txt" v-if='(item.partner || item.partner_en)&&(item.partner || item.partner_en).length>0'>
                  <Icon type='icon-gudong-shoujiduan' class='f-s-24 c-999 ' />
                  <span class='f-s-24 c-666 l-h-34' v-if='condFilter=="all"||condFilter=="partnerandemployee"'>Shareholder: <span v-html='labekKeyWord((item.partner || item.partner_en).slice(0,3).join(";&nbsp&nbsp"),keyWordText)'></span></span>
                  <span class='f-s-24 c-666 l-h-34' v-else>Shareholder: <span v-html='(item.partner || item.partner_en).slice(0,3).join(";&nbsp&nbsp")'></span></span>
                </div>
            </div>
          </router-link>
          </div>
          <NoData v-else  />
        </van-list>
      </section>
    </main>
    <tokenModal ref='tokenModal' @submitSucess='tokenSubmit'/>
  </div>
</template>
<script>

import xHeader from '@/layout/header.vue'
import tokenModal from '@/tokenModal/tokenModal.vue'
import {mapMutations,mapState,mapActions} from 'vuex'
import {Search,List} from 'vant'


import {
  requestSearchCompany
} from '../../request/axios.credit.js'
import { checkCode ,checkRedis} from "../../request/axios.account.js";
import { checkAuthority} from "../../request/axios.checkAuthority";
Vue.use(Search).use(List)

export default {
  name:'search',
  components:{xHeader,tokenModal},
  data(){
    return {
      width:400,
      
      keyWord:'',
      keyWordText:'',//高亮匹配
      cond:'All',

      isLoading:false,
      
      resultTotal:0,//結果條數
      page:1,//
      page_size:10,
      
      filterTypes:[
        {name:'All',value:'All'},
        {name:'Enterprise Name',value:'CompanyName'},
        {name:'Legal Representative',value:'OperName'},
        {name:'Shareholder or Senior Officer',value:'PartnerAndEmployee'},
        // {name:'Shareholder or senior officer',value:'PartnerAndEmployee'},
        {name:'Registered Address',value:'Address'},
        // {name:'Brand product',value:'Product'},
        {name:'Business Scope',value:'Scope'},
        {name:'Product of Brand',value:'Name'},
        {name:'Used Name',value:'Original_name'},
        {name:'Unified Social Credit Code',value:'CreditCode'}
      ],
      enterpriseList:[
      
      ],
      isState:false,
      token :'',
    }
  },
  computed:{
    ...mapState(['height',"access_token"]),
    ...mapState("userCenter", ["ucenterUserInfo"]),
    finished(){
      return this.enterpriseList.length%this.page_size > 0;
    },
    condFilter(){
      return this.cond.toLowerCase()
    }
  },
  mounted(){
    !!localStorage.access_token&&this.getUserCenterUserInfo()
    this.calcuateWidth();
    
    localStorage.keyWord && (this.keyWord = localStorage.keyWord) ;

    localStorage.keyWord = '' ;

    this.$nextTick(()=>{
      this.keyWord != "" && this.requestSearchCompany();
    });

    // this.setWxShare('搜索页title测试','搜索页desc测试');

  },
  methods:{
    ...mapActions(['setWxShare']),
    ...mapActions("userCenter", ["getUserCenterUserInfo"]),
    //判断是否有权限访问
    checkAuthority(number){
       return new Promise((resolve, reject)=>{
          checkAuthority({
            moduleName:number==0?'/company_search/q1':'searchListNumber',
            number:number,
            userName:this.ucenterUserInfo.username?this.ucenterUserInfo.username:'',
            // token:token
          }).then(res=>{
              if(res.code == 200){
                 resolve()
              }
          }).catch((err)=>{
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
    //图形验证码成功
    tokenSubmit(obj){
      this.requestSearchCompany(1)
      this.screenHeight = this.height
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
                  code:value+"list"
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
    // 計算寬度
    calcuateWidth(){
      let width = 0;
      !!document.querySelector('#keyContainer')&&document.querySelector('#keyContainer').querySelectorAll('li').forEach(item=>{
        width+=item.offsetWidth+30;
      })
      this.width = width;
    },
    // 查詢企業
    requestSearchCompany(page=this.page){
      
      var that = this
      // if(this.isLoading) return ;

      this.isLoading = true ;

      if(this.keyWord==''){
        this.$notify('Please enter the key words first')
        return ;
      }
      this.isTokenModal().then(()=>{
        const number = page==1?0:this.page*this.page_size
        this.checkAuthority(number).then(res=>{
            this._loading()
            this.keyWordText = this.keyWord
            requestSearchCompany({
              text:encodeURI(this.keyWord),
              cond:this.cond,
              page:page,
              province:'',
              industry:'',
              regist_capi:-1,
              checkdate:-1,
              page_size:this.page_size
            })
            .then(res=>{
              this.enterpriseList = page==1 ? res.data : this.enterpriseList.concat(res.data);
              res.data.length == this.page_size && (this.page+=1);
              this.resultTotal = res.total || 0;
              this.isLoading = false;
            })
            .catch(()=>{
              this.isLoading = false ;
            })
        })
      })
    }
  }  
}
</script>
<style lang='stylus'>
  .p-credit-search
     min-height 100vh!important
     overflow-y: scroll;
     -webkit-overflow-scrolling: touch; //因为使用overflow滚动体验不如正常的页面滚动，加上这个样式以后滚动即会变得顺滑
     .xHeader
       position: absolute!important
       transform: translateZ(0);
      -webkit-transform: translateZ(0);
    .van-search__content--round
      border:2px solid rgba(28,113,183,1);
      border-radius 44px!important
      height 88px
    .van-cell
      border none
    .van-search__content
      background #fff
    .van-icon
      font-size 32px
    .van-search
      padding 0

  .p-credit-search
    .van-field__control
      margin-top: -4px;
      margin-left: 5px;
  .search_txt
    span 
     font-size 24px!important
</style>
