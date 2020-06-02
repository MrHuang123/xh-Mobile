<template>
  <!-- 基本信息頁面 -->
  <xArticle>
      <ul slot='main'>
        <router-link to='name' @click.native='changeTitle("Enterprise Name")' tag='li' class='h-90 f-b-c b-2-eee b-no-lr b-no-t'>
          <span class="f-s-28 f-w-600 c-333 ">Enterprise Name</span>
          <p class=" f-b-c">
            <span class="w-360 c-aaa t-r white-1">{{basicInfo.companyName}}</span>
            <Icon type='icon-right' class="c-999 f-s-30 m-l-5" />
          </p>
        </router-link>
        <router-link to='telephone' @click.native='changeTitle("Phone Number")' class='h-90 f-b-c b-2-eee b-no-lr b-no-t'>
          <span class="f-s-28 f-w-600 c-333 ">Phone Number</span>
          <p class=" f-b-c">
            <span class="w-360 c-666 t-r">{{basicInfo.phone}}</span>
            <Icon type='icon-right' class="c-999 f-s-30 m-l-5" />
          </p>
        </router-link>
        <router-link to='fax' @click.native='changeTitle("Fax Number")' class='h-90 f-b-c b-2-eee b-no-lr b-no-t'>
          <span class="f-s-28 f-w-600 c-333 ">Fax Number</span>
          <p class=" f-b-c">
            <span class="w-360 c-666 t-r">{{basicInfo.fax}}</span>
            <Icon type='icon-right' class="c-999 f-s-30 m-l-5" />
          </p>
        </router-link>
        <router-link to='website' @click.native='changeTitle("Website")' class='h-90 f-b-c b-2-eee b-no-lr b-no-t f-b-c'>
          <span class="f-s-28 f-w-600 c-333 ">Website</span>
          <p class=" f-b-c f-1 m-l-5">
            <span class="w-360 c-666 t-r f-1 white-1">{{basicInfo.officialWebsite}}</span>
            <Icon type='icon-right' class="c-999 f-s-30 m-l-5" />
          </p>
        </router-link>
        <router-link to='address' @click.native='changeTitle("Business address")' class='h-90 f-b-c b-2-eee b-no-lr b-no-t'>
          <span class="f-s-28 f-w-600 c-333 ">Address</span>
          <p class=" f-b-c">
            <span class="w-360 c-aaa t-r white-1">{{basicInfo.address}}</span>
            <Icon type='icon-right' class="c-999 f-s-30 m-l-5" />
          </p>
        </router-link>
        <router-link to='introduce' @click.native='changeTitle("Enterprise overview")' class='h-90 f-b-c b-2-eee b-no-lr b-no-t'>
          <span class="f-s-28 f-w-600 c-333 ">Enterprise Overview</span>
          <p class=" f-b-c">
            <span class="w-360 c-666 t-r white-1">{{basicInfo.companyText}}</span>
            <Icon type='icon-right' class="c-999 f-s-30 m-l-5" />
          </p>
        </router-link>
      </ul>
      <p @click='isEnableButton && saveBasicInfo()' slot='footer' class="scale-80-active m-r-20 f-c f-1 h-90  b-r-45" :class="isEnableButton?'bg-linear-header':'bg-color-ccc'">
        <span class="c-fff">Save</span>
      </p>
      <p @click='isEnableButton && submitBasicInfo()' slot='footer' class="scale-80-active f-c f-1 h-90 b-r-45" :class="isEnableButton?'bg-linear-header':'bg-color-ccc'">
        <span class="c-fff">Submit</span>
      </p>
  </div>
  </xArticle>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import xArticle from '@/layout/article'
import { requestSaveBasicInfo,requestSubmitVision,getIsEnableButtom } from '*/request/axios.enterprise' 

export default {
  components:{xArticle},
  data(){
    return {
      isEnableButton:false
    }
  },
  computed:{
    ...mapState(['height']),
    ...mapState('enterDetail',['eci','basicInfo'])
  },
  mounted(){
    
    this._loading()

    this.requestGetBasicInfo({
        id:this.$route.params.id
      })
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.changeKey({title:'Basic Info'})
      vm.getIsEnableButtom()
    })
  },
  created(){
    this.changeKey({title:'Basic Info'})
  },
  methods:{
    ...mapMutations('enterDetail',['changeKey']),
    ...mapActions('enterDetail',['requestGetBasicInfo','changeTitle']),
    async getIsEnableButtom(){
      this.isEnableButton = await getIsEnableButtom({
        companyId:this.$route.params.id,
        auditType:'t_company'
      })
      .then(res=>{
        return res.data
      })

    },
   checkInformation(){
     if(!this.basicInfo.phone || this.basicInfo.phone.trim()==''){
       this.$notify('Please enter phone number');
       return false ;
     }
     if(!this.basicInfo.fax || this.basicInfo.fax.trim()==''){
       this.$notify('Please enter fax number');
       return false;
     }
     if(!this.basicInfo.officialWebsite || this.basicInfo.officialWebsite.trim()==''){
       this.$notify('Please enter website');
       return false ;
     }
     if(!this.basicInfo.companyText || this.basicInfo.companyText.trim()==''){
       this.$notify('Please enter enterprise overview');
       return false ;
     }
     return true ;
   },
   async saveBasicInfo(){


    await this.checkInformation() && requestSaveBasicInfo(Object.assign({},this.basicInfo,{
       updateTime:'',
       createTime:'',
       startDate:'',
     }))
      .then(res=>{
        this._success()
        this.$router.back()
      })
      // .catch(err=>{
      //   this._fail()
      // })

    this.getIsEnableButtom()
   },
   async submitBasicInfo(){

     await this.saveBasicInfo()
     
     await this.checkInformation() && requestSubmitVision({
       companyId:this.$route.params.id,
       auditType:'t_company',
       ids:'',
     })
     .then(res=>{
       this._success()
       this.$router.back()

     })
     this.getIsEnableButtom()
   }
  }  
}
</script>
