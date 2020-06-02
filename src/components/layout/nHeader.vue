<template>
  <header :style='{zIndex:zIndex}'  class="h-100 w-per-100 sss bg-linear-header p-lr-30 f-b-c z-1000">
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
import {mapState} from 'vuex'

export default {
  props:{
    title:{
      default:'',
      type:[String,Number],
      required:true
    }
  },
  computed:{
    ...mapState(['zIndex'])
  },
  methods:{
      back(){
          this.$emit('back');
      }
  },
  watch:{
    title(el){
        this.$forceUpdate();
    }
  }
}
</script>

<style >
.sss{
  position: fixed;
  left: 100%;
  top:0;
}
</style>
