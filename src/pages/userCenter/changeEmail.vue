<template>
  <div class="changeEmail p-r p-b-120">
    <!--  -->
    <van-nav-bar class="bg-linear-header" title="Email Address">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <Icon slot="right"  class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/>
    </van-nav-bar>
    <!-- <xHeader title="E-mail"/> -->
    <main class="p-t-16 p-lr-32">
        <section class="h-90 p-r">
          <input
            v-focusInput
            v-model="value"
            type="text"
            maxlength="50"
            class="w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
            placeholder="Please enter email address"
          >
        </section>
    </main>
  </div>
</template>
<script>
// 修改邮箱
import xHeader from "@/layout/header";
import { Icon, Cell, CellGroup,NavBar } from "vant";
import pattern from '../../utils/pattern.js'
import { mapState, mapActions, mapMutations } from "vuex";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar);
export default {
  components: { xHeader },
  data() {
    return {
      value:'',
      data:{},
      title:'',
      placeholder:'Please enter email address'
    };
  },
   computed: {
    ...mapState("userCenter", ["ucenterUserInfo"])
  },
  mounted(){
    this.init()
  },
  methods:{
    ...mapActions("userCenter", [
      "getUserCenterUserInfo",
      "userInfoUpdate"
    ]),
    //初始化
    init() {
      this.getUserCenterUserInfo(this.access_token).then(res => {
        if (res) {
          this.data = res.data
          this.value = res.data.email;
        }
      });
    },
    back() {
      this.$router.back();
    },
    confim(){
      if(this.value&&!pattern.email.test(this.value)){
        this.$toast("Please enter the correct email address");
        return
      }
      this.data.email = this.value
        this.userInfoUpdate(this.data).then(res => {
          this.$router.push({
            name: "personalInformation"
          });
        });
    },
  }
};
</script>
<style lang="stylus">

</style>
