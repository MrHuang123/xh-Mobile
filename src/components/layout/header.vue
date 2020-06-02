<template>
  <header :style='{zIndex:zIndex}' class="h-100 w-per-100  p-f-xl-yt bg-linear-header p-lr-30 f-b-c z-1000">
    <Icon @click='back' class="f-s-32 c-fff scale-50-active " type='icon-left' />
    <span class='f-s-32 c-fff white-1 w-520 t-c'>{{title}}</span>
    <p class=' f-e-c'>
      <slot>
        <span>&nbsp;</span>
      </slot>
    </p>    

  </header>
</template>
<script>
import {mapState,mapMutations} from 'vuex'

export default {
  props:{
    title:{
      default:'',
      type:[String,Number],
      required:true
    },
    // back:{
    //   default:()=>{
    //     if(this.$route.path.startsWith('/international/home')){
    //       this.toggleIsInter();
    //     }
    //     history.back()
    //   },
    //   type:Function,
    //   required:false,
    // }
  },
  computed:{
    ...mapState(['zIndex'])
  },
  methods:{
    ...mapMutations(['setIsInter']),
    back(){
      if(this.$route.path.startsWith('/international/home')){
          this.setIsInter(false);
      }
      // if ('scrollRestoration' in history) {
      //       console.log(history.scrollRestoration ,2222)
      //       history.scrollRestoration = 'manual'; //改为manual之后，就不会记录滚动位置
      //   }
      history.back()
    }
  },
  watch:{
    title(el){
        this.$forceUpdate();
    }
  }
}
</script>

<style lang="stylus">

</style>
