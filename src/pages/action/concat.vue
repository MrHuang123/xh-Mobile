<template lang='jade'>
  .p-credit-enter-concat.p-lr-48.p-b-48.p-t-32
    section.f-s-c.h-88.p-lr-15.b-app.b-w-2.b-no-lr.b-no-t
      Icon.c-blue.f-s-32.m-r-25(type='icon-user4') 
      //- p.f-s-28.c-999 {{name}}
      input.f-s-28.c-333.h-per-100.f-1(type='text' v-model='name' placeholder='Name' maxLength=50 v-focusInputSectionBottom='true' )
    section.f-s-c.h-88.p-lr-15.b-app.b-w-2.b-no-lr.b-no-t
      Icon.c-blue.f-s-32.m-r-25(type='icon-enterprise')
      div.f-b-c.w-per-100
        p.f-s-28.c-999.white-1 {{companyName}}
        Icon.f-s-28.c-ccc.m-l-16(type="icon-down" @click='selectCompany')
    section.f-s-c.h-88.p-lr-15.b-app.b-w-2.b-no-lr.b-no-t
      Icon.c-blue.f-s-32.m-r-25(type='icon-zhiye') 
      input.f-s-28.c-333.h-per-100.f-1(type='text' v-model='position' placeholder='Job title' maxLength=50 v-focusInputSectionBottom='true' )
    section.f-s-c.h-88.p-lr-15.b-app.b-w-2.b-no-lr.b-no-t
      Icon.c-blue.f-s-32.m-r-25(type='icon-phone') 
      input.f-s-28.c-333.f-1(type='text' v-model='phone' placeholder='Phone Number' maxLength=20 v-number='true' v-focusInputSectionBottom='true')
    section.f-s-c.h-88.p-lr-15.b-app.b-w-2.b-no-lr.b-no-t
      Icon.c-blue.f-s-32.m-r-25(type='icon-email') 
      input.f-s-28.c-333.f-1(type='text' v-model='email' placeholder='E-mail' maxLength=50 v-focusInputSectionBottom='true')
    section.f-s-c.h-88.p-lr-15.b-app.b-w-2.b-no-lr.b-no-t
      Icon.c-blue.f-s-32.m-r-25(type='icon-position') 
      input.f-s-28.c-333.f-1(type='text' v-model='address' placeholder='Address' maxLength=200 v-focusInputSectionBottom='true')
    section.m-t-5.p-lr-15
      header.m-t-25.l-h-40.f-s-28.c-blue.f-w-600 I want to cooperate：
      main.m-t-15
        textarea.f-s-28.c-333.h-250.w-per-100(v-model='content' placeholder='No more than 500 words' maxLength=500)
    section.f-b-c.m-t-45.m-b-80
      button.f-c.h-88.w-312.b-blue-2.b-r-44.ease-400.o-active-50(@click='previewCard') 
        span.f-s-32.c-blue Preview
      button.f-c.h-88.w-312.bg-linear-header.b-r-44.ease-400.o-active-50(@click='sendCard')
        span.f-s-32.c-fff Send
    van-popup(v-model="show" position="bottom" v-bind:overlay="true")
        van-picker(confirm-button-text='OK'  cancel-button-text='Cancel' value-key='companyName'   show-toolbar v-bind:columns="columns" v-bind:default-index="index"   @cancel="show=false" @confirm="onConfirm")
    transition(name='preview')
      aside.p-f-xl-yb.w-per-100.h-per-100.preview-win.p-lr-20.f-c.f-column.ease-400(v-if='isPreview' @click.prevent.stop='isPreview = false')
        section.w-per-100.h-470.ease-400.p-tb-40.p-lr-50.f-column.justify-between(@click.prevent.stop='isPreview=true')
          div.f-1
            h2.h-50.l-h-50.f-w-600.c-fff.f-s-36 {{name}}
            h3.m-t-5.l-h-40.white-2.f-w-600.f-s-28.c-fff {{companyName}}
            h4.m-t-8.f-s-24.l-h-34.f-w-600.c-fff {{position}}
          div.h-220.p-t-5
            div.m-t-12.d-f
              Icon.f-s-32.c-fff.w-50(type='icon-phone')
              span.l-h-32.f-s-24.c-fff-50 {{phone}}
            div.m-t-12.d-f
              Icon.f-s-32.c-fff.w-50(type='icon-email')
              span.l-h-32.f-s-24.c-fff-50 {{email}}
            div.m-t-12.d-f.p-r.p-r-115
              Icon.f-s-32.c-fff.w-50(type='icon-position')
              span.l-h-32.f-s-24.c-fff-50.white-3.f-1 {{address}}
              img.w-112.h-112.p-a-xr-yb(:src='imgCode' v-if='!!imgCode')

        img.w-65.h-65.m-t-60.ease-400(src='../../image/icon/icon_close.png' @click.prevent.stop='isPreview=false')
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {getEnterIsCerted,sendCard} from '*/request/axios.credit'
import { getUserCenterUserInfo,getInfoAboutAction,requestFindCompanyCertificationRecord } from '*/request/axios.userCenter.js'
import { getTauthenticState } from '*/request/axios.international.js'
import QRcode from "qrcode";
import pattern from "../../utils/pattern.js";
import {  Popup, Picker} from "vant";

