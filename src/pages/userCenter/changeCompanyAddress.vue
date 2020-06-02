<template>
  <div class="changeCompanyAddress p-r p-b-120">
    <!--  -->
    <van-nav-bar class="bg-linear-header" title="Enterprise Address">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <Icon slot="right" class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/>
    </van-nav-bar>
    <main class="p-t-16 p-lr-32">
      <section class="">
        <!-- <p class='l-h-40 f-s-28 c-999'>{{$route.query.address}}</p>
        <p class='  h-2 w-per-100 bg-color-eee m-t-10'></p> -->
        <!-- <textarea
          v-focusInput
          v-model="address"
          class="w-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
          placeholder="Please enter company address"
        >
        </textarea> -->
        <van-cell-group >
        <van-field
          :class="{focus:type==1}"
          v-model="address"
          class='b-no-lr b-no-t'
          type="textarea"
          maxlength="200"
          placeholder="Please enter enterprise address"
          rows="1"
          autosize
          @focus='type = 1'
          @blur='type=0'
        />
      </van-cell-group>
      </section>
      <!-- <section v-show="ucenterUserInfo.userState==1">
        <p
          class="f-s-24 h-34 l-h-34 f-w-400 c-ccc f-f-PingFangSC-Regular"
        >No modification after certification</p>
      </section> -->
    </main>
  </div>
</template>
<script>
// 修改公司地址
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
      type:0,
      address: "",
      data: {}
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
          this.data = res.data;
        }
      });
      if(this.$route.query.address){
        this.address = this.$route.query.address
      }
    },
    //返回
    back() {
      this.$router.back();
    },
    //确定
    confim() {
      this.data.address = this.address;
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
    line-height 1.5em
  }
  .van-cell {
    height: 100% !important;
    min-height: 88px !important;
    border-bottom: 1px solid rgb(238, 238, 238)!important;
  }
  .focus{

    border-bottom: 1px solid #1C71B7!important;
  }
}
</style>
