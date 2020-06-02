<template>
  <div class='p-t-100 p-lr-30'>
      <x-header title='Fax Number'>
        <Icon @click='saveFax' type='icon-pass' class='f-s-40 c-fff'  />
      </x-header>
      <section class='h-90 p-r'>
        <input v-focusInput v-model="fax" type="text" class='w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600' placeholder='Please enter fax number' />
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
      fax:''
    }
  },
  created(){
    this.fax = this.basicInfo.fax
  },
  computed:{
    ...mapState('enterDetail',['basicInfo'])
  },
  methods:{
    ...mapMutations('enterDetail',['changeKey']),
    saveFax(){
      this.changeKey({
        basicInfo:Object.assign({},this.basicInfo,{
          fax:this.fax
        })
      })
      this.$nextTick(()=>{
        this.$router.back()
      })
    }
  }
}
</script>