Vue.use(Popup)
  .use(Picker)
export default {
  data(){
    return{
      hasSendCard:false,//是否已经发送过名片
      name:'',
      companyName:'', //企业名称，同时也用与判断是否显示是否企业认证
      position:'',
      phone:'',
      email:'',
      address:'',//地址，默认显示企业地址
      content:'',
      userState:'',//是否已经实名认证:1-实名，0-认证中，2认证失败，‘’-未认证
      companyState:'',//是否認證了企業：1-認證過，0-認證中，2認證失敗，“”-未認證
      isPreview:false,
      imgCode:'',
      isSending:false,
      queryData:{},
      index:0,//初始索引
      columns: [],
      show:false,
      oneselfCompanyId:'',//自己的企业id
      userData:{},//发送名片数据
    }
  },
  computed:{
    ...mapState(['access_token']),
    ...mapState("userCenter", ["ucenterUserInfo"]),
    isLogin(){
      return String(localStorage.access_token).length > 15 ; //是否已经登录
    }
  },
  async mounted(){
    this._loading();
    if(this.$route.query){
      this.queryData = this.$route.query
    }
    this.$nextTick(async ()=>{
      await this.getUserInfo();
    })
    this._clear();
    // !!localStorage.access_token&&getTauthenticState({
    //   companyId:this.$route.params.oneselfCompanyId
    // }).then(res=>{
    //   if(res.code == 200){
    //     if(res.data == 0){
    //         QRcode.toDataURL(`${location.origin}/credit/${this.$route.params.id}/enter/home`)
    //         .then(url=>{this.imgCode = url})
    //     }
    //   }
    // })
    // QRcode.toDataURL(`${location.origin}/credit/${this.$route.params.id}/enter/home`)
    //   .then(url=>{this.imgCode = url})
  },
  watch:{
    access_token(){
      this.getUserInfo()
    }
  },
  methods:{
    ...mapMutations('account',['changeKey']),
    async previewCard(){
      this.imgCode = ''
      await this.getTauthenticState(this.oneselfCompanyId )
      this.isPreview = true
    },
    getTauthenticState(companyId){
      !!localStorage.access_token&&getTauthenticState({
        companyId,
      }).then(res=>{
        if(res.code == 200){
          if(res.data == 0){
              QRcode.toDataURL(`${location.origin}/credit/${this.$route.params.id}/enter/home`)
              .then(url=>{this.imgCode = url})
          }
        }
      })
    },
    //筛选企业
    selectCompany(){
      this.show = true
    },
    onConfirm(value, index){
      this.oneselfCompanyId = value.companyId
      this.companyName = value.companyName
      this.address = value.address?value.address:''
      this.show = false
    },
    async getUserInfo(){
      if(!!!this.access_token)return ;
      await getUserCenterUserInfo()
        .then(res=>{
          console.log(res)
          this.userState = String(res.data.userState);
          this.columns = !!res.data.userCompanyVoList && res.data.userCompanyVoList.filter((i)=>i.status=="1")
          this.name = res.data.name || '';
          this.address = res.data.address ||"",
          this.email = res.data.email || '';
          this.phone = res.data.phone || '';
        }).catch(err=>{
          if(err.code == 81000012){
            this.$toast('User information invalid, please login again')
            setTimeout(()=>{
              // debugger
              location.href='/login'
            },500)
          }
        })
      let obj = {}
      if(this.queryData.source == 1){
        obj = {
          companyId:this.$route.params.id,
          source:this.queryData.source,
        }
      }else{
        obj = {
          companyId:this.$route.params.id,
          source:this.queryData.source,
          companyName:this.queryData.companyInfoData.companyName,
          address:this.queryData.companyInfoData.address
        }
      }
      await getInfoAboutAction(obj)
      .then(res=>{
        // console.log(res)
        this.userData = res.data.user
        var company = {}
        var companyData = this.columns.filter((i)=>i.companyId==res.data.user.oneselfCompanyId)
        var index=this.columns.findIndex((i)=>i.companyId==res.data.user.oneselfCompanyId);
        company = !!companyData[0]?companyData[0]:this.columns[0];
        this.index = index!=-1?index:0
        // console.log(companyData,index,this.index,res.data.user.oneselfCompanyId)
        this.oneselfCompanyId = company.companyId
        this.companyName = company.companyName||'';
        this.companyState =  String(company.status)||"";
        this.hasSendCard = res.data.type == 2 ;
        this.name = res.data.user.name || this.name ;
        this.phone = res.data.user.phone || this.phone ;
        this.email = res.data.user.email || this.email ;
        this.address = res.data.user.address? res.data.user.address:company.address?company.address:'';
        this.position = res.data.user.position || '';
        this.content =  '';
      })
    },
    async sendCard(){

      if(this.isSending) return ;
      // if(this.phone){
      //   if(!pattern.mobile.test(this.phone)){
      //     this.$toast(`Please enter your mobile number in the correct format`)
      //       return false
      //   }
      // }
      if(this.email){
        if(!pattern.email.test(this.email)){
            this.$toast(`Please enter your email address in the correct format`)
            return false
        }
      }
      this.isSending = true;
      var data = this.columns.filter((i)=>i.companyId==this.oneselfCompanyId)[0]
      var oneselfSource = data.type=='1'?'2':'1';
      var oneselfCompanyInfo = {
        ...data,
        companyId:data.companyId,
        name:data.companyName||'',
        registrationAddress:data.address||'',
        website:data.website||'',
        cityCode:data.city||'',
        city:data.city||'',
        cityName:data.cityName||'',
        countryCode:data.country||'',
        countryName:data.countryName||'',
        companyLevel:data.companyLevel||'',
        key:data.key||'',
        status:data.status||'',
        type:data.type,
        isCustom:data.isCustom?data.isCustom:'', //是否自定义
      }
    //  console.log(data,oneselfSource,oneselfCompanyInfo)
      await sendCard({
        companyId:this.$route.params.id,
        companyName:this.companyName,
        name:this.name,
        address:this.address,
        content:this.content,
        email:this.email,
        phone:this.phone,
        position:this.position,
        source:this.queryData.source,
        companyInfo:this.queryData.companyInfo,
        oneselfCompanyId:this.oneselfCompanyId,
        oneselfSource:oneselfSource,
        oneselfCompanyInfo:oneselfSource=='2'?JSON.stringify(oneselfCompanyInfo):'',
      }).then(res=>{
        this._success();
        let timer = setTimeout(()=>{
          clearTimeout(timer);
          this.$router.back();
        },700)
      })


      

    }
  }
}
</script>
<style lang="stylus">
.preview-win
  background rgba(0,0,0,.3)
  >section
    background url('../../image/bg/bg_card.png') no-repeat center center 
    background-size 100% 100%
.preview-enter,.preview-leave-to
  opacity 0
  >img
    transform scale(0)
  >section 
    transform translateY(-50%)
    opacity 0
</style>
