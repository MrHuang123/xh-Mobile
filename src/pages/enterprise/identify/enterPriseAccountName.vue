<template>
  <div >
      <x-header title='account name'>
        <Icon @click='saveName' type='icon-pass' class='f-s-40 c-fff'  />
      </x-header>
      <section class='h-90 p-r'>
        <input v-focusInput v-model="bankAccountName" maxlength="50"  type="text" class='w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600' placeholder='Please enter key words account name' />
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
      bankAccountName:''
    }
  },
  methods:{
    ...mapMutations('enterIdentify',['changeIdentify']),
    saveName(){
      this.changeIdentify({
        bankAccountName:this.bankAccountName
      })
      this.$router.back()
    }
  }
}
</script>
