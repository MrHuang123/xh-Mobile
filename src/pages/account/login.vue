<template>
  <div class="login-box p-b-120" >
    <l-Header></l-Header>
    <vPasswordLogin ref='passwordLogin' v-if="tab === 1" />
    <vVerificationLogin ref='verificationLogin' v-if="tab === 2" />
    <section class="d-f f-c m-b-24 m-t-62 p-l-48 p-r-48 ">
        <p class="f-s-24 _1C71B7" v-if="tab === 2" @click="tabChange(1)">
            Login by password
        </p>
         <p class="f-s-24 _1C71B7" v-if="tab === 1"  @click="tabChange(2)">
            Login by verification code
        </p>
    </section>
    <section class="p-l-48 p-r-48 m-b-24 ">
        <van-button size="large" class="h-88 button"    @click="toLogin">Log In</van-button>
    </section>
    <section class="d-f f-b-c p-l-48 p-r-48 m-b-50">
        <router-link :to="{path : '/regist'}">
            <p class="f-s-24 _1C71B7"  >
                Register
            </p>
        </router-link>
        <router-link :to="{path : '/forgotPwd'}">
           <p class="f-s-24 _1C71B7">
                Forget your password ?
            </p>
        </router-link>
    </section>
  </div>
</template>
<script>
import lHeader from "@/pages/login/header.vue"; //头部
import vVerificationLogin from '@/pages/login/verificationLogin.vue'    //验证码登录
import vPasswordLogin from '@/pages/login/passwordLogin.vue'    //密码登录
import Vue from "vue";
import {mapState,mapActions} from 'vuex';
import { Button, CellGroup, Field ,Icon} from "vant";

Vue.use(Field).use(CellGroup).use(Button).use(Icon);
export default {
  components: { lHeader ,vVerificationLogin,vPasswordLogin},
  data() {
    return {
      name: "",
      tab:2,//1密码登录2验证码登录
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   if(to.path == '/login' && (localStorage.client_id =='undefined'||!localStorage.client_id)){
  //     var data = to.query
  //     if(data){
  //       localStorage.setItem('client_id', data.client_id)
  //       localStorage.setItem('redirect_uri', data.redirect_uri)
  //       localStorage.setItem('response_type',data.response_type)
  //     }
  //     window.location = window.config.apiUc + '/oauth-client/loginInto'
  //     // // count++
  //     next();
  //   }else{
  //      next();
  //   }
  // },
  computed:{
      ...mapState("account",['sign','timeStamp',"client_id","response_type","redirect_uri"]),
  },
  mounted(){
    this.setWxShare()
  },
  methods:{
    ...mapActions("account", ["loginByCode",'login','authorize']),
    //登录
    toLogin(){
      var data = {
        sign:this.sign,
        timeStamp:this.timeStamp,
        err:()=>{
          this.$refs.passwordLogin.getUdid()
        }
      }
      if(this.tab === 1){
        var pData = this.$refs.passwordLogin.passwordLogin;
        var parmas = Object.assign(data,pData)
        this.login(parmas).then(res=>{
          let obj = {
            client_id:this.client_id,
            response_type:this.response_type,
            redirect_uri:this.redirect_uri,
            loginTicket:res
          }
          localStorage.setItem('username',parmas.username)
          this.authorize(obj)
        })
      }else if(this.tab == 2){
        var vData = this.$refs.verificationLogin.verificationLogin
        var parmas = Object.assign(data,vData)
        this.loginByCode(parmas).then(res=>{
            let obj = {
            client_id:this.client_id,
            response_type:this.response_type,
            redirect_uri:this.redirect_uri,
            loginTicket:res
          }
          localStorage.setItem('username',parmas.username)
          this.authorize(obj)

        })
      }
    },
    //tab切换
     tabChange(index){
        this.tab = index
     },
  },
};
</script>
<style lang="less" scoped>
.img-box {
  img {
    width: 100%;
    height: 100%;
  }
}
.button{
    background-color: #1C71B7;
    color: #FFFFFF;
    border-radius: 44px;
    .van-button__text{
        font-size: 32px;
    }
}
._1C71B7{
    color: #1C71B7;
    font-weight:400;
    line-height:34px
}
</style>

