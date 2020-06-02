<template>
  <div>
    <section class='p-f-c f-c f-column w-per-100 p-lr-64'>
      <img src="../../../image/bg/bg_cer_success.png" class='h-148'>
      <span class='m-t-45 f-s-32  t-c w-per-100 c-333'>Information  has been successfully submited for examination.</span>
    </section>
    <section class='p-f-xc-yb w-650 h-88 m-b-80 f-c b-r-44 bg-linear-header'>
      <router-link tag='span' to='/enterprise/home'  class='f-s-32 c-fff'>Got it</router-link>
    </section>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState(['height'])
  },
  methods:{
    back(){
      history.go(-4)
    }
  }
}
</script>
