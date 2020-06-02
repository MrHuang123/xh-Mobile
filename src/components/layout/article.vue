<template>
  <div class='p-t-100 p-b-80 f-b-c o-a f-column article_box' :style='{"height":height+"px"}'>
    <slot name='header'></slot>
    <main class="f-1 w-per-100 p-t-15 p-lr-30 o-a">
      <slot name='main'></slot>
    </main>
    <footer class="f-c m-t-20 p-lr-50 w-per-100">
      <slot name='footer'></slot>
    </footer>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['height'])
  }
}
</script>
<style lang="stylus">
.article_box
  min-height 100vh!important
</style>