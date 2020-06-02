<template>
    <div class="p-b-120">
        <xHeader slot='header' title='Settle-in Sharing' />
        <div class="icon"><img :src="shareImg"></div>
    </div>
</template>
<script>
import xHeader from '@/layout/header'
export default {
   components:{
       xHeader,
   },
   data() {
      return {
          shareImg:'',
      }
   },
   computed:{
   },
   created(){
   },
   created(){
       this.init();
   },
   methods:{
       init(){
           if(this.$route.query.id){
               const companyId = this.$route.query.id;
               const companyName = this.$route.query.companyName 
            //    !!companyName&&this.updateWxShareTitle({wxShareTitle:`[Settle-in Sharing] ${companyName}`})
            !!companyName&&this.setWxShare({wxShareTitle:`[Settle-in Sharing] ${companyName}`})
               this.shareImg = `${window.config.api}/tAuthentic/authenticShareImg?companyId=${companyId}`;
           }
        },
   },
   watch: {
   }
}
</script>
<style scoped lang='less'  type='text/less'>
.icon{
    padding:0 .3rem;
    margin-top: 1.3rem;
    img{
        width: 100%;
    }
}
</style>
