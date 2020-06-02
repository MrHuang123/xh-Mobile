<template>
  <div class='p-t-100 p-lr-30'>
      <x-header title='Enterprise Overview'>
        <Icon @click='saveOverview' type='icon-pass' class='f-s-40 c-fff'  />
      </x-header>
      <section class='h-90 p-r'>
        <input v-focusInput v-model="companyText" type="text" class='w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600' placeholder='Please enter enterprise overview' />
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
      companyText:''
    }
  },
  created(){
    this.companyText = this.basicInfo.companyText||''
  },
  computed:{
    ...mapState('enterDetail',['basicInfo'])
  },
  methods:{
    ...mapMutations('enterDetail',['changeKey']),
    saveOverview(){
      this.changeKey({
        basicInfo:Object.assign({},this.basicInfo,{
          companyText:this.companyText
        })
      })
      this.$nextTick(()=>{
        this.$router.back()
      })
    }
  }
}
</script>
