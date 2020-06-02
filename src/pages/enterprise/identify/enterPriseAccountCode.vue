<template>
  <div >
      <x-header title='Business account No.'>
        <Icon @click='saveName' type='icon-pass' class='f-s-40 c-fff'  />
      </x-header>
      <section class='h-90 p-r'>
        <input v-focusInput v-model="corporateAccount" type="number"  class='w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600' placeholder='Please enter key words business account No.' />
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
      corporateAccount:''
    }
  },
  methods:{
    ...mapMutations('enterIdentify',['changeIdentify']),
    saveName(){
      if(!!this.corporateAccount&&this.corporateAccount.length>50){
        // words no more than 50
        this.$toast('words no more than 50')
        return 
      }
      this.changeIdentify({
        corporateAccount:this.corporateAccount
      })
      this.$router.back()
    }
  }
}
</script>
