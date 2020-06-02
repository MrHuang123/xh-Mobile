<template>
  <div class="login-box regist p-b-120">
    <l-Header txt="Register"></l-Header>
    <section class="h-per-100 w-per-100 p-l-48 p-r-48">
      <van-cell-group class="m-b-32">
        <van-field :class="{cell_filed:filed==1,cell_active:type==1}" @focus="type=1" @blur='blur'  v-model="registe.username" placeholder="Phone number/ Email">
          <Icon slot="left-icon" type="icon-user4" class="f-s-32 c-0145A8"/>
        </van-field>
      </van-cell-group>
      <van-cell-group class="m-b-32">
        <van-field
          :class="{cell_filed:filed==2,cell_active:type==2}" @focus="type=2" @blur='blur'
          v-model="registe.code"
          center
          left-icon="contact"
          placeholder="Verification code"
        >
          <Icon slot="left-icon" type="icon-dentifyingcode" class="f-s-32 c-0145A8"/>
          <van-button
            slot="button"
            size="small"
            type="primary"
            v-if="codeStatus == 1"
            @click="getCode"
          >{{getTxt}}</van-button>
          <van-button
            slot="button"
            size="small"
            class="border"
            type="primary"
            v-else-if="codeStatus == 2"
            disabled
          >obtaining</van-button>
          <van-button
            slot="button"
            size="small"
            class="border"
            type="primary"
            v-else
            disabled
          >{{time}}s</van-button>
        </van-field>
      </van-cell-group>
      <van-cell-group class="m-b-16">
        <van-field
          :class="{cell_filed:filed==3,cell_active:type==3}" @focus="type=3" @blur='blur'
          v-model="registe.password"
          autocomplete="new-password"
          type="password"
          placeholder="Password"
        >
          <Icon slot="left-icon" type="icon-password" class="f-s-32 c-0145A8"/>
        </van-field>
      </van-cell-group>
      <p class="m-b-22 f-f-PingFangSC-Regular  f-s-24 c-1C71B7 f-w-400  l-h-34">6-18 Numbers, letters or characters, case sensitive</p>
      <van-cell-group >
        <van-field
          :class="{cell_filed:filed==4,cell_active:type==4}" @focus="type=4" @blur='blur'
          v-model="registe.password2"
          type="password"
          placeholder="Please further confirm the password"
        >
          <Icon slot="left-icon" type="icon-password" class="f-s-32 c-0145A8"/>
        </van-field>
      </van-cell-group>
    </section>
    <section class="d-f f-c m-b-24 m-t-62 p-l-48 p-r-48 t-c">
      <div class="f-s-c h-50 l-h-50">
        <van-checkbox checked-color="#1C71B7" v-model="checked"></van-checkbox>
        <span
          @click="openDialog"
          class="c-1C71B7 f-s-24 f-w-400 h-34 l-h-34 m-l-20"
        >Xinhua Credit User Service Agreement</span>
      </div>
    </section>
    <section class="p-l-48 p-r-48 m-b-24 m-t-30">
      <button
        class="h-88 w-per-100 f-w-600 b-r-44 c-fff f-s-32 bg-linear-header"
        @click="regist"
      >Submit</button>
    </section>
    <section class="d-f f-b-c p-l-48 p-r-48 m-b-50">
      <p class="f-s-24 c-1C71B7 f-w-400 h-34 l-h-34" @click="goTo('login')">Login</p>
      <p class="f-s-24 c-1C71B7 f-w-400 h-34 l-h-34" @click="goTo('forgotPwd')">Password forgotten</p>
    </section>
    <diaAgreement ref="diaAgreement"/>
  </div>
</template>
<script>
import lHeader from "@/pages/regist/header.vue"; //头部
import diaAgreement from "@/pages/regist/diaAgreement.vue"; //注册协议
import { Button, CellGroup, Field, Icon, Checkbox, Dialog } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
Vue.use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Icon)
  .use(Checkbox)
  .use(Dialog);
export default {
  components: { lHeader, diaAgreement },
  data() {
    return {
      type:0,
      diaAgreement: {
        show: false
      },
      checked: true,
      registe: {
        username: "", //账号
        type: "register", //发送验证码的方式
        password: "",
        password2: "",
        code: "",
        lan: "en"
      },
      getTxt: "Get Code", // “获取验证码”按钮的文字
      codeStatus: 1,
      time: 60,
      timer: null
    };
  },
  computed: {
    ...mapState("account", ["sign", "timeStamp",'filed'])
  },
  mounted(){
    this.changeColor(0)
    this.setWxShare()
  },
  methods: {
    ...mapActions("account", ["sendCode", "register",]),
    ...mapMutations("account",['changeColor']),
    blur(){
      this.type = 0
      this.changeColor(0)
    },
    //打开弹窗
    openDialog() {
      this.checked = true;
      this.$refs.diaAgreement.show = true;
    },
    //注册
    regist() {
      this.registe.timeStamp = this.timeStamp;
      this.registe.sign = this.sign;
      this.registe.checked = this.checked;
      this.register(this.registe).then(() => {
        this.$toast("Registration Successful");
        localStorage.setItem('username',this.registe.username)
        this.$router.push({
          name: "login"
        });
      });
      // if(this.sign){
      //     this.register(this.registe).then(()=>{
      //         this.$router.push({
      //           name:'login'
      //         })
      //     })
      // }else{
      //    this.$toast('Please get the SMS verification code first');
      // }
    },
    //获取验证码
    getCode(e) {
      e.preventDefault();
      this.codeStatus = 2;
      let timer = setTimeout(() => {
        this.sendCode({
          username: this.registe.username,
          type: "register",
          lan: this.registe.lan,
          sus: () => {
            // 开始倒计时
            this.codeStatus = 3;
            this.timer = setInterval(() => {
              if (this.time <= 0) {
                this.time = 60;
                this.codeStatus = 1;
                this.getTxt = "Get Code";
                clearInterval(this.timer);
              }
              this.time--;
            }, 1000);
          },
          err: () => {
            this.codeStatus = 1;
            // this.getUdid()
            this.getTxt = "Get Code";
            clearInterval(this.timer);
          }
        });
        clearTimeout(timer);
      }, 1000);
    },
    //跳转
    goTo(name) {
      this.$router.push({
        name
      });
    }
  }
};
</script>
<style lang="stylus">
.regist {
  .van-checkbox__icon {
    width: 40px;
    height: 40px;
    line-height: 40px;

    .van-icon {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }

    .van-icon-success:before {
      font-size: 18px;
    }
  }
   .border{
     border 2px solid #ccc !important
     background #fff
   }
}
</style>


