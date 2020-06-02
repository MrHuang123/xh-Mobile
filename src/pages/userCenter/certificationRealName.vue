<template>
  <div class="changeRealName p-r p-b-120">
    <!--  -->
    <van-nav-bar class="bg-linear-header" title="Real Name">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <Icon slot="right" class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/>
    </van-nav-bar>
    <main class="p-t-16 p-lr-32">
      <section class="h-90 p-r">
        <input
          v-focusInput
          v-model="name"
          type="text"
          class="w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
          placeholder="Please enter real name"
        >
      </section>
      <!-- <section class="p-lr-32" >
          <p class="f-s-24 h-34 l-h-34 f-w-400 c-ccc f-f-PingFangSC-Regular">No modification after certification</p>
      </section>-->
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
      name: ""
    };
  },
  computed: {
    ...mapState(["access_token"]),
    ...mapState("userCenter", ["certification", "userInfo", "ucenterUserInfo"])
  },
  mounted() {
    this.name = this.$route.query.name;
  },
  methods: {
    ...mapMutations("userCenter", ["changeRealName"]),
    // ...mapActions("userCenter", ["getUserInfo","getUserCenterUserInfo"]),
    back() {
      this.$router.back();
    },
    confim() {
      if (this.name) {
        sessionStorage.setItem("realName", this.name);
        this.$router.push({
          name: "certification",
        });
      }else{
        this.$toast("Please enter your real name");
      }
    }
  }
};
</script>
<style lang="stylus"></style>
