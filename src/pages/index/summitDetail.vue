<template>
    <article class='p-f-xl-yt h-per-100 w-per-100 p-t-80 o-y-a'>
        <xHeader title="Details">
        </xHeader>
        <iframe v-if='isShow' class='h-per-100 w-per-100 m-b-30' :src="$route.params.url" frameborder="0"></iframe>
    </article>
</template>
<script>
    import xHeader from "@/layout/header";

    export default {
        name:'creditDetail',
        components: { xHeader },
        data(){
            return{
                isShow:false
            }
        },
        mounted(){
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
