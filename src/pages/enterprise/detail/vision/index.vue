<template>
  <!-- 企业產品服務 -->
  <x-article>
    <xHeader slot='header' title='Enterprise Vision' />
    <article slot='main'>
      <!-- 視頻名稱部分 -->
      <router-link tag='section' to='title' class='h-90 b-f6f6f6 b-no-lr b-no-t f-b-c'>
        <span class='c-333 f-s-28 f-w-600'>Title</span>
        <p class='f-e-c'>
          <span class='f-s-28 c-666 white-1 t-r m-r-15 w-495'>這是一個示範時評示範視頻</span>
          <Icon type='icon-right' class='f-s-32 c-666' />
        </p>
      </router-link>
      <!-- 視頻展示部分 -->
      <section class='p-t-80 f-column f-c'>
        <h3 class='f-s-28 c-333 f-w-600 t-c'>Shooting upload</h3>
        <div v-if='hasVideo' class='w-560 h-335 p-r d-f m-t-50 b-f6f6f6 b-w-1 p-20 '>
          <video class='w-per-100 h-per-100' src="http://uocqiniu.itakeeasy.com//1544494091786_166.mp4"></video>
          <span class='p-a-xr-yt h-50 w-50 m-t-25 m-r-25 f-c ' style='background:rgba(255,255,255,0.6)'>
            <Icon type='icon-trash' class='f-s-32 c-C63639'/>
          </span>
        </div>
        <div v-else class='w-560 h-335 p-r d-f m-t-50 b-f6f6f6 b-w-1  f-c'>
          <img src="../../../../image/userCenter/upload.png" alt="">
        </div>
      </section>
    </article>
    <div slot='footer' class="p-r f-c f-1 h-90 bg-linear-header b-r-45" >
      <span class="c-fff">Save</span>
    </div>
  </x-article>
</template>
<script>
import {mapState} from 'vuex'
import xHeader from '@/layout/header'
import xArticle from '@/layout/article'

export default {
  components:{xHeader,xArticle},
  data(){
    return{
      hasVideo:false,
      products:[
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
      ]
    }
  },
  computed:{
  }  
}
</script>
