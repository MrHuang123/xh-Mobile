<template>
    <div class="p-b-120">
        <transition name='down'>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
          <tokenModal ref='tokenModal' @submitSucess='tokenSubmit'/>
    </div>
</template>
<script>
import {mapActions,mapMutations} from 'vuex'
import tokenModal from '@/tokenModal/tokenModal.vue'
import { checkCode ,checkRedis} from "../../../request/axios.account.js";
export default {
  components:{tokenModal},
  data(){
    return {
      token :'',
    }
  },
  mounted(){
    if(this.$route.params.id != undefined){
        this.isTokenModal().then(res=>{
            this.requesetGetCompanyDetail(this.$route.params.id)
        })
    }
  },
  methods:{
    ...mapActions('enterDetail',['requesetGetCompanyDetail']),
    //图形验证码成功
    tokenSubmit(obj){
      this.requesetGetCompanyDetail(this.$route.params.id)
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
  }
}
</script>
