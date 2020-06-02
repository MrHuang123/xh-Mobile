<template>
  <div class="login-box p-b-120">
    <l-Header txt='Change Password'></l-Header>
    <section class="h-per-100 w-per-100 p-l-48 p-r-48">
      <van-cell-group class="m-b-32">
        <van-field v-model="username"  disabled  placeholder="Phone number/ Email">
            <Icon slot="left-icon"  type='icon-user4' class="f-s-32 c-0145A8" />
        </van-field>
      </van-cell-group>
       <van-cell-group class="m-b-32">
        <van-field :class="{cell_filed:filed==1,cell_active:type==1,cell_filed:filed==1}" @focus="type=1" @blur='blur()' v-model="changePwd.oldPassword" type="password" left-icon="contact" placeholder="Old password">
          <Icon slot="left-icon"  type='icon-password' class="f-s-32 c-0145A8" />
        </van-field>
      </van-cell-group>
       <van-cell-group>
        <van-field :class="{cell_filed:filed==2,cell_active:type==2,cell_filed:filed==2}" @focus="type=2" @blur='blur()' v-model="changePwd.password" type="password" left-icon="contact" placeholder="New password">
            <Icon slot="left-icon"  type='icon-password' class="f-s-32 c-0145A8" />
        </van-field>
      </van-cell-group>
    </section>
     <!-- <section class="d-f f-c m-b-24 m-t-62 p-l-48 p-r-48 ">
         <p class="f-s-24 _1C71B7" >
            Login with SMS/Email verification code
        </p>
    </section> -->
    <section class="p-l-48 p-r-48 m-b-50 m-t-62">
        <button  class="h-88 w-per-100 f-w-600 b-r-44 c-fff f-s-32 bg-linear-header" @click="submit">Submit</button>
    </section>
    <!-- <section class="d-f f-b-c p-l-48 p-r-48 ">
         <p class="f-s-24 _1C71B7">
            Register
        </p>
         <p class="f-s-24 _1C71B7">
            Forgot Password
        </p>
    </section> -->
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
      username:'',
      changePwd:{
        oldPassword:'',
        password:'',
      },
    };
  },
  computed:{
      ...mapState("userCenter",['userInfo',]),
      ...mapState(['access_token']),
      ...mapState('account',['filed'])
  },
  mounted(){
    this.init()
    this.changeColor(0)
  },
  methods:{
    ...mapActions("account", ['updatePassword','getUserCenterUserInfo',]),
    ...mapActions("userCenter", ['getUserCenterUserInfo']),
    ...mapMutations("account",['changeColor']),
    ...mapMutations(['updateToken']),
    blur(){
      this.type = 0
      this.changeColor(0)
    },
    init(){
      this.getUserCenterUserInfo().then(res=>{
        // console.log(res)
        this.username = res.data.username
      })
    },
    //找回密码
    submit(){
      let parmas = {
          oldPassword:this.changePwd.oldPassword,
          password:this.changePwd.password
      }
      this.updatePassword(parmas).then(res =>{
          this.$toast("modify successfully");
          localStorage.removeItem('access_token')
          localStorage.removeItem('code')
          this.updateToken()
          this.$router.push({
            name:'login'
          })
      })
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

