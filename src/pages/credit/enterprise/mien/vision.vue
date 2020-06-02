<template>
  <ul class='p-lr-30 m-b-50'>
    <li v-for='(item,index) in t_horizon' :key='index' :class='index==galleryList.length-1?"":"b-app b-w-1 b-no-lrt"' class='p-b-50'>
      <header class='m-t-30 d-f'>
        <span class='w-60'>
          <Icon type='icon-enterprise' class='f-s-32 c-blue' />
        </span>
        <span class='f-1 f-w-600'>{{item.videoName}}</span>
      </header>
      <main class='f-e-c h-372 m-t-30 bg-app m-l-60 b-r-8 p-15 d-f' >
        <!-- <img :src='item.img' class='f-1' /> -->
        <video  width=600 height=372 :src="item.videoUrl"></video>
        <!-- <p class="f-1 h-per-100 bg-position-c-c bg-repeat-no bg-size-contain" :style='{backgroundImage:"url("+item.img+")"}'></p> -->
      </main>
    </li>
    <p v-if='t_horizon.length===0' class='p-f-c f-column f-c'>
      <img  class='w-100 ' src="../../../../image/icon/icon_no_data.png" alt="">
      <span class='m-t-20 f-s-14 c-999'>NO DATA</span>
    </p>
  </ul>
</template>
<script>
import {mapState,mapActions} from 'vuex'

export default {
  data(){
    return {
      galleryList:[
        {title:'Video introduction of Transn',img:'http://pic29.nipic.com/20130530/12174133_162640398000_2.jpg'},
      ]
    }
  },
  computed:{
    ...mapState('vision',['t_horizon'])
  },
  mounted(){
    this.requestVision({tableName:'t_horizon'})
  },
  methods:{
    ...mapActions('vision',['requestVision'])

  }
}
</script>
