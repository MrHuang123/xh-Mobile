<template>
  <div class="p-enter-home p-t-100">
    <!-- 企业首页**我的入口 -->
    <!-- <xHeader title='My enterprises' /> -->
    <main class="p-30 bg-fff">
      <!-- 企业信息 -->
      <section>
        <div class="d-f p-r-30">
          <h3 class="f-s-36 c-333">{{company.companyName}}</h3>
        </div>
        <div class="m-t-15">
          <p class="h-30 f-s-22 c-999">Unified Credit Code: {{company.creditCode}}</p>
          <p class="h-30 f-s-22 c-999">Legal Representative: {{company.operName}}</p>
        </div>
        <div class="m-t-25 d-f h-40">
          <p class="bg-color-FFBB47-1 h-40  b-r-20 f-b-c p-r-15">
            <!-- <Icon class="c-FFBB47 f-s-42" type='icon-starts' /> -->
            <img src="../../../image/icon/icon_stars.png" class='h-40 w-40 ' />
            <span class="c-FFBB47 f-s-24 p-lr-15">Credit Rating：{{!!gradeInfo&&gradeInfo.data?gradeInfo.data.qualratingnm:''}}</span>
          </p>
          <p v-if='isCertificated' class="bg-color-32BA59-1  m-l-15 b-r-20  f-b-c p-r-15">
            <Icon class="c-32BA59 f-s-42" type='icon-ok' />
            <span class="c-32BA59 f-s-24 p-lr-15">Certified</span>
          </p>
          <p v-else class="bg-ccc w-180  m-l-15 b-r-20  f-c ">
            <span  class="f-s-24 c-fff" >
             Not Settled
            </span>
          </p>

        </div>
        <div class="m-t-30 p-lr-25 p-tb-30 bg-fff shadow-app b-app b-r-8">
          <section class="d-f">
             <Icon class="f-s-30 c-999 m-r-25 m-t-5" type='icon-email' />
             <p class="f-s-22 c-999">{{eci.companyAttribute.email}}</p>
          </section>
          <section class="d-f m-t-15">
             <Icon class="f-s-30 c-999 m-r-25 m-t-5" type='icon-earth' />
             <p class="f-s-22 c-999">{{eci.companyAttribute.webSite}}</p>
          </section>
          <section class="d-f m-t-15">
             <Icon class="f-s-30 c-999 m-r-25 m-t-2" type='icon-position' />
             <p class="f-s-22 c-999">{{company.address}}</p>
          </section>
        </div>  

      </section>
      <!-- 企业模块入口 -->
      <section class="m-t-30">
         <ul class="">
            <router-link v-for='(item,index) in modules' @click.native='changeTitle(item.title)' :to='item.route' :key='item.route' tag='li' class="h-90 f-b-c">
              <Icon :type='item.icon' class="m-r-30 f-s-32 w-35 c-1C71B7" />
              <p class="f-1 h-per-100 f-b-c b-2-eee b-no-lr b-no-t">
                <span class="white-1 c-333 f-s-28">{{item.title}}</span>
                <Icon type='icon-right' class="f-s-32 c-999" />
              </p>
            </router-link>
         </ul>
      </section>
    </main>
    <footer class="p-30 p-b-60">
      <p class="c-C63639 f-s-22">
      * All data and information provided by our organization to credit reporting agencies are authentic, accurate and without major omissions.
      </p>
    </footer>
  </div>
</template>
<script>
// 企业主页
import xHeader from '@/layout/header'

import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

import {requestFindCompanyCertificationRecord} from '../../../request/axios.credit'

// import {
//   requesetGetCompanyDetail
// } from '../../../request/axios.credit.js'

export default {
  components:{xHeader},
  data(){
    return {
      // company:{},
      modules:[
        {icon:'icon-base-info',title:'Basic Information',route:'base'},  
        // {icon:'icon-trend',title:'Development history',route:'development'},  
        // {icon:'icon-menu',title:'Product or service',route:'product'},  
        {icon:'icon-gallery',title:'Photo Wall',route:'gallery'},  
        {icon:'icon-dentifyingcode',title:'Certificate Information',route:'aptitude'},  
        // {icon:'icon-enterprise',title:'Enterprise and vision',route:'vision'},  
      ],
      isCertificated:false,
    }
  },
  computed:{
    ...mapState('enterDetail',['gradeInfo','eci']),
    ...mapGetters('enterDetail',['company'])
  },
  created(){
      this.changeTitle('My Enterprises')
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.changeTitle('My Enterprises')
    })
  },
  mounted(){
    this.requestFindCompanyCertificationRecord();
  },
  methods:{
    ...mapMutations('enterDetail',['changeKey']),
    ...mapActions('enterDetail',['changeTitle']),
    requestFindCompanyCertificationRecord(){
      requestFindCompanyCertificationRecord({companyId:this.$route.params.id})
        .then(res=>{
          this.isCertificated = res.data ;
        })
        .catch(err=>{
          console.log(err)
        })
    }
    
  }
}
</script>