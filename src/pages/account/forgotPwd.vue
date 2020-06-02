<template>
  <div class="login-box forgotPwd p-b-120">
    <l-Header txt='Forget Password'></l-Header>
    <section class="h-per-100 w-per-100 p-l-48 p-r-48">
      <van-cell-group class="m-b-32">
        <van-field :class="{cell_filed:filed==1,cell_active:type==1}" @focus="type=1" @blur='blur' v-model="forgotPwd.username"   placeholder="Phone number/ Email">
            <Icon slot="left-icon"  type='icon-user4' class="f-s-32 c-0145A8" />
        </van-field>
      </van-cell-group >
      <van-cell-group class="m-b-32">
        <van-field :class="{cell_filed:filed==2,cell_active:type==2}" @focus="type=2" @blur='blur' v-model="forgotPwd.code" center  left-icon="contact" placeholder="Verification code">
          <Icon slot="left-icon"  type='icon-dentifyingcode' class="f-s-32 c-0145A8" />
          <van-button slot="button" size="small" type="primary" v-if='codeStatus == 1'  @click="getCode">{{getTxt}}</van-button>
          <van-button slot="button" size="small" class="border" type="primary" v-else-if='codeStatus == 2' disabled>obtaining</van-button>
          <van-button slot="button" size="small" class="border" type="primary" v-else  disabled>{{time}}s</van-button>
        </van-field>
      </van-cell-group>
       <van-cell-group class="m-b-16">
        <van-field :class="{cell_filed:filed==3,cell_active:type==3}" @focus="type=3" @blur='blur' v-model="forgotPwd.password"  autocomplete='new-password' type="password"  left-icon="contact" placeholder="Password">
          <Icon slot="left-icon"  type='icon-password' class="f-s-32 c-0145A8" />
        </van-field>
      </van-cell-group>
      <p class="m-b-22 f-f-PingFangSC-Regular  f-s-24 c-1C71B7 f-w-400 h-34 l-h-34">6-18 Numbers, letters or characters, case sensitive</p>
       <van-cell-group>
        <van-field :class="{cell_filed:filed==4,cell_active:type==4}" @focus="type=4" @blur='blur' v-model="forgotPwd.password2"  type="password"  left-icon="contact" placeholder="Please further confirm the password">
            <Icon slot="left-icon"  type='icon-password' class="f-s-32 c-0145A8" />
        </van-field>
      </van-cell-group>
    </section>
     <!-- <section class="d-f f-c m-b-24 m-t-62 p-l-48 p-r-48 ">
         <p class="f-s-24 _1C71B7" @click="goNext('login')">
            Login with SMS/Email verification code
        </p>
    </section> -->
    <section class="p-l-48 p-r-48 m-b-24  m-t-62">
        <button  class="h-88 w-per-100 f-w-600 b-r-44 c-fff f-s-32 bg-linear-header" @click="submit">Submit</button>
    </section>
    <section class="d-f f-b-c p-l-48 p-r-48 m-b-50">
         <p class="f-s-24 c-1C71B7 f-w-400 h-34 l-h-34" @click="goNext('regist')">
            Register
        </p>
         <p class="f-s-24 c-1C71B7 f-w-400 h-34 l-h-34" @click="goNext('login')">
            Login
        </p>
    </section>
  </div>
</template>
<script>
import lHeader from "@/pages/regist/header.vue"; //头部
import { Button, CellGroup, Field,Icon } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
Vue.use(Field).use(CellGroup).use(Button).use(Icon);
export default {
  components: { lHeader },
  data() {
    return {
      type:0,
      forgotPwd:{
        username:'',
        code:'',
        password:'',
        password2:'',
        lan:'en',
        type:'resetPassword'
      },
      getTxt: "Get Code", // “获取验证码”按钮的文字
      codeStatus:1,
      time:60,
      timer:null,
    };
  },
  computed:{
      ...mapState("account",['sign','timeStamp','filed']),
  },
  mounted(){
    this.changeColor(0)
    this.setWxShare()
  },
  methods:{
    ...mapActions("account", ["sendCode",'resetPassword']),
    ...mapMutations("account",['changeColor']),
    goNext(name){
      this.$router.push({
        name
      })
    },
    blur(){
      this.type = 0
      this.changeColor(0)
    },
    //找回密码
    submit(){
      var data = {
        sign:this.sign,
        timeStamp:this.timeStamp,
        // client_id:this.client_id,
        // response_type:'code',
        // redirect_uri:'http://localhost:8887/oauth-client/callbackLogin',
      }
      let parmas = Object.assign(data,this.forgotPwd)
      this.resetPassword(parmas).then(res =>{
          this.$toast("Password recovery successful");
          localStorage.setItem('username',parmas.username)
          this.$router.push({
            name:'login'
          })
      })
    },
   //获取验证码
    getCode(e) {
      e.preventDefault();
      // var obj = this.form.getFieldsValue();
      this.codeStatus = 2 ;
      let timer = setTimeout(()=>{
          this.sendCode({
            username:this.forgotPwd.username,
            type:this.forgotPwd.type,
            lan:this.forgotPwd.lan,
            sus:()=>{
              // 开始倒计时
              this.codeStatus = 3 ;
              this.timer = setInterval(()=>{
                if(this.time<=0){
                  this.time = 60 ;
                  this.codeStatus=1;
                  this.getTxt = 'Get Code'
                  clearInterval(this.timer)
                }
                this.time -- ;
              },1000)
            },
            err:()=>{
              this.codeStatus = 1 ;
              this.getTxt = 'Get Code';
              clearInterval(this.timer)
            }
          })
          clearTimeout(timer)
      },1000)
    },
  },
};
</script>
<style lang="stylus">
.forgotPwd
  .border
    border 2px solid #ccc !important
    background #fff
</style>


