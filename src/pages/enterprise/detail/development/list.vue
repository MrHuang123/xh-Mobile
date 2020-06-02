<template>
  <!-- 企业发展历程 -->
  <x-article>
    <xHeader slot='header' title='Development History' />
    <ul slot='main' class='p-r p-l-47 p-t-10 p-b-40'>
      <li v-for='(item,index) in developmentList' :key='index' class="p-r p-tb-30 b-f6f6f6 b-no-lr b-no-t">
        <span class="p-a z-5 b-r-16 bg-color-1C71B7 h-32 t-c c-fff f-s-20 f-c" style='min-width:32px;left:-37px;top:17px;'>
          <span class='scale-70'> 
          {{index+1}}
          </span>
        </span>
        <section class="f-1">
          <p class="f-s-24 c-666 f-s-l h-32">
            <span class='f-s-24 c-666 ' >
            {{item.date}}
            </span>
          </p>
          <p class="m-t-16 l-h-32 f-s-28 c-333 f-w-600">{{item.content}}</p>
        </section> 
      </li>
      <aside class='p-a-xl-yt h-per-100 w-2 slide-bar-linear' style='top:40px!important;left:5px!important;'>

      </aside>
    </ul>
    <div slot='footer' class="p-r f-c f-1 h-90 bg-linear-header b-r-45" >
      <span class="c-fff">Submit audit</span>
      <section class='p-a h-100 w-per-100 bg-color-ccc translateY-per-100-reverse zezhao-footer'>
        <router-link to='edit/add'>
          <Icon  type='icon-add'  class='p-a-xr-yt add-shadow f-s-88 c-1C71B7 b-r-circle translateY-40-reverse'/>
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
      developmentList:[
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
      ]
    }
  },
  computed:{
  }  
}
</script>