<template>
  <!-- 我的企业 -->
  <x-article>
    <xHeader slot='header' title='My enterprises' />
    <ul v-if='componeyList.length' slot='main' class='p-t-15'>
      <router-link v-for='(item,index) in componeyList' tag='li' :to='"/enterprise/detail/"+item.id+"/index"' :key='index' class="f-b-c h-90 b-2-eee b-no-lr b-no-t">
        <p class="white-1 f-s-28 f-w-600 f-1">{{item.companyName}}</p>
        <p class="w-208 f-e-c">
          <!-- 失敗 -->
          <span v-if='item.status==-1' class="f-s-24 c-C63639">
            Audit failed
          </span>
          <!-- 通過 -->
          <span v-else-if='item.status==1'>
            <img src="../../image/userCenter/certified.png" class="w-140"/>
          </span>
          <!-- 未審核 -->
          <span v-else class="f-s-24 c-666" >
           Not Settled
          </span>

          <Icon type='icon-right' class="m-l-10 f-s-30 c-999 "/>
        </p>
      </router-link>
    </ul>
    <div v-else slot='main' class="h-per-100 f-column f-c p-b-30">
      <img src="../../image/userCenter/certificationEmpty.png" class='w-225' />
      <p class="f-s-28 c-666 m-t-15">You haven't certified the business yet.</p>
    </div>
    <p slot='footer' @click='certifyEnterprise' class="f-c f-1 h-90 bg-linear-header b-r-45">
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
  components:{xHeader,xArticle},
  data(){
    return{
      componeyList:[
      ],//我的企業列表
    }
  },
  computed:{
    ...mapState('userCenter',['ucenterUserInfo'])
  },
  created(){
    this.changeTitle('My enterprise')
  },
  mounted(){
    this.requestGetMyCompanyList();
    this.getUserCenterUserInfo()
  },
  methods:{
    ...mapActions('userCenter',['getUserCenterUserInfo']),
    ...mapActions('enterDetail',['changeTitle']),
    // 個人認證成功之前提示
    certifyEnterprise(){
      
      if(this.ucenterUserInfo.userState == 1){
        this.$router.push('identify');
        return false;
      }

      this.$dialog.alert({
        message:'You can only perform enterprise certification after real-name certification audit is passed.',
        confirmButtonText:'OK'
      })
      .then(()=>{
        // console.log('helo')
      })
    },

    // 查尋我的企業
    requestGetMyCompanyList(){
      requestGetMyCompanyList({
        currentPage:1,
        pageSize:100,
      })
      .then(res=>{
        this.componeyList = res.data.list ;
      })
    }
  }  
}
</script>
