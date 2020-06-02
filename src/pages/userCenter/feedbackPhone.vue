<template>
  <div class="p-t-100">
      <x-header title='Phone Numbe'>
        <Icon @click='saveName' type='icon-pass' class='f-s-40 c-fff'  />
      </x-header>
      <section class='h-90 p-r p-lr-32'> 
        <input v-focusInput v-model="feedbackPhone" maxlength="20" type="text"  v-number='true' class='w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600' placeholder='Please input phone No.' />
      </section>
  </div>
</template>
<script>
import xHeader from '@/layout/header.vue'
import {mapState,mapMutations} from 'vuex'
import pattern from "../../utils/pattern.js";
export default {
  components:{
    xHeader
  },
  data(){
    return{
      feedbackPhone:''
    }
  },
   mounted(){
    if(this.$route.query&&this.$route.query.value){
      this.feedbackPhone = this.$route.query.value
    }
  },
  methods:{
    ...mapMutations('userCenter',['changeFeedback']),
    saveName(){
      if(!this.feedbackPhone){
          this.$toast("Please input phone No.");
          return false
      }
      if(!pattern.telephone.test(this.feedbackPhone)){
           this.$toast("Please enter the correct mobile phone number");
           return false
      }
      this.changeFeedback({
        feedbackPhone:this.feedbackPhone
      })
      this.$router.back()
    }
  }
}
</script>
