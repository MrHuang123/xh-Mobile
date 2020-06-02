<template>
  <div class='p-five' >
    <!--:autoplay="5000" -->
    <van-swipe style="height:100%" vertical>
      <van-swipe-item>
          <router-link to="./home.vue">
            <img class="logo" src="../../image/summit/publicity/page1_logo.png">
          </router-link>
          <div class="width-per-90"><img class="words" src="../../image/summit/publicity/page1_words.png"></div>
          <img class="bottom" src="../../image/summit/publicity/page1_bottom.png">
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgbox"><img class="words" src="../../image/summit/publicity/page2.png"></div>
        <!-- <router-link to="./home.vue">Home</router-link> -->
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgbox"><img class="words" src="../../image/summit/publicity/page3_words.png"></div>
        <img class="bg" src="../../image/summit/publicity/page3_bg.png">
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgbox">
          <a href="http://em.credit100.com/brand/5110cf62c31cca0be281ed4811ca58b7/2c9d8b99683282cc016836a2b73101d5"><img class="words" src="../../image/summit/publicity/page4_top.png"></a>
          <a href="https://em.credit100.com/credit/58037e49939bef870af94d2402afdf03/enter/home">
            <img   class="words m-t-70" src="../../image/summit/publicity/page4_bottom.png">
          </a>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgbox">
          <img class="words" src="../../image/summit/publicity/page5_bg.png">
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgbox">
          <a href="https://em.credit100.com/credit/infor/index">
            <img class="words" src="../../image/summit/publicity/page6_bg.png">
          </a>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgbox">
          <img class="words" src="../../image/summit/publicity/page7_bg.png">
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgbox">
          <img class="words" src="../../image/summit/publicity/page8_bg.png">
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="imgbox">
          <img class="words" src="../../image/summit/publicity/code.png">
          <a href="https://em.credit100.com">
            <img class="words code" src="../../image/summit/publicity/page9_words.png">
          </a>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem, ImagePreview } from 'vant';
Vue.use(Swipe).use(SwipeItem).use(ImagePreview);

export default {
  data(){
    return {
      allImg:[{}],
    }
  },
  computed:{
  },
  mounted(){
    // this.updateWxShareTitle({wxShareTitle:'新华信用【英文版】上线啦~',wxShareDesc:'【新华信用】权威专业可靠的信用信息查询和发布平台'})
    this.setWxShare({wxShareTitle:'新华信用【英文版】上线啦~',wxShareDesc:'【新华信用】权威专业可靠的信用信息查询和发布平台'})
  },
  created(){
  },
  methods:{
  }
}
</script>
<style lang="stylus" >
.p-five
  position fixed
  left 0
  top 0
  height 100%
  overflow hidden
  z-index 1999
  .van-swipe-item
    background #000
    color #fff
    .logo
      width 3.96rem
    .imgbox
      display table-cell
      vertical-align middle
      .words
        width 100%
    &:nth-child(1)
      padding .7rem .68rem
      background url('../../image/summit/publicity/page1_bg.png') no-repeat center center 
      background-size 100% 100%
      .words
        width 5.9rem
        margin-top 3.18rem
      .bottom
        position fixed
        left .68rem
        bottom .62rem
        width 6.32rem
    &:nth-child(2)
      padding .7rem .38rem .7rem .46rem
      display table
      background #fff
    &:nth-child(3)
      padding .7rem .66rem .72rem .4rem
      display table
      background #fff
      .bg
        position fixed
        left 0
        bottom 0
        width 100%
    &:nth-child(4)
      padding .7rem .66rem .7rem .68rem
      display table
      background linear-gradient(180deg,rgba(60,153,219,1) 0%,rgba(25,64,139,1) 100%);
    &:nth-child(5)
      padding .7rem .66rem .7rem .68rem
      display table
      background #fff
    &:nth-child(6)
      padding .6rem .44rem .6rem .46rem
      display table
      background linear-gradient(180deg,rgba(60,153,219,1) 0%,rgba(25,64,139,1) 100%);
    &:nth-child(7)
      padding .6rem .44rem .6rem .46rem
      display table
      background #fff
    &:nth-child(8)
      padding .64rem .18rem .64rem .16rem
      display table
      background linear-gradient(180deg,rgba(60,153,219,1) 0%,rgba(25,64,139,1) 100%);
    &:nth-child(9)
      padding 3.86rem 2.2rem 3.86rem 2.2rem
      background url('../../image/summit/publicity/page9_bg.png') no-repeat center center 
      background-size 100% 100%
      display table
      text-align center
      .code
        width 5.02rem
        margin-top 1.12rem
  .van-swipe__indicators
    display none
</style>

