<template lang="jade">
  div(@click='sendCard')
    slot
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {getEnterIsCerted,sendCard} from '*/request/axios.credit'
import { getUserCenterUserInfo,getInfoAboutAction,requestFindCompanyCertificationRecord } from '*/request/axios.userCenter.js'

export default {
  //id 企业id
  //source 来源 1国内企业2海外企业
  //companyInfo 海外企业信息
  props:['id','source','companyInfo','companyInfoData'],
  data(){
    return {
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
      oneselfCompanyId:'',//自己的企业id
      userCompanyVoList:[],//认证企业列表
    }
  },
  computed:{
    ...mapState(['access_token']),
    ...mapState("userCenter", ["ucenterUserInfo"]),
    isLogin(){
      return String(localStorage.access_token).length > 15 ; //是否已经登录
    }
  },
  mounted(){
    // this.getUserInfo()
  },
  methods:{
    ...mapMutations('account',['changeKey']),
    getUserInfo(){
      // if(!!!this.access_token)return ;
      // if(!!!localStorage.access_token)return ;
      return new Promise((resolve, reject) => {
          getUserCenterUserInfo()
          .then(res=>{
            this.userState = String(res.data.userState);
            let company = {};
            this.userCompanyVoList = res.data.userCompanyVoList
            company = res.data.userCompanyVoList && res.data.userCompanyVoList.filter((i)=>i.status=="1")[0];
            this.name = res.data.name || '';
            if(company){
              this.companyName = company.companyName||'';
              this.address = res.data.address || company.address||'';
              this.companyState =  String(company.status)||"";
            }
            this.email = res.data.email || '';
            this.phone = res.data.phone || '';
            resolve()
          }).catch(err=>{
            if(err.code ==81000012 ){
              this.$toast('User information invalid, please login again')
              setTimeout(()=>{
               this.changeKey({"redirect_uri":location.href});
               this.$router.push('/login')
              },500)
              reject()
            }
          })
      })
     
    },
    async sendCard_1(){
          // 判断是否登录
          if(!this.isLogin){
              this._toast('Please login')
              this.changeKey({"redirect_uri":location.href});
              this.$router.push('/login')
              return ;
          };
          await this.getUserInfo()
          // 判断是否实名认证
          if(!(this.userState==='1')){
            this.$dialog.confirm({
              message: 'Please submit <br/> real name authentication and complete enterprise authentication first.',
              cancelButtonText:'Not temporarily',
              confirmButtonText:'Authentication',
            })
            .then(()=>{
              this.$router.push(this.userState === '0' ? '/userCenter/mine' : '/userCenter/certification');
            })
            .catch(()=>{})
            return ;
          };

          // 判断是否企业认证
          if(this.userCompanyVoList.filter((i)=>i.status=="1").length<=0){
              this.$dialog.confirm({
                message:'Please complete the enterprise<br> certification first.',
                cancelButtonText:'Cancel',
                confirmButtonText:'Submit'
              })
              .then(()=>{
                this.$router.push(this.userCompanyVoList.length>0? '/userCenter/mine' : '/enterprise/identify/step0')
              })
              .catch(()=>{})
            return ;
          }
          const isSettled = await  getEnterIsCerted({companyId:this.$route.params.id||this.id}).then(res=>res.data).catch(()=>false);  
          if(!isSettled){
            this.$dialog.confirm({
              message:"Sorry,the enterprise has not resided in the system and cannot receive your business card.",
              // cancelButtonText:'Cancel',
              showCancelButton:false,
              confirmButtonText:'OK'
            })
            .then(()=>{

            })
            .catch(()=>{})
            return ;
          };
          let obj = {}
          if(this.source == 1){
            obj = {
              companyId:this.id,
              source:this.source,
            }
          }else{
            obj = {
              companyId:this.id,
              source:this.source,
              companyName:this.companyInfoData.companyName,
              address:this.companyInfoData.address
            }
          }
          await getInfoAboutAction(obj)
          .then(res=>{
            this.hasSendCard = res.data.type == 2 ;
            this.name = res.data.user.name || this.name ;
            this.phone = res.data.user.phone || this.phone ;
            this.email = res.data.user.email || this.email ;
            // this.address = res.data.user.address || this.address;
            this.position = res.data.user.position ;
            this.oneselfCompanyId = res.data.user.oneselfCompanyId;
          })
          // 判断是否已经发送过名片
          if(this.hasSendCard){
            this.$dialog.confirm({
              message:'You have already sent your business card, continue or not?',
              cancelButtonText:'Cancel',
              confirmButtonText:'Send'
            })
            .then(()=>{
              // console.log(this.source,this.companyInfo,222)
              this.$router.push({
                path:`/action/concat/${this.id}`,
                query:{
                  source:this.source,
                  companyInfo:this.source==2?this.companyInfo:'',
                  companyInfoData:this.companyInfoData?this.companyInfoData:{},
                  oneselfCompanyId:this.oneselfCompanyId
                }
              });
            })
            .catch(()=>{})
            return ;
          };
          this.$router.push({
            path:`/action/concat/${this.id}`,
            query:{
              source:this.source,
              companyInfo:this.source==2?this.companyInfo:'',
              companyInfoData:this.companyInfoData?this.companyInfoData:{},
              oneselfCompanyId:this.oneselfCompanyId
            }
          });
    },
    async sendCard(){
      this.sendCard_1()
    }
  }
}
</script>
