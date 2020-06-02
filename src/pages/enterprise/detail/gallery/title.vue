<template>
  <div class='p-t-100'>
    <xHeader title='Title'>
      <Icon @click='saveTitle' type='icon-pass' class='f-s-40 c-fff' />
    </xHeader>
    <main class='p-t-15 p-lr-30'>
      <section class='h-90 p-r'>
        <input ref='input' v-focusInputBottom v-model="title" type="text" class='w-per-100 h-per-100 f-s-28 c-333 f-w-600' placeholder="Please enter title" />
        <!-- <p class='p-a-xl-yb h-2 w-per-100 bg-color-1C71B7'></p> -->
      </section>
      
    </main>
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import xHeader from '@/layout/header'

export default {
  components:{
    xHeader
  },
  data(){
    return{
      title:''
    }
  },
  computed:{
    ...mapState('enterDetail',['addDetailInfo'])
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.changeTitle('Title')
    })
  },
  beforeRouteLeave(to,from,next){
    this.changeTitle('Photo Wall');
    next();
  },
  created(){
    this.title= this.addDetailInfo.t_photo_wall.picTitle||''
  },
  methods:{
    ...mapMutations('enterDetail',['changeKeyVisionAdd']),
    ...mapActions('enterDetail',['changeTitle']),
    saveTitle(){
      if(this.title == ''){
        this._toast('Please enter title');
        this.$refs.input.focus();
        return ;
      }
      this.changeKeyVisionAdd({
        t_photo_wall:Object.assign({},this.addDetailInfo.t_photo_wall,{
          picTitle:this.title
        })
      })
      this.$nextTick(()=>{
        this.$router.back()
      })
    },
  },
}
</script>
