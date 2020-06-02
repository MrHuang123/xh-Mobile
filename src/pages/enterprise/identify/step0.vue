<template>
  <div class='p-t-30 step0 f-column' >
    <header class='search-input'>
      <van-search
        @clear='keyWord=""'
        @search='requestUnverifiedCompany(1)'
        placeholder="Please enter key words" 
        v-model="keyWord" 
        shape="round"
        background='#fff'
        v-focusVant
      >
          <Icon  slot='left-icon' class='c-999' type='icon-search' />
      </van-search>  
    </header>  
    <div class='f-1 p-lr-30 w-per-100 o-x-h f-1'>

    <!-- <van-list
      class='f-1 p-lr-30 w-per-100 o-x-h f-1' 
      :finished="finished"
      :offset='100'
      finished-text=""
      loading-text='loading...'
      @load="page>1 && searchCompany()"
    > -->
      <ul v-if='list.length'>
        <router-link tag='li' v-for='(item,index) in list' :key='index' :to='item.companyId+"/step1"'   class='h-105 f-s-c'>
          <Icon type='icon-enterprise' class='c-1C71B7 m-r-30 f-s-28' />
          <p  class='h-per-100 w-per-100 f-s-c f-s-28 c-333 white-1 b-f6f6f6 b-w-1 b-no-lr b-no-t'>
            <span v-html='labekKeyWord(item.companyName,keyWord)'></span>
          </p>
        </router-link>
      </ul>
      <NoData v-else />
    <!-- </van-list> -->
    <tokenModal ref='tokenModal' @submitSucess='tokenSubmit'/>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {Search,List} from 'vant'
import { requestSearchCompany,requestUnverifiedCompany } from '../../../request/axios.credit'
import { checkCode ,checkRedis} from "../../../request/axios.account.js";
import { checkAuthority} from "../../../request/axios.checkAuthority";
import tokenModal from '@/tokenModal/tokenModal.vue'
Vue.use(Search).use(List)

export default {
  name:'step0',
  components:{tokenModal},
  data(){
    return{
      keyWord:'',
      page:1,
      page_size:10,
      isLoading:false,

      list:[]
    }
  },
  computed:{
    ...mapState(['height']),
    finished(){
      return this.list.length%this.page_size > 0;
    }
  },
  mounted(){
  },
  methods:{
    //图形验证码成功
    tokenSubmit(obj){
      this.requestUnverifiedCompany()
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
    requestUnverifiedCompany(){

      if(this.keyWord.trim() == ''){
        this.$notify('Please enter keyWord')
        document.querySelector('input').focus();
        return ;
      }
      this.isTokenModal().then(()=>{
        this._loading()

        requestUnverifiedCompany({
          text:this.keyWord
        })
        .then(res=>{
          this.list = res.data;
        })
      })
      
    }
  },
  filters:{
    
  }
}
</script>
<style lang="stylus">
.step0
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

</style>
