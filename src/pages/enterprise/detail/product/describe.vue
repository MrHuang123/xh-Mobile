<template>
  <div class='p-t-100'>
    <xHeader title='Product Details' />
    <main class=' p-30 d-f'>
      <textarea :style='{height:height-300+"px"}' class='f-1' placeholder="No more than 200 words" >

      </textarea>
    </main>
  </div>
</template>
<script>
import xHeader from '@/layout/header'
import {mapState} from 'vuex'

export default {
  components:{
    xHeader
  },
  computed:{
    ...mapState(['height'])
  }
}
</script>
