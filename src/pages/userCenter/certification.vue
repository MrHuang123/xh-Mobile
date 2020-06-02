<template>
  <div class="certificationData p-r p-b-120">
    <!--  -->
    <!-- <xHeader title="Certification"/> -->
    <van-nav-bar class="bg-linear-header" title="Real-name certification">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
    </van-nav-bar>
    <main :class='userState==2?"":"p-t-16"'>
      <transition name='down'>
      <section class="p-lr-32 bg-color-C63639 padding" v-if='userState == 2'>
        <div class="w-per-100 p-tb-22 f-c t-c">
            <p class="f-s-24 f-w-400 l-h-34 w-per-100 c-fff f-f-PingFangSC-Regular">Real-name authentication was rejected. Please re-authenticate your name.</p>
        </div>
      </section>
      </transition>
      <section class="p-lr-32 ">
        <van-cell @click="gotoEdit('certificationRealName')">
          <Icon slot="right-icon" type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          <!-- <van-icon slot="right-icon" name="arrow" @click="goChangeNickname" color="#ccc" size='32px' class="custom-icon" /> -->
          <template slot="title">
            <span class="custom-text c-333 f-s-14">Real Name</span>
          </template>
          <template slot>
            <span class="custom-text white-1">{{certificationData.name}}</span>
          </template>
        </van-cell>
        <van-cell :value="cardType==1?'ID Card':'Passport'" @click="chooseType">
          <Icon slot="right-icon" type="icon-down" class="f-s-28 c-ccc m-l-16"/>
          <!-- <van-icon slot="right-icon" name="arrow-down" @click="chooseType"   color="#ccc"  size='32px' class="custom-icon" /> -->
          <template slot="title">
            <span class="custom-text c-333 f-s-14">Type of Certificate</span>
          </template>
        </van-cell>
      </section>
      <section class="p-lr-32" v-if='cardType==1'>
        <van-cell @click="gotoEdit('changeCard')" v-if='cardType == 1'>
          <Icon slot="right-icon" type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          <!-- <van-icon slot="right-icon" name="arrow" @click="goChangeCard"  color="#ccc" size='32px' class="custom-icon" /> -->
          <template slot="title">
            <span class="custom-text c-333 f-s-14">ID Card No.</span>
          </template>
          <template slot>
            <span class="custom-text white-1">{{idCardData.cardNum}}</span>
          </template>
        </van-cell>
        <div class="f-c f-column m-tb-80">
          <p class="f-s-28 f-w-600 f-f-PingFangSC-Semibold m-b-48 ">Photo side of ID card</p>
          <van-uploader :after-read="positiveUpload" entype=“multipart/form-data” class="cardBg w-528 h-330 m-b-80 d-f f-c">
            <div class="w-per-100 h-per-100" v-if='idCardData.positiveImg'>
              <img class="h-per-100 w-per-100"  :src="idCardData.positiveImg">
            </div>
            <div class="w-128 h-128" v-else>
              <img class="h-per-100 w-per-100" src="../../image/userCenter/upload.png">
            </div>
          </van-uploader>
          <p class="w-per-100 h-2 bg-color-F6F6F6"></p>
        </div>
        <div class="f-c f-column">
          <p
            class="f-s-28 f-w-600 f-f-PingFangSC-Semibold m-b-48"
          >National emblem side of ID card</p>
          <van-uploader :after-read="reverseUpload"  class="otherBg w-528 h-330 m-b-80 f-c d-f">
            <div class="w-per-100 h-per-100" v-if='idCardData.reverseImg'>
              <img class="h-per-100 w-per-100"  :src="idCardData.reverseImg">
            </div>
            <div class="w-128 h-128" v-else>
              <img class="h-per-100 w-per-100" src="../../image/userCenter/upload.png">
            </div>
  
          </van-uploader>
          <p class="w-per-100 h-2 bg-color-F6F6F6"></p>
        </div>
      </section>
      <section class="p-lr-32" v-if='cardType==2'>
         <van-cell @click="gotoEdit('changeCard')" >
          <Icon slot="right-icon" type="icon-right" class="f-s-32 c-ccc m-l-16"/>
          <!-- <van-icon slot="right-icon" name="arrow" @click="goChangeCard"  color="#ccc" size='32px' class="custom-icon" /> -->
          <template slot="title">
            <span class="custom-text">Passport No.</span>
          </template>
          <template slot>
            <span class="custom-text white-1">{{passportData.cardNum}}</span>
          </template>
        </van-cell>
        <div class="f-c f-column m-tb-80">
          <p class="f-s-28 f-w-600 f-f-PingFangSC-Semibold m-b-48">Home page of passport</p>
          <van-uploader :after-read="positiveUpload" entype=“multipart/form-data” class=" w-528 h-330 m-b-80 d-f f-c">
            <div class="w-per-100 h-per-100" v-if='passportData.positiveImg'>
              <img class="h-per-100 w-per-100"  :src="passportData.positiveImg">
            </div>
            <div class="w-128 h-128" v-else>
              <img class="h-per-100 w-per-100" src="../../image/userCenter/upload.png">
            </div>
          </van-uploader>
          <p class="w-per-100 h-2 bg-color-F6F6F6"></p>
        </div>
        <div class="f-c f-column">
          <p
            class="f-s-28 f-w-600 f-f-PingFangSC-Semibold m-b-48"
          >Last page of passport</p>
          <van-uploader :after-read="reverseUpload"  class=" w-528 h-330 m-b-80 f-c d-f">
            <div class="w-per-100 h-per-100" v-if='passportData.reverseImg'>
              <img class="h-per-100 w-per-100"  :src="passportData.reverseImg">
            </div>
            <div class="w-128 h-128" v-else>
              <img class="h-per-100 w-per-100" src="../../image/userCenter/upload.png">
            </div>
  
          </van-uploader>
          <p class="w-per-100 h-2 bg-color-F6F6F6"></p>
        </div>
      </section>
      <section class="p-lr-32 m-b-20">
        <p class="c-999">Note: The picture supports jpg, png or bmp format of no more than 10M and shall be clear and identifiable.</p>
      </section>
      <section class="p-lr-32 m-b-90">
        <button
          size="large"
          class="h-88 w-per-100 bg-linear-header b-r-44 c-fff f-s-32"
          @click="submit"
        >Submit for Examination</button>
      </section>
    </main>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker confirm-button-text='OK'  cancel-button-text='Cancel'   show-toolbar :columns="columns" :default-index="index"   @cancel="show=false" @confirm="onConfirm"/>
    </van-popup>
 
  </div>
