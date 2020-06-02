<template>
  <ul class='p-lr-30 m-b-50 p-t-100'>
     <van-notice-bar
        v-if='t_qa_info.length'
        :speed='40'
        class="p-f pos-t-100 pos-l-0 w-per-100 h-88 p-lr-30"
        color="#1C71B7"
        background="#e7eef7"
        left-icon="warning-o m-lr-10 f-s-32 f-w-600"
      >
        <template slot='default'>
          <!-- Part of the following information is from machine translation,for reference only,not as a legal basis -->
          The following information is provided by the enterprise. Xinhua credit is not responsible for the contents.
        </template>
    </van-notice-bar>
    <li v-for='(item,index) in t_qa_info' :key='index' :class='index==t_qa_info.length-1?"":"b-app b-w-1 b-no-lrt"' class='p-b-50'>
      <header class='m-t-30 d-f'>
        <span class='w-60'>
          <Icon type='icon-dentifyingcode' class='f-s-32 c-blue' />
        </span>
        <span class='f-1 f-w-600'>{{item.picTitle}}</span>
      </header>
      <main class='f-e-c h-372 m-t-30 bg-app m-l-60 b-r-8 p-15 d-f' >
        <!-- <img :src='item.img' class='f-1' /> -->
        <p class="f-1 h-per-100 bg-position-c-c bg-repeat-no bg-size-contain" :style='{backgroundImage:"url("+item.picUrl+")"}'></p>
      </main>
    </li>
    <p v-if='t_qa_info.length===0' class='p-f-c f-column f-c'>
      <img  class='w-100 ' src="../../../../image/icon/icon_no_data.png" alt="">
      <span class='m-t-20 f-s-14 c-999'>NO DATA</span>
    </p>
  </ul>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import { NoticeBar } from 'vant';
Vue.use(NoticeBar)

export default {
  data(){
    return {
      
    }
  },
  computed:{
    ...mapState('vision',['t_qa_info'])
  },
  mounted(){
    this.requestVision({tableName:'t_qa_info',companyId:this.$route.params.id,isPass:2})
  },
  methods:{
    ...mapActions('vision',['requestVision'])

  }
}
</script>
