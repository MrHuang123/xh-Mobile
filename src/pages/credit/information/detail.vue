<template>
  <article class='p-f-xl-yt h-per-100 w-per-100 p-t-40 o-y-a p-b-120'>
    <iframe v-if='isShow' class='h-per-100 w-per-100 m-b-30' :src="$route.params.url" frameborder="0"></iframe>
  </article>
</template>
<script>
export default {
  name:'creditDetail',
  data(){
    return{
      isShow:false
    }
  },
  mounted(){
    // !!this.$route.query.title&&this.updateWxShareTitle({wxShareTitle:this.$route.query.title})
    !!this.$route.query.title&&this.setWxShare({wxShareTitle:this.$route.query.title})
  },
  beforeRouteEnter(from,to,next){
    next(vm=>{vm.isShow=true})
  },
  beforeDestroy(){
    this.isShow = false;
  },
}
</script>

<style lang="stylus">
.iframe-detail
  height 100vh

</style>
