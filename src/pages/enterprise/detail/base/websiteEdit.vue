<template>
  <div class='p-t-100 p-lr-30'>
      <x-header title='Website'>
        <Icon @click='saveWebsite' type='icon-pass' class='f-s-40 c-fff'  />
      </x-header>
      <section class='h-90 p-r'>
        <input v-focusInput v-model="website" type="text" class='w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600' placeholder='Please enter website' />
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
      website:''
    }
  },
  created(){
    this.website = this.basicInfo.officialWebsite||''
  },
  computed:{
    ...mapState('enterDetail',['basicInfo'])
  },
  methods:{
    ...mapMutations('enterDetail',['changeKey']),
    saveWebsite(){
      this.changeKey({
        basicInfo:Object.assign({},this.basicInfo,{
          officialWebsite:this.website
        })
      })
      this.$nextTick(()=>{
        this.$router.back()
      })
    }
  }
}
</script>
