<template>
  <!-- 我的企业 -->
  <x-article>
    <ul v-if='componeyList.length' slot='main' class='p-t-15'>
      <li v-for='(item,index) in componeyList' tag='li' @click='jumpToCompany(item)' :key='index' class="f-b-c h-90 b-2-eee b-no-lr b-no-t">
        <p class="white-1 f-s-28 f-w-600 f-1" :class='item.status==1?" c-333 " : " c-ccc "'>{{item.companyName}}</p>
        <p class="w-208 f-e-c">
          <!-- 失敗 -->
          <span v-if='item.status==2' class="f-s-24 c-C63639">
            Audit failed
          </span>
          <!-- 通過 -->
          <span v-else-if='item.status==1'>
            <img src="../../image/userCenter/certified.png" class="w-140"/>
          </span>
          <!-- 未審核 -->
          <span v-else-if='item.status=="0"' class="f-s-24 c-666" >
              In Audit
          </span>

          <Icon type='icon-right' class="m-l-10 f-s-30 c-999 "/>
        </p>
      </li>
    </ul>
   <div v-else   slot='main' class="h-per-100 f-column f-c p-b-30">
        <img src="../../image/userCenter/certificationEmpty.png" class='w-225' />
      <p class="f-s-28 c-666 m-t-15">{{"You haven't certified any enterprise yet."}}</p>
    </div>
    <!-- <div v-if='componeyList.length>0&&componeyList[0].status!=1' :data-value='componeyList[0].status' slot='main' class="h-per-100 f-column f-c p-b-30">
      <p v-if='componeyList.length>0&&componeyList[0].status=="0"' class="f-s-28 c-red m-b-30">In Audit</p>
      <p v-if='componeyList.length>0&&componeyList[0].status=="2"' class="f-s-28 c-red m-b-30">Audit Failed</p>
      <img src="../../image/userCenter/certificationEmpty.png" class='w-225' />
      <p v-if='componeyList.length>0&&componeyList[0].status!=1' class="f-s-28 c-666 m-t-15 t-c">{{componeyList[0].companyName}}</p>
    </div> -->
    <p slot='footer'  @click='certifyEnterprise' class="f-c f-1 h-90 bg-linear-header b-r-45 translateY-per-200-reverse">
      <span class="c-fff">Enterprise Certification</span>
    </p>
      
  </x-article>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import xHeader from '@/layout/header'
import xArticle from '@/layout/article'

import {
  requestGetMyCompanyList
} from '../../request/axios.enterprise.js'

import {Dialog} from 'vant'

Vue.use(Dialog)

export default {
  name:'identifyHome',
  components:{xHeader,xArticle},
  data(){
    return{
      componeyList:[],//我的企業列表
    }
  },
  computed:{
    ...mapState('userCenter',['ucenterUserInfo'])
  },
  created(){
    this.changeTitle('My Enterprises')
  },
  mounted(){
    this.requestGetMyCompanyList();
    !!localStorage.access_token&& this.getUserCenterUserInfo()
  },
  methods:{
    ...mapActions('userCenter',['getUserCenterUserInfo']),
    ...mapActions('enterDetail',['changeTitle']),
    jumpToCompany(item){
      console.log(item)
      if(item.status == '1'){
        if(item.type == '1'){
            this.$router.push("/enterprise/detail/internationalIndex")
            localStorage.setItem("internationalData", JSON.stringify([item]));
            return
        }else{
          this.$router.push("/enterprise/detail/"+item.companyId+"/index")
        }
      }else{
        this.$router.push(`/enterprise/enterpriseStatus/${item.companyId}`)
      }
      // if( this.$route.query.isBack){
      //   localStorage.companyCard = JSON.stringify(item);
      //   this.$router.back();
      //   return false;
      // }
      
      // if(item.type == '1'){
      //   this.$router.push("/enterprise/detail/internationalIndex")
      //   localStorage.setItem("internationalData", JSON.stringify(this.componeyList));
      //   return
      // }
      // //审核失败
      // if( item.status == 2 ){

      //   //判断国际企业驳回
      //   if(item.type == '1' && item.status == '2'){
      //     this.$dialog.alert({
      //       message:'Please use the settle-in process for overseas enterprises on your PC.',
      //       confirmButtonText:'OK'
      //     }).then(() => {
      //     });
      //     return;
      //   }

      //   this.$router.push("/enterprise/identify/"+item.companyId+"/step1")
      //   return ;

      // }
      
      // this.$router.push("/enterprise/detail/"+item.companyId+"/index")
    },
    // 個人認證成功之前提示
    certifyEnterprise(){
      if(this.ucenterUserInfo.userState == 1){
          this.$router.push('identify');
      }else{
         this.$dialog.alert({
            message:'You can only perform enterprise certification after real-name certification audit is passed.',
            confirmButtonText:'OK'
          })
          .then(()=>{
            // console.log('helo')
          })
      }

      // if(this.ucenterUserInfo.userState == 1){
      //   if(this.componeyList.length==0){
          
      //     this.$router.push('identify');
          
      //   }else{
      //     if(this.componeyList[0].status==2){
      //       //判断国际企业驳回
      //       if(this.componeyList[0].type == '1' && this.componeyList[0].status == '2'){
      //         this.$dialog.alert({
      //           message:'Please use the settle-in process for overseas enterprises on your PC.',
      //           confirmButtonText:'OK'
      //         }).then(() => {
      //         });
      //         return;
      //       }
      //     }else{
      //       this.$dialog.alert({
      //         message:'You have an enterprise in the certification process',
      //         confirmButtonText:'OK'
      //       })
      //     }
      //     this.componeyList[0].status==2 ? 
      //     // ()=>{
      //     //   console.log(1111111)
      //     //   this.$router.push('/enterprise/identify/step0')
            
      //       this.$router.push(`/enterprise/identify/${this.componeyList[0].companyId}/step1?isRetray=1`) : 
      //     // }:
      //     this.$dialog.alert({
      //       message:'You have an enterprise in the certification process',
      //       confirmButtonText:'OK'
      //     })
      //   }
        
      // }else{
        
        // this.$dialog.alert({
        //   message:'You can only perform enterprise certification after real-name certification audit is passed.',
        //   confirmButtonText:'OK'
        // })
        // .then(()=>{
        //   // console.log('helo')
        // })
      // }
    },

    // 查尋我的企業
    requestGetMyCompanyList(){
      requestGetMyCompanyList({
        currentPage:1,
        pageSize:1000,
      })
      .then(res=>{
        this.componeyList = res.data.list;
      })
    }
  }  
}
</script>
