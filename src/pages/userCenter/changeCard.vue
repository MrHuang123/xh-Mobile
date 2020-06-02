<template>
  <div class="changeCard p-r p-b-120">
    <!--  -->
    <!-- <xHeader title="ID card No."/> -->
    <van-nav-bar class="bg-linear-header" :title="title">
      <Icon @click="back" slot="left" class="f-s-32 c-fff scale-50-active" type="icon-left"/>
      <Icon slot="right" class="f-s-32 c-fff scale-50-active" @click="confim" type="icon-pass1"/>
    </van-nav-bar>
    <main class="p-t-16 p-lr-32">
      <section class="h-90 p-r">
        <input
          v-focusInput
          v-model="cardNum"
          type="text"
          class="w-per-100 h-per-100 b-app b-no-lr b-no-t f-s-28 c-333 f-w-600"
          :placeholder="placeholder"
        >
      </section>
    </main>
  </div>
</template>
<script>
// 修改身份证号
import xHeader from "@/layout/header";
import { mapState, mapActions, mapMutations } from "vuex";
import pattern from "../../utils/pattern.js";
import { Icon, Cell, CellGroup, NavBar } from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(NavBar);
export default {
  components: { xHeader },
  data() {
    return {
      cardNum: "",
      cardType: 1,
      placeholder: "",
      title: ""
    };
  },
  computed: {
    ...mapState(["access_token"]),
    ...mapState("userCenter", [])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations("userCenter", ["changeCard"]),
    init() {
      this.cardNum = this.$route.query.cardNum;
      this.cardType = this.$route.query.cardType;
      if (this.$route.query.cardType == 1) {
        this.title = "ID Card No.";
        this.placeholder = "Please enter ID card No.";
      } else {
        this.title = "Passport No.";
        this.placeholder = "Please enter Passport No.";
      }
    },
    back() {
      this.$router.push({
        name: "certification",
        query: {
          cardType: this.cardType
        }
      });
    },
    confim() {
      if (this.cardNum) {
        if (pattern.passportNum.test(this.cardNum)) {
          if(this.cardType==1){
            let idCardData = JSON.parse(sessionStorage.idCardData)
            idCardData.cardNum= this.cardNum 
            sessionStorage.setItem('idCardData',JSON.stringify(idCardData))
          }else{
            let passportData = JSON.parse(sessionStorage.passportData)
            passportData.cardNum= this.cardNum 
            sessionStorage.setItem('passportData',JSON.stringify(passportData))
          }
          this.$router.push({
            name: "certification",
          });
        }else{
          this.$toast("The number format is not correct");
        }
      } else {
        if (this.cardType == 1) {
          this.$toast("Please enter your id number");
        } else {
          this.$toast("Please enter your passport number");
        }
      }
    }
  }
};
</script>
<style lang="less" >
.my {
  .border {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
}
</style>
