<template>
  <div class='p-t-100'>
    <main class='p-t-15 p-lr-30'>
      <section class='p-r p-tb-25'>
        <p class='l-h-40 f-s-28 c-999'>{{basicInfo.companyName}}</p>
        <p class='p-a-xl-yb h-2 w-per-100 bg-color-eee'></p>
      </section>
    </main>
    <footer class='m-t-20 p-lr-30'>
        <p class=' c-ccc f-s-24'>No modification after certification</p>
    </footer>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'

export default {
  created(){
    this.changeTitle('Enterprise Name')
  },
  computed:{
    ...mapState('enterDetail',['basicInfo'])
  },
  methods:{
    ...mapActions('enterDetail',['changeTitle'])
  },
}
</script>
