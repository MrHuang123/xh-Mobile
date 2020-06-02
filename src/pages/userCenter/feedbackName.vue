<template>
  <div class="p-t-100">
      <x-header title='Name' >
        <Icon @click='saveName' type='icon-pass' class='f-s-40 c-fff'  />
      </x-header>
      <section class='h-90 p-r p-lr-32'>
        <input v-focusInput v-model="feedbackName" type="text" class='w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600' placeholder='Please input your name' />
      </section>
  </div>
</template>
<script>
import xHeader from '@/layout/header.vue'
import {mapState,mapMutations} from 'vuex'

export default {
  components:{
    xHeader
  },
  data(){
    return{
      feedbackName:''
    }
  },
  mounted(){
    if(this.$route.query&&this.$route.query.value){
      this.feedbackName = this.$route.query.value
    }
  },
  methods:{
    ...mapMutations('userCenter',['changeFeedback']),
    saveName(){
      if(!this.feedbackName){
          this.$toast("Please input your name");
          return
      }
      this.changeFeedback({
        feedbackName:this.feedbackName
      })
      this.$router.back()
    }
  }
}
</script>
