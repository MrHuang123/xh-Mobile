<template>
    <ul slot='main' class='p-r p-l-47 p-t-10  p-lr-30 p-no-b p-l-80 o-h m-b-40'>
      <li v-for='(item,index) in t_dev_path' :key='index' class="p-r p-tb-30 b-f6f6f6 b-no-lr b-no-t">
        <span class="p-a z-5 b-r-circle bg-color-1C71B7 h-25 w-25  f-c" style='left:-26px;top:18px;'>
          <span class='h-10 w-10 bg-fff b-r-circle'> 
          </span>
        </span>
        <section class="f-1">
          <p class="f-s-24 c-666 f-s-l h-32">
            <span class='f-s-24 c-666 ' >
            {{item.devDate}}
            </span>
          </p>
          <p class="m-t-16 l-h-32 f-s-28 c-333 f-w-600">{{item.content}}</p>
        </section> 
      </li>
      <p v-if='t_dev_path.length===0' class='p-f-c f-column f-c'>
        <img  class='w-100 ' src="../../../../image/icon/icon_no_data.png" alt="">
        <span class='m-t-20 f-s-14 c-999'>NO DATA</span>
      </p>
      <aside class='p-a-xl-yt h-per-100  slide-bar-preview' style='top:32px!important;left:20px!important;width:2px;'>
      </aside>
    </ul>
    
</template>
<script>
import {mapState,mapActions} from 'vuex'
import xHeader from '@/layout/header'
import xArticle from '@/layout/article'

export default {
  components:{xHeader,xArticle},
  data(){
    return{
      page_num:1,
      page_size:1000,
      developmentList:[
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
        // {content:'Lorem ipsum dolor sit consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:'2018/12/25'},
      ]
    }
  },
  computed:{
    ...mapState('vision',['t_dev_path'])
  },
  mounted(){
    this.requestVision({tableName:'t_dev_path'})
  },
  methods:{
    ...mapActions('vision',['requestVision'])
  },  
}
</script>
<style lang="stylus">
.slide-bar-preview
  background #C8DCED
</style>
