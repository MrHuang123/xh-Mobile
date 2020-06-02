<template>
  <div class="changeNickname p-r p-b-120">
    <!--  -->
    <!-- <xHeader title="Change Nickname"/> -->
    <van-nav-bar class="bg-linear-header" title="Nickname">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <Icon slot="right" class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/>
    </van-nav-bar>
    <main class="p-t-16 p-lr-32">
      <section class="h-90 p-r">
        <input
          v-focusInput
          v-model="newUsername"
          maxlength="10"
          type="text"
          class="w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
          placeholder="Please enter nickname"
        >
      </section>
    </main>
  </div>
</template>
<script>
// 修改昵称
import xHeader from "@/layout/header";
import { mapState, mapActions, mapMutations } from "vuex";
import pattern from "../../utils/pattern.js";
import { Icon, Cell, CellGroup, Field, NavBar } from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Field)
  .use(NavBar);
export default {
  components: { xHeader },
  data() {
    return {
      name: ""
    };
  },
  computed: {
    ...mapState(["access_token"]),
    ...mapState("userCenter", ["userInfo", "ucenterUserInfo"]),
    newUsername: {
      get() {
        this.name = this.ucenterUserInfo.nickName;
        return this.ucenterUserInfo.nickName;
      },
      set(val) {
        this.name = val;
      }
    }
  },
  mounted() {
    this.getUserCenterUserInfo();
  },
  methods: {
    ...mapActions("userCenter", ["updateNickName", "getUserCenterUserInfo"]),
    back() {
      this.$router.back();
    },
    confim() {
       this.updateNickName({
            access_token: this.access_token,
            nickName: this.name
          }).then(res => {
            this.$router.push({
              name: "personalInformation"
            });
          });
    }
  }
};
</script>
<style lang="stylus"></style>