</template>
<script>
// 实名认证
import xHeader from "@/layout/header";
import { mapState, mapActions } from "vuex";
import { Icon, Cell, CellGroup, Uploader, Popup, Picker,Dialog,NavBar} from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)   
  .use(Uploader)
  .use(Popup)
  .use(Picker)
  .use(Dialog)
  .use(NavBar);
export default {
  components: { xHeader },
  data() {
    return {
      userState:1,
      show: false,
      positiveImg:'',
      reverseImg:'',
      positive:'',
      reverse:'',
      cardType:1,
      index:0,//初始索引
      columns: ["ID Card", "Passport"],
      certificationData:{},
      idCardData:{
        cardNum:'',
        positiveImg:'',
        reverseImg:'',
        positive:'',
        reverse:'',
      },
      passportData:{
        cardNum:'',
        positiveImg:'',
        reverseImg:'',
        positive:'',
        reverse:'',
      }
    };
  },
  computed: {
    ...mapState(["access_token", "appId", "userId"]),
    ...mapState("userCenter", [
      "userInfo",
      "ucenterUserInfo",
    ]),
  },
  mounted(){
    
    this.init()
    
  },
  beforeRouteEnter (to, from, next) {
    if(!(from.path=='/userCenter/certificationRealName'||from.path=='/userCenter/changeCard')){
      sessionStorage.removeItem('realName')
      sessionStorage.removeItem('idCardData')
      sessionStorage.removeItem('passportData')
      sessionStorage.removeItem('cardType')
      next((vm)=>{
        // console.log(from,vm)
        if(vm.ucenterUserInfo.userState==2){
          vm.userState = vm.ucenterUserInfo.userState
          setTimeout(()=>{
            vm.userState = 1
          },3000)
        }
      })
    }else{
      next()
    }
  },
  beforeRouteLeave(to, from,next){
    if(to.path=='/userCenter/certificationRealName'||to.path=='/userCenter/changeCard'){
        sessionStorage.setItem('idCardData',JSON.stringify(this.idCardData))
        sessionStorage.setItem('passportData',JSON.stringify(this.passportData))
        sessionStorage.setItem('cardType',this.cardType)
  
      next()
    }else{
      
      next()
    }
   
  },
  methods: {
    ...mapActions("userCenter", ["myAuthentication", "localUpload",'getUserCenterUserInfo']),
    back(){
      this.$router.push({
        name:'mine'
      })
    },
    init(){
       this.getUserCenterUserInfo().then(res=>{
        //  console.log(res.data)
         this.certificationData = res.data
         if(sessionStorage.realName){
           this.certificationData.name = sessionStorage.realName
         }
         if(res.data.cardFileList&&res.data.cardFileList.length>0){
           if(res.data.cardType){
             this.cardType = res.data.cardType
             if(this.cardType == 1){
                this.idCardData.cardNum = res.data.cardNum
                this.idCardData.positiveImg = `${window.config.download}${res.data.cardFileList[0].fileId}`
                this.idCardData.reverseImg = `${window.config.download}${res.data.cardFileList[1].fileId}`
                this.idCardData.positive = res.data.cardFileList[0].fileId
                this.idCardData.reverse = res.data.cardFileList[1].fileId
             }else{
                this.passportData.cardNum = res.data.cardNum
                this.passportData.positiveImg = `${window.config.download}${res.data.cardFileList[0].fileId}`
                this.passportData.reverseImg = `${window.config.download}${res.data.cardFileList[1].fileId}`
                this.passportData.positive = res.data.cardFileList[0].fileId
                this.passportData.reverse = res.data.cardFileList[1].fileId
             }
           }
         }
        if(sessionStorage.idCardData){
          this.idCardData =  JSON.parse(sessionStorage.idCardData)
        }
        if(sessionStorage.passportData){
          this.passportData = JSON.parse(sessionStorage.passportData)
        }
        if(sessionStorage.cardType){
            this.cardType = sessionStorage.cardType
            this.idCardData = JSON.parse(sessionStorage.idCardData)
            this.passportData = JSON.parse(sessionStorage.passportData)
            if(this.cardType == 1){
              this.index = 0
            }else{
              this.index = 1
            }
        }
         if(this.certificationData.userState == 1){
           this.$dialog.alert({
              message:'You have passed the real-name certification, no need to authenticate again',
              confirmButtonText:'OK'
            }).then(() => {
               this.$router.back()
            });
         }else if(this.certificationData.userState*1 === 0){
           this.$dialog.alert({
              message:'In the verification of real-name authentication, no need to authenticate again',
              confirmButtonText:'OK'
            }).then(() => {
               this.$router.back()
            });
         }
       })
    },
    //提交审核
    submit() {
      let data = {
        access_token:this.access_token,
        cardNum:this.cardType==1?this.idCardData.cardNum:this.passportData.cardNum,
        cardType:this.cardType,
        name:this.certificationData.name,
        positive:this.cardType==1?this.idCardData.positive:this.passportData.positive, 
        reverse:this.cardType==1?this.idCardData.reverse:this.passportData.reverse  
      }
      if(this.cardType==1){
        this._Verifying()
      }
      this._loading()
      this.myAuthentication(data).then(res=>{
          this.$toast("submit successfully");
          this.$router.push({
            name:'mine'
          })
      })
    },
    //图片上传
    positiveUpload(file) {
       const isLt10M = file.file.size / 1024 / 1024 < 10
       if (!isLt10M) {
            this.$toast('Image must smaller than 10MB!')
            return
        }
       let data = {
        appId:this.appId,
        userId:this.userId,
        fileName:file.file.name,
        file:file.file
      }
      this._loading()
      this.localUpload(data).then(res =>{
        // console.log(res)
        
        if(this.cardType == 1){
          this.idCardData.positive = res.fileId
          this.idCardData.positiveImg = `${window.config.download}${res.fileId}`
        }else{
          this.passportData.positive = res.fileId
          this.passportData.positiveImg = `${window.config.download}${res.fileId}`
        }
      })
    },
    //反面
    reverseUpload(file) {
      // console.log(file);
      // console.log(this.reverseImg)
      const isLt10M = file.file.size / 1024 / 1024 < 10
      if(!isLt10M) {
          this.$toast('Image must smaller than 10MB!')
          return
      }
      let data = {
        appId: this.appId,
        userId: this.userId,
        fileName: file.file.name,
        file: file.file
      };
      this._loading()
      this.localUpload(data).then(res=>{
          if(this.cardType == 1){
          this.idCardData.reverse = res.fileId
          this.idCardData.reverseImg = `${window.config.download}${res.fileId}`
        }else{
          this.passportData.reverse = res.fileId
          this.passportData.reverseImg = `${window.config.download}${res.fileId}`
        }
      });
      
    },
    //弹出层确定
    onConfirm(value, index) {
      this.index = index
      this.show = false;
      if(index == 0){
        this.cardType = 1
      }else if(index == 1){
        this.cardType = 2
      }
    },
    //选择认证方式
    chooseType() {
      if (!this.show) {
        this.show = true;
      }
    },
    //前往修改真实姓名/证件号
    gotoEdit(name) {
      if(name == 'certificationRealName'){
            var query = {
              name : this.certificationData.name
            }
      }else if(name == 'changeCard'){
            var query = {
              cardNum:this.cardType == 1?this.idCardData.cardNum:this.passportData.cardNum ,
              cardType:this.cardType
            }
      }
      this.$router.push({
        name,
        query:query
      });
    }
  }
};
</script>
<style lang="stylus">
.certificationData {
  .border {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .cardBg {
    background: url('../../image/userCenter/otherCard.png') no-repeat;
    background-size: 100% 100%;
  }

  .otherBg {
    background: url('../../image/userCenter/faceCard.png') no-repeat;
    background-size: 100% 100%;
  }
  
}
</style>

