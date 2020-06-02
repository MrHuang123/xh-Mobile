<template>
  <div class="login_header">
    <header class="d-f f-s-c p-r h-400 w-per-100 bg p-l-48 p-r-48 m-b-20">
      <div class="w-440 h-132  m-t-106 ">
        <img class="h-per-100 w-per-100" src="../../../image/login/logo_1.png">
      </div>
    </header>
  </div>
</template>
<script>
export default {
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
.login_header {
   .bg{
       background: url('../../../image/login/bg_1.png') no-repeat ;
       background-size: 100% 100%; 
   }
  
  
}
</style>

