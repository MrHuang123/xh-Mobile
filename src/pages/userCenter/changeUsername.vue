<template>
  <div class="changeUsername p-r p-b-120">
    <!--  -->
    <van-nav-bar class="bg-linear-header" title="Account">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <!-- <Icon slot="right" class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/> -->
    </van-nav-bar>
    <main class="p-t-16 p-lr-32">
      <section class="h-90 p-r">
          <input
            v-focusInput
            v-model="ucenterUserInfo.username"
            type="text"
            disabled
            class="w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
            placeholder="Please enter account"
          >
        </section>
      
      <section class="m-t-16">
          <p class="f-s-24 h-34 l-h-34 f-w-400 c-ccc f-f-PingFangSC-Regular">The information can not be modified.</p>
      </section>
    </main>
  </div>
</template>
<script>
// 修改账号
import xHeader from "@/layout/header";
import { mapState, mapActions, mapMutations } from "vuex";
import { Icon, Cell, CellGroup, NavBar } from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar);
export default {
  components: { xHeader },
  data() {
    return {
    
    };
  },
  computed: {
    ...mapState(["access_token"]),
    ...mapState("userCenter", [
      "userInfo",
      "ucenterUserInfo",
    ])
  },
  methods: {
     ...mapActions("userCenter", ['getUserCenterUserInfo']),
    back() {
      this.$router.back();
    },
    
    
  }
};
</script>
<style lang="stylus">
.changeUsername
    .van-field__control
        color #999
</style>
