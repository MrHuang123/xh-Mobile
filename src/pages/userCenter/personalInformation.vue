<template>
  <div class="personalInformation p-b-120">
    <!-- <xHeader title="Personal Information"/> -->
    <van-nav-bar class="bg-linear-header" title="Personal Information">
      <Icon  slot="left" class="f-s-32 c-fff scale-50-active"  @click='back' type="icon-left"/>
    </van-nav-bar>
    <main class="p-t-16">
      <section  class="p-lr-32">
        <van-cell @click="goChange('/userCenter/changeUsername')">
          <van-icon color="#333" size="32px"/>
          <template slot="title">
            <span class="custom-text">Account</span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-aaa f-f-PingFangSC-Regular">{{personalInformation.username}}</span>
          </template>
        </van-cell>
        <van-cell @click="goChange('/userCenter/changeNickname')">
          <template slot="title">
            <span class="custom-text">Nickname</span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='personalInformation.nickName'>{{personalInformation.nickName}}</span>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-else></span>
          </template>
        </van-cell>
        <van-cell @click="goChange('/userCenter/changeRealName')">
          <van-icon  color="#333" size="32px"/>
          <template slot="title">
            <span class="custom-text">Real Name</span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='personalInformation.name'>{{personalInformation.name}}</span>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-else></span>
          </template>
        </van-cell>
         <van-cell @click="goChange('/userCenter/changeMobileNum')" >
          <template slot="title">
            <span class="custom-text">Mobile No.</span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='personalInformation.phone'>{{personalInformation.phone}}</span>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-else></span>
          </template>
        </van-cell>
        <van-cell @click="goChange('/userCenter/changeEmail')" >
          <template slot="title">
            <span class="custom-text">Email Address</span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='personalInformation.email'>{{personalInformation.email}}</span>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-else></span>
          </template>
        </van-cell>
        <van-cell @click="goChange('/userCenter/changeCorporateName')">
          <template slot="title">
            <span class="custom-text">Enterprise Name</span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='userCompanyVoList.length>0'>{{personalInformation.companyName}}</span>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='allUserCompanyVoList.length>0&&allUserCompanyVoList[allUserCompanyVoList.length-1].status=="0"'>In audit</span>
            <span class="f-s-28 f-w-400 c-red f-f-PingFangSC-Regular" v-if='allUserCompanyVoList.length>0&&allUserCompanyVoList[allUserCompanyVoList.length-1].status=="2"'>Audit Failed</span>
          </template>
        </van-cell>
        <van-cell @click="goChange('/userCenter/changeIndustry?industry='+personalInformation.industry)">
          <template slot="title">
            <span class="custom-text">Industry </span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='personalInformation.industry'>{{personalInformation.industry}}</span>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-else></span>
          </template>
        </van-cell>
        <van-cell @click="goChange('/userCenter/changPosition')">
          <template slot="title">
            <span class="custom-text">Title</span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='personalInformation.position'>{{personalInformation.position}}</span>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-else></span>
          </template>
        </van-cell>
        <van-cell @click="goChange('/userCenter/changeCompanyAddress?address='+personalInformation.address)">
          <template slot="title">
            <span class="custom-text">Enterprise Address</span>
          </template>
          <template slot="right-icon">
            <Icon type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          </template>
          <template slot>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-if='personalInformation.address'>{{personalInformation.address}}</span>
            <span class="f-s-28 f-w-400 c-666 f-f-PingFangSC-Regular" v-else></span>
          </template>
        </van-cell>
      </section>
      <!-- <section class="m-b-48 w-per-100 p-f-xl-yb bottom">
        <div class="p-lr-32">
          <button size="large" class="h-88 w-per-100 bg-linear-header b-r-44 c-fff f-s-32" @click="submit">Preservation</button>
        </div>
      </section> -->
      <!-- <van-dialog
        v-model='showIsCerPerson'
      >

      </van-dialog> -->
    </main>
  </div>
</template>
<script>
// 个人信息
import xHeader from "@/layout/header";
import {mapState,mapActions} from 'vuex';
import { Icon, Cell, CellGroup,NavBar,Dialog } from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar)
  .use(Dialog);

export default {
  components: { xHeader },
  data() {
    return {
       emailReg : /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
       personalInformation:{
         username:'',  //账号
         nickName:'', //昵称
         name:'', //真实姓名
         companyName:'',//公司名称
         address:'',//公司地址
         email:'',//邮箱
         phone:'',//手机号
         industry:'',//行业
         position:'',//职务
       },
       userCompanyVoList:[],//个人企业列表(已认证)
       allUserCompanyVoList:[],//个人企业列表(全部企业)
    };
  },
  computed:{
      ...mapState(['access_token']),
      ...mapState("userCenter",['userInfo','ucenterUserInfo']),
  },
  mounted(){
      this.init()
  },
  // beforeRouteEnter(to,from,next){
  //   next(vm=>{
  //     if(from.path.includes('isBack')){
  //       vm.personalInformation.companyName = JSON.parse(localStorage.companyCard).companyName
  //     }
  //   })
  // },
  methods: {
    ...mapActions("userCenter", ["getUserInfo","getUserCenterUserInfo",'userInfoUpdate']),
    back(){
      this.$router.push( `/userCenter/mine`)
    },
    //初始化数据
    init(){
        this.getUserCenterUserInfo().then(res=>{
            if(res){
              this.personalInformation = {
                ...this.personalInformation,
                ...res.data
              }
               this.allUserCompanyVoList = res.data.userCompanyVoList
              var userCompanyVoList = res.data.userCompanyVoList.filter((i)=>i.status=="1")
              this.userCompanyVoList = userCompanyVoList
              if(userCompanyVoList.length>0){
                  this.personalInformation.companyName =res.data.companyName?res.data.companyName:userCompanyVoList[0].companyName
                  if(!this.personalInformation.address){
                    this.personalInformation.address =res.data.address?res.data.address:userCompanyVoList[0].address||''
                  }
                  if(!this.personalInformation.industry){
                    this.personalInformation.industry = res.data.industry?res.data.industry:userCompanyVoList[0].industry||''
                  }
              }
            }
        })
    },
    //前往下一步
    goChange(path) {
      
      if(path=='/userCenter/changeCorporateName'){
        if(this.ucenterUserInfo.userState !='1' ){
          this.$toast("Please enter your real name");
          return
        }
         //企业名称
         if(this.userCompanyVoList.length>0){
            this.$router.push({
              path:path,
              query:{
                enterpriseName:this.personalInformation.companyName
              }
            });
         }else{
            this.allUserCompanyVoList.length>0?
            this.$router.push({
              path:`/enterprise/enterpriseStatus/${this.allUserCompanyVoList[this.allUserCompanyVoList.length-1].companyId}`
            }):
            this.$router.push({
              path:'/enterprise/home'
            })
         }
      }else{
          this.$router.push({
          path
        });
      }
    },
    submit(){
      this.userInfoUpdate(this.personalInformation).then(res =>{
         this.$router.push({
           name:'mine'
         })
      })
    }
  }
};
</script>
<style lang="stylus">
.personalInformation {
  .bottom {
    bottom: 80px;
  }

  .van-cell {
    width: 100%;

    .van-cell__title {
      width: 40%;
    }

    .van-cell__value {
      width: 60%;
      span;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
  }
}
</style>

