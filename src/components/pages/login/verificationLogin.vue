<template>
  <div class="verificationLogin">
   <section class="h-per-100 w-per-100 p-l-48 p-r-48">
      <van-cell-group class="m-b-32">
        <van-field    :class="{cell_filed:filed==1,cell_active:type==1}" @focus="type=1" @blur='blur'  v-model="verificationLogin.username"   placeholder="Phone number/ Email">
              <Icon slot="left-icon"  type='icon-user4' class="f-s-32 c-0145A8" />
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <van-field :class="{cell_filed:filed==2,cell_active:type==2}" @focus="type=2" @blur='blur'   v-model="verificationLogin.code" center  left-icon="contact" placeholder="Verification code">
          <Icon slot="left-icon"  type='icon-dentifyingcode' class="f-s-32 c-0145A8" />
          <van-button slot="button" size="small" type="primary" v-if='codeStatus == 1'  @click="getCode">{{getTxt}}</van-button>
          <van-button slot="button" size="small" class="border" type="primary" v-else-if='codeStatus == 2' disabled>obtaining</van-button>
          <van-button slot="button" size="small" class="border" type="primary" v-else  disabled>{{time}}s</van-button>
        </van-field>
      </van-cell-group>
    </section>
    
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import pattern from '../../../utils/pattern'
export default {
  data() {
    return {
      type:0,
      verificationLogin:{
          username:'',
          code:'',
          lan:'en',
          type:'login'
      },  
      getTxt: "Get Code", // “获取验证码”按钮的文字
      codeStatus:1,
      time:60,
      timer:null,
    };
  },
   computed:{
    ...mapState('account',['filed'])
  },
  mounted(){
    if(localStorage.username&&(pattern.email.test(localStorage.username)||pattern.mobile.test(localStorage.username))){
      this.verificationLogin.username = localStorage.username
    }
    this.changeColor(0)
  },
  methods:{
    ...mapActions("account", ["sendCode",]),
    ...mapMutations("account",['changeColor']),
    blur(){
      this.type = 0
      this.changeColor(0)
    },
    //获取验证码
    getCode(e) {
      e.preventDefault();
      // var obj = this.form.getFieldsValue();
      this.codeStatus = 2 ;
      let timer = setTimeout(()=>{
          this.sendCode({
            username:this.verificationLogin.username,
            type:this.verificationLogin.type,
            lan:this.verificationLogin.lan,
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
  }
};
</script>
<style lang="stylus">
.verificationLogin
  .border
    border 2px solid #ccc !important
    background #fff
</style>


