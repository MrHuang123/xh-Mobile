<template>
  <div class="changeRealName p-r p-b-120">
    <!--  -->
    <van-nav-bar class="bg-linear-header" title="Real Name">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <!-- <Icon
        slot="right"
        v-if="!data.userState==1"
        class="f-s-32 c-fff scale-50-active"
        @click="confim"
        type="icon-pass1"
      /> -->
    </van-nav-bar>

    <main class="p-t-16">
      <section class="p-lr-32">
        <section class="h-90 p-r">
          <input
            v-if='data.userState==1'
            v-focusInput
            v-model="username"
            :disabled='data.userState==1'
            type="text"
            class="w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
            placeholder="Please enter Real Name"
          >
          <input
            v-else
            v-focusInput
            v-model="username"
            disabled
            type="text"
            class="w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
            placeholder="Get information automatically after certification"
          >
        </section>
      </section>
      <section class="p-lr-32 m-t-16" v-show="data.userState==1">
        <p
          class="f-s-24 h-34 l-h-34 f-w-400 c-ccc f-f-PingFangSC-Regular"
        >The information can not be modified</p>
      </section>
    </main>
  </div>
</template>
<script>
// 修改真实姓名
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
      username: "",
      data: {}
    };
  },
  computed: {
    ...mapState(["access_token"]),
    ...mapState("userCenter", ["userInfo", "ucenterUserInfo"])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations("userCenter", ["changeRealName"]),
    ...mapActions("userCenter", ["getUserCenterUserInfo", "userInfoUpdate"]),

    init() {
      this.getUserCenterUserInfo().then(res => {
        if (res) {
          this.data = res.data;
          this.username = res.data.name;
        }
      });
    },
    back() {
      this.$router.back();
    },
    confim() {
      if (this.username) {
        this.changeRealName(this.username);
        let obj = {
          name: this.username
        };
        this.data.name = this.username;
        this.userInfoUpdate(this.data).then(res => {
          this.$router.push({
            name: "personalInformation"
          });
        });
      } else {
        this.$toast("Please enter your real name");
      }
    }
  }
};
</script>
<style lang="stylus"></style>
