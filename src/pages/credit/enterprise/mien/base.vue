<template>
  <div class='p-30 p-t-100'>
    <van-notice-bar
        :speed='40'
        class="p-f pos-t-100 pos-l-0 w-per-100 h-88 p-lr-30"
        color="#1C71B7"
        background="#e7eef7"
        left-icon="warning-o m-lr-10 f-s-32 f-w-600"
      >
        <template slot='default'>
         The following information is provided by the enterprise. Xinhua credit is not responsible for the contents.
        </template>
    </van-notice-bar>
    <header class='d-f'>
      <Icon type='icon-enterprise' class='f-s-32 m-r-20 c-blue m-t-2' />
      <p class='f-s-28 c-333 f-w-600 l-h-40'>{{companyBase.companyName}}</p>
    </header>
    <main class='m-t-30  shadow-app b-r-8 p-30'>
      <p class='f-b-c'>
        <span class='f-s-24 c-333 f-w-600'>Phone Number</span>
        <span class='f-s-24 c-999'>{{companyBase.phone}}</span>
      </p>
      <p class='f-b-c m-t-30'>
        <span class='f-s-24 c-333 f-w-600'>Legal Representative</span>
        <span class='f-s-24 c-999'>{{companyBase.operName}}</span>
      </p>
      <p class='f-b-c m-t-30'>
        <span class='f-s-24 c-333 f-w-600'>Website</span>
        <span class='f-s-24 c-999'>{{companyBase.officialWebsite}}</span>
      </p>
    </main>
    <footer>
      <section v-for='(item,index) in infoList' :key='index' class='m-t-40 p-lr-30'>
        <h3 class='f-s-c'>
          <span class='w-10 h-10 b-r-circle bg-blue'></span>
          <span class='f-s-24 c-333 f-w-600 m-l-20'>{{item.title}}</span>
        </h3>
        <p class='f-s-24 c-999 m-t-10 l-h-34'>
          {{item.content}}
        </p>
      </section>
    </footer>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import {requestGetBasicInfo} from '*/request/axios.enterprise'
import { NoticeBar } from 'vant';

Vue.use(NoticeBar);

export default {
  data(){
    return {
      companyBase:{}
    }
  },
  computed:{
    ...mapState('creditEnterprise',['eci']),
    infoList(){
      return [
        {
          title:'Address',
          content:this.companyBase.address
        },
        {
          title:'Enterprise Overview',
          content:this.eci.company.scope
          // content:'企業概況暫時沒字段'
        }
      ]
    }
  },
  mounted(){
    requestGetBasicInfo({tableName:'t_company',id:this.$route.params.id})
      .then(res=>{
        this.companyBase = res.data;
      })
  },
  methods:{
    ...mapActions('vision',['requestVision'])
  },
}
</script>
