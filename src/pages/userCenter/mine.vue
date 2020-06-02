<template>
  <div class="mine p-r ">
    <!--  -->
    <!-- <xHeader title="Mine"/> -->
    <van-nav-bar class="bg-linear-header" title="Me">
      <!-- <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/> -->
      <!-- <Icon slot="right" class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/> -->
    </van-nav-bar>
    <main>
      <!-- 头像处 -->
      <section class="p-30" @click="gotoNext('personalInformation')">
        <div class="d-f f-b-c p-tb-48 p-lr-32 border">
          <div class="d-f f-s-c">
            <div class="h-112 w-112 m-r-32">
              <img class="h-per-100 w-per-100" src="../../image/head.png">
            </div>
            <div>
              <p
                class="w-334 h-48 f-f-PingFangSC-Medium f-s-36 f-w-500 l-h-48 c-333 m-t-8 m-b-16 white-1"
              >{{data.nickName}}</p>
              <p
                class="f-s-24 f-w-400 c-666 f-f-PingFangSC-Regular h-32 l-h-32 white-1"
              >{{data.username}}</p>
            </div>
          </div>
          <div class="w-128" v-if="data.userState == 1">
            <img class="h-per-100 w-per-100" src="../../image/userCenter/completed.png">
          </div>
          <div class="w-34 h-34">
            <Icon type="icon-moreread" class="f-s-32 c-999"/>
          </div>
        </div>
      </section>
      <section class="p-lr-32">
        <van-cell-group>
          <van-cell @click="gotoCertification">
            <Icon slot="icon" type="icon-haozhuanxianqiantaitubiao-" class="f-s-32 c-0145A8"/>
            <Icon slot="right-icon" type="icon-right" class="f-s-32 c-ccc m-l-16"/>
            <template slot>
              <span class="c-666 f-s-24" v-if="userState*1 === 0">In audit</span>
              <span class v-else-if="userState*1 === 1">
                <img src="../../image/userCenter/certified.png" class="w-140">
              </span>
              <span class="c-C63639 f-s-24" v-else-if="userState*1 === 2">Audit failed</span>
              <span class="c-666 f-s-24" v-else>Not certified</span>
            </template>
            <template slot="title">
              <span class="custom-text m-l-32">Certification</span>
            </template>
          </van-cell>
          <van-cell value @click="gotoNext('/enterprise/home')">
            <Icon slot="icon" type="icon-enterprise" class="f-s-32 c-0145A8"/>
            <Icon slot="right-icon" type="icon-right" class="f-s-32 c-ccc  m-l-16"/>
            <template slot="title">
              <span class="custom-text m-l-32">My Enterprises</span>
            </template>
            <template slot >
              <span class v-if="userCompanyVoList.length>0&&userCompanyVoList[0].status == 1">
                <img src="../../image/userCenter/certified.png" class="w-140">
              </span>
              <span class="c-C63639 f-s-24" v-else-if="userCompanyVoList.length>0&&userCompanyVoList[0].status == 2">Audit failed</span>
              <span class="c-666 f-s-24" v-else-if="userCompanyVoList.length>0&&userCompanyVoList[0].status == 0">In audit</span>
              <span class="c-666 f-s-24" v-else>Not certified</span>
            </template>
          </van-cell>
          <van-cell value @click="gotoNext('/changePwd')">
            <Icon slot="icon" type="icon-password" class="f-s-32 c-0145A8"/>
            <Icon slot="right-icon" type="icon-right" class="f-s-32 c-ccc"/>
            <template slot="title">
              <span class="custom-text m-l-32">Change Password</span>
            </template>
          </van-cell>
          <van-cell value @click="gotoNext('/userCenter/contactUs')">
            <Icon slot="icon" type="icon-lianxiwomen" class="f-s-32 c-0145A8"/>
            <Icon slot="right-icon" type="icon-right" class="f-s-32 c-ccc"/>
            <template slot="title">
              <span class="custom-text m-l-32">Contact Us</span>
            </template>
          </van-cell>
          <van-cell value @click="gotoNext('/userCenter/feedback')">
            <Icon slot="icon" type="icon-fankui" class="f-s-32 c-0145A8"/>
            <Icon slot="right-icon" type="icon-right" class="f-s-32 c-ccc"/>
            <template slot="title">
              <span class="custom-text m-l-32">Feedback</span>
            </template>
          </van-cell>
        </van-cell-group>
      </section>
      <section class="m-b-140 w-per-100 m-t-140">
        <div class="p-lr-32">
          <button
            size="large"
            class="h-88 w-per-100 b-blue c-1C71B7 b-r-44 c-fff f-s-32"
            @click="signOut"
          >Sign Out</button>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
