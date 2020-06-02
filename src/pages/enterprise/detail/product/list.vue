<template>
  <!-- 企业產品服務 -->
  <x-article>
    <xHeader slot='header' title='Product Service' />
    <ul slot='main' class='p-t-15'>
      <li v-for='(item,index) in products' :key='index' class="f-b-c h-90 b-2-eee b-no-lr b-no-t">
        <p class="white-1 f-s-28 f-w-600">{{item.content}}</p>
        <Icon type='icon-trash' class="m-l-40 c-C63639 f-s-32 scale-50-active"/>
      </li>
    </ul>
    <div slot='footer' class="p-r f-c f-1 h-90 bg-linear-header b-r-45" >
      <span class="c-fff">Submit audit</span>
      <section class='p-a h-100 w-per-100 bg-color-ccc translateY-per-100-reverse zezhao-footer'>
        <router-link to='edit/add'>
          <Icon type='icon-add'  class='p-a-xr-yt add-shadow f-s-88 c-1C71B7 b-r-circle translateY-40-reverse'/>
        </router-link>
      </section>
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
