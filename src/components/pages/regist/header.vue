<template>
  <div class="regist_header">
    <header class="d-f f-s-c p-r h-280 w-per-100 p-l-48 p-r-48 bg m-b-20">
      <div class="p-a position h-32 w-32 color" @click="goBack">
        <Icon slot="left-icon"  type='icon-left' class="f-s-32 c-fff" />
      </div>
      <div class="w-per-100 h-120 f-s-c m-t-96 m-b-104">
        <div class="h-80 w-80">
          <img class="h-per-100 w-per-100"  src="../../../image/logo_r.png">
        </div>
        <p class="f-s-48 f-w-600 f-f-PingFangSC-Semibold m-l-24 c-fff">{{txt}}</p>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  props: {
    txt: {
      default: "",
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    //返回
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" >
.regist_header{
    .bg{
       background: url('../../../image/login/bg_2.png') no-repeat ;
       background-size: 100% 100%; 
    }
    .position{
      top:32px;
      left: 24px;
    }
}
</style>