// 我的
// import xHeader from "@/layout/header";
import { Icon, Cell, CellGroup ,NavBar ,Dialog} from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar)
  .use(Dialog);
export default {
  // components: { xHeader },
  data() {
    return {
      data: {
        userCompanyVoList:[],

      },
      userState:'',
      userCompanyVoList:[],
    };
  },
  computed: {
    ...mapState(["access_token"]),
    ...mapState("account", ["client_id", "code", "client_secret"]),
    ...mapState("userCenter", ["userInfo", "ucenterUserInfo"])
  },
  beforeRouteLeave (to, from, next) {
    
    next()//一定不要忘记写
  },
  mounted() {
    if (localStorage.code&&!localStorage.access_token) {
      this.getAccessToken({
        client_id:this.client_id,
        code:localStorage.code,
        client_secret:this.client_secret
      }).then(res=>{
          this.updateToken(res)
          this.init();
          //  setTimeout(()=>{
          //       localStorage.removeItem('scriptUC')
          //       localStorage.removeItem('htmlUC')
          //       this.updateUC()
          //       console.log(1111)
          //   },6000)
      }).catch(()=>{
          localStorage.removeItem("code");
          localStorage.removeItem("access_token");
          this.updateToken();
          this.$router.push('/login')
      })
    }else if(localStorage.access_token){
      this.init();
    }
  },

  methods: {
    ...mapActions("account", ["logout", "getAccessToken"]),
    ...mapActions("userCenter", ["getUserInfo", "getUserCenterUserInfo"]),
    ...mapMutations("userCenter", ["updateUserCenterUserInfo",]),
    ...mapMutations("account", ["updateUC",]),
    ...mapMutations(['updateToken']),
    init() {
      this._loading()
      this.getUserCenterUserInfo().then(res => {
        this.data = res.data;
        this.userState = res.data.userState;
        var userCompanyVoList = res.data.userCompanyVoList?res.data.userCompanyVoList.filter((i)=>i.status=="1"):[]
        this.data.userCompanyVoList = userCompanyVoList.length>0?userCompanyVoList:res.data.userCompanyVoList
        this.userCompanyVoList = userCompanyVoList.length>0?userCompanyVoList:res.data.userCompanyVoList
        this.$toast.clear()
      }).catch(err=>{
        this.$toast.clear()
      })
    },
    gotoCertification() {
      var type = this.data.userState;
      this.$router.push({
        name: "certification",
      });
    },

    //退出
    signOut() {
      
      this.logout(localStorage.access_token).then(res => {
          Cookies.remove('access_token',{domain: '.'+document.domain.split('.').reverse().splice(0,2).reverse().join('.')});
          // const timer = setTimeout(() => {
          //   clearTimeout(timer);
          //   localStorage.removeItem('access_token')
          //   localStorage.removeItem('scriptUC')
          //   localStorage.removeItem('htmlUC')
          //   this.updateUC()
          //   document.querySelector("#uc-iframe").empty()
          // }, 5000)
          this.updateUserCenterUserInfo({});
          this.updateToken()
          this.$router.push({
              name: "login"
          });
      });
    },
    //跳转下一步
    gotoNext(path) {
      this.$router.push({
        path
      });
      // if(path=='/enterprise/home'){
      //   //判断国际企业驳回
      //   if(this.data.userCompanyVoList.length>0&&this.data.userCompanyVoList[0].type == '1' && this.data.userCompanyVoList[0].status == '2'){
      //     this.$dialog.alert({
      //       message:'Please use the settle-in process for overseas enterprises on your PC.',
      //       confirmButtonText:'OK'
      //     }).then(() => {
      //     });
      //     return;
      //   }
      //   // console.log(this.data.userCompanyVoList[0].status)
      //   if(this.data.userCompanyVoList.length>0&&this.data.userCompanyVoList[0].status==2){
      //     this.$router.push("/enterprise/identify/"+this.data.userCompanyVoList[0].companyId+"/step1")
      //   }else{
      //     this.$router.push({
      //       path
      //     });
      //   }
      // }else{
      //   this.$router.push({
      //     path
      //   });
      // }
    }
  }
};
</script>
<style lang="stylus">
.mine {
  .border {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .bottom {
    bottom: 120px;
  }
}
</style>

