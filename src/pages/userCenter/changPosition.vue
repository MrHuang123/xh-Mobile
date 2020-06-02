<template>
  <div class="changeCompanyAddress p-r p-b-120">
    <!--  -->
    <van-nav-bar class="bg-linear-header" title="Title">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <Icon slot="right" class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/>
    </van-nav-bar>
    <main class="p-t-16 p-lr-32">
      <section class="h-90 p-r">
          <input
            v-focusInput
            v-model="position"
            maxlength="50"
            type="text"
            class="w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
            placeholder="Please enter your title"
          >
        </section>
      <!-- <section m-t-16  v-show="ucenterUserInfo.userState==1">
        <p
          class="f-s-24 h-34 l-h-34 f-w-400 c-ccc f-f-PingFangSC-Regular"
        >No modification after certification</p>
      </section> -->
    </main>
  </div>
</template>
<script>
// 修改职务
import xHeader from "@/layout/header";
import { Icon, Cell, CellGroup, NavBar } from "vant";
import { mapState, mapActions, mapMutations } from "vuex";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar);
export default {
  components: { xHeader },
  data() {
    return {
      position: "",
      data:{},
    };
  },
  computed: {
    ...mapState(["access_token"]),
    ...mapState("userCenter", ["ucenterUserInfo"])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations("userCenter", ["changeAdress"]),
    ...mapActions("userCenter", [
      "getUserInfo",
      "getUserCenterUserInfo",
      "userInfoUpdate"
    ]),
    init() {
      this.getUserCenterUserInfo(this.access_token).then(res => {
        if (res) {
          this.data = res.data
          this.position = res.data.position;
        }
      });
    },
    back() {
      this.$router.back();
    },
    confim() {
       this.data.position = this.position
        this.userInfoUpdate(this.data).then(res => {
          this.$router.push({
            name: "personalInformation"
          });
        });
    }
  }
};
</script>
<style lang="stylus">
.changeCompanyAddress {
  .van-cell-group {
    height: 100% !important;
    font-size: 28px !important;
    font-family: PingFangSC-Semibold !important;
    font-weight: 600 !important;
    color: rgba(153, 153, 153, 1) !important;
    line-height: 40px !important;
  }

  .van-field {
    height: 100% !important;
  }

  .van-cell {
    height: 100% !important;
    min-height: 88px !important;
  }
}
</style>
