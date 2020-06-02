<template>
  <ul class='p-lr-30 m-b-50'>
    <li v-for='(item,index) in t_product_service' :key='index' :class='index==galleryList.length-1?"":"b-app b-w-1 b-no-lrt"' class='p-b-50'>
      <header class='h-96 f-s-c'>
        <span class='w-60'>
          <Icon type='icon-product' class='f-s-32 c-blue' />
        </span>
        <span class='f-w-600 '>{{item.productName}}</span>
      </header>
      <main class='f-e-c'>
        <img :src='item.picUrl' class='b-r-8 h-372 w-620' />
      </main>
    </li>
    <p v-if='t_product_service.length===0' class='p-f-c f-column f-c'>
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
      // galleryList:[
      //   {title:'Transnbox',img:'http://pic29.nipic.com/20130530/12174133_162640398000_2.jpg'},
      //   {title:'Transnbox',img:'http://pic29.nipic.com/20130530/12174133_162640398000_2.jpg'},
      //   {title:'Transnbox',img:'http://pic29.nipic.com/20130530/12174133_162640398000_2.jpg'},
      //   {title:'Transnbox',img:'http://pic29.nipic.com/20130530/12174133_162640398000_2.jpg'},
      // ]
    }
  },
  computed:{
    ...mapState('vision',['t_product_service'])
  },
  mounted(){
    this.requestVision({tableName:'t_product_service'})
  },
  methods:{
    ...mapActions('vision',['requestVision'])

  }
}
</script>
