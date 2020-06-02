<template>
  <div class="changeCorporateName p-r p-b-120">
    <!--  -->
    <!-- <xHeader title="E-mail"/> -->
    <van-nav-bar
      class=" bg-linear-header"
      title="Enterprise Name"
      @click-right="onClickRight"
    >
      <Icon @click='back' slot="left" class="f-s-32 c-fff scale-50-active " type='icon-left' />
      <!-- <Icon  slot="right" class="f-s-32 c-fff scale-50-active " type='icon-pass1' /> -->
    </van-nav-bar>
    <main class="p-t-16">
        <section class="p-lr-32">
            <van-cell-group>
                <van-field 
                v-model="name" 
                disabled
                class='b-no-lr b-no-t'
                type="textarea"
                rows="1"
                autosize
                placeholder="Please enter Enterprise Name" />
            </van-cell-group>
        </section>
         <section class="p-lr-32 m-t-16" >
          <p
            class="f-s-24 h-34 l-h-34 f-w-400 c-ccc f-f-PingFangSC-Regular"
          >The information can not be modified.</p>
        </section>
    </main>
  </div>
</template>
<script>
// 修改公司名称
import xHeader from "@/layout/header";
import {mapState,mapActions} from 'vuex';
import { Icon, Cell, CellGroup, NavBar } from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon).use(NavBar);
export default {
  components: { xHeader },
  data() {
    return {
      name:''
    };
  },
  computed: {
    ...mapState("userCenter", ["userInfo", "ucenterUserInfo"]),
  },
  mounted(){
    if(this.$route.query.enterpriseName){
      this.name = this.$route.query.enterpriseName
    }
  },
  methods:{
    //
    back(){
      this.$router.back()
    },
    onClickRight(){

    },
  },
};
</script>
<style lang="stylus">
.changeCorporateName
  .van-field__control 
    font-size: 28px !important;
    font-family: PingFangSC-Semibold !important;
    font-weight: 600 !important;
    color: #333!important;
  
</style>
