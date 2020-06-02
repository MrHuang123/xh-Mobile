<template>
  <!-- 我的企业 -->
  <x-article>
    <div  :data-value='componeyData.status' slot='main' class="h-per-100 f-column f-c p-b-30">
      <p v-if='componeyData.status=="0"' class="f-s-28 c-red m-b-30">In Audit</p>
      <p v-if='componeyData.status=="2"' class="f-s-28 c-red m-b-30">Audit Failed</p>
      <img src="../../image/userCenter/certificationEmpty.png" class='w-225' />
      <p v-if='componeyData.status!=1' class="f-s-28 c-666 m-t-15 t-c">{{componeyData.companyName}}</p>
    </div>
    <p slot='footer' v-if='componeyData.status=="2"'  @click='certifyEnterprise' class="f-c f-1 h-90 bg-linear-header b-r-45 translateY-per-200-reverse">
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
      componeyData:{},//企业数据
    }
  },
  computed:{
    ...mapState('userCenter',['ucenterUserInfo'])
  },
  created(){
   this.changeTitle('My Enterprises')
  },
  async mounted(){
    await this.getUserCenterUserInfo().then(res=>{
        console.log(res.data.userCompanyVoList)
        var companyId = this.$route.params.companyId
        console.log(companyId)
        var componeyList = res.data.userCompanyVoList.filter((i)=>i.companyId==companyId)
        this.componeyData = componeyList.length>0?componeyList[0]:{}
        console.log(componeyList,this.componeyData)
    })
  },
  methods:{
    ...mapActions('userCenter',['getUserCenterUserInfo']),
    ...mapActions('enterDetail',['changeTitle']),
    // 個人認證成功之前提示
    certifyEnterprise(){
      
      if(this.ucenterUserInfo.userState == 1){
        if(this.componeyData.status==2){
            //判断国际企业驳回
            if(this.componeyData.type == '1'){
              this.$dialog.alert({
                message:'Please use the settle-in process for overseas enterprises on your PC.',
                confirmButtonText:'OK'
              }).then(() => {
              });
              return;
            }
          }
          this.componeyData.status==2 ? 
          this.$router.push(`/enterprise/identify/${this.componeyData.companyId}/step1?isRetray=1`) : 
          this.$dialog.alert({
            message:'You have an enterprise in the certification process',
            confirmButtonText:'OK'
          })
      }
    },
  }  
}
</script>
