<template>
  <div class='p-home f-column p-lr-30 p-b-140' >
    <section class='m-t-60 f-column justify-a '>
      <div class="f-l">
        <img src="../../image/logo_white.png" class='f-l h-60 w-274 m-t-2'>
        <div class='f-c h-60 f-l m-l-20 ' >
          <a href='http://m.credit100.com' class='d-f f-c h-50 w-60 b-r-4 b-toggle-cn' >
            <span class="f-s-24 c-fff">CN</span>
          </a>
        </div>
        <!-- <router-link to="/international/home" class="f-r f-s-24 c-fff edition">
          International Edition
          <img src="../../image/international/arrow.png">
        </router-link> -->
      </div>
      <p class='f-s-48 c-fff w-b-600 break-word m-t-60'>Credit Wins The Future</p>
    </section>
    <section class='f-1  m-t-20 o-h'>
      <div class="m-b-30 l-h-28">
        <span @click.stop="onGoCh" class="itabn m-r-16 l-h-28" :class="{act:!isInter}">Chinese Credit</span>
        <span class="m-r-16 c-fff l-h-28" style="opacity:0.2;">|</span>
        <span @click.stop="onGoInter" class="itabn l-h-28" :class="{act:isInter}">International Credit</span>
      </div>
      <div class='h-88 bg-fff b-r-8 o-h f-b-c p-lr-25'>
        <input v-model="keyWord" @keyup.enter='!!keyWord && jumpToSearch(keyWord)' type="text" x-webkit-speech   placeholder="Please enter key words" class='f-1 m-r-5' id='input' />
        <Icon @click='!!keyWord && jumpToSearch(keyWord)' type='icon-search' class='c-blue2 f-w-600 f-s-30 scale-80-active' />
      </div>
      <div class=' m-t-40 clearfix'>
        <!-- <router-link tag='span' v-for='(item,index) in hotWords' :to='"/brand/"+item.companyId+"/"+item.id+"/"+item.type' :key='index'  class='o-40 m-r-20 m-t-10 h-50 scale-80-active f-c f-l bg-color-000 p-lr-20 b-r-24 white-1' :style='{maxWidth:width-60+"px"}'>
          <span  class='f-s-24 c-fff white-1'>{{item.nameEn}}</span>
        </router-link> -->
        <span v-for='(item,index) in hotWords' @click.stop='()=>jumpToSearch(item.show_hotword||item.hotword)' :to='"/brand/"+item.companyId+"/"+item.id+"/"+item.type' :key='index'  class='o-40 m-r-20 m-t-10 h-50 scale-80-active f-c f-l bg-color-000 p-lr-20 b-r-24 white-1' :style='{maxWidth:width-60+"px"}'>
          <span  class='f-s-24 c-fff white-1'>{{item.hotword}}</span>
        </span>
      </div>
      <div class='clearfix m-t-30'>
        <dl v-for='(item,index) in statisticalData' :key='index' class="w-per-50 f-l h-100 p-l-20 m-t-50">
            <dt class='l-h-56 f-s-40 c-fff f-w-600'>
              {{item.value}}
            </dt>
            <dd class='m-t-8 l-h-32 c-fff-70 f-s-22 break-word'>
              {{item.label}}
            </dd>
        </dl>
      </div>
      <div class="w-per-100 h-120 m-t-60 m-b-60 ">
					<van-swipe :autoplay="3000"  >
            <van-swipe-item class="overflow-h p-1"> 
               <router-link to="/home/vendorquery">
                  <!-- <div class="index_brand2 w-per-100 h-per-100">
                    <div class="box"> 
                      <p>INQUIRY FOR CHINESE PERSONAL PROTECTIVE</p>
                      <p>EQUIPMENT MANUFACTURERS</p>
                    </div>
                  </div> -->
                  <img class="w-per-100 h-per-100" src="../../image/bg/index_brand2.png">
               </router-link>
            </van-swipe-item>
						<van-swipe-item class="overflow-h p-1"> 
               <router-link to="/summitOverview">
                  <img class="w-per-100 h-per-100" src="../../image/international/summit.png">
               </router-link>
            </van-swipe-item>
            <van-swipe-item class="overflow-h p-1"> 
               <router-link to="/nationalBrandList">
                  <img class="w-per-100 h-per-100" src="../../image/bg/index_brand.png">
               </router-link>
            </van-swipe-item>
					</van-swipe>
				</div>
        <!-- <router-link to="/summitOverview">
          <img class="w-per-100 m-t-60 m-b-60" src="../../image/international/summit.png">
        </router-link> -->
        
        <!-- <span to="/summitOverview">
          <img class="w-per-100 m-t-60 m-b-60" src="../../image/international/summit.png">
        </span> -->
    </section>
  </div>
</template>
<script>
import { mapState, mapActions,mapMutations } from 'vuex'
import { requestGetyNationalBrandList } from '*/request/axios.credit'
import { Swipe, SwipeItem} from 'vant';
import {searchApi} from '../../request/axios.search';
import splitArr from '../../utils/splitArr.js';
Vue.use(Swipe).use(SwipeItem);
export default {
  data(){
    return {
      isInter:false,
      keyWord:'',
      allWords:[
      ],
      statisticalData:[
        {
          label:'Blacklists and Redlists',
          value:'6 million+'
        },
        {
          label:'Chinese Enterprises',
          value:'60 million+'
        },
        {
          label:'Countries and Regions',
          value:'230+'
        },
        {
          label:'Overseas Enterprises',
          value:'200 million+'
        },
      ],
      

    }
  },
  beforeCreate(){
    if(sessionStorage.hotwordNum){
      let num = sessionStorage.getItem('hotwordNum')
      num++
      sessionStorage.hotwordNum = num
    }else{
      sessionStorage.setItem('hotwordNum',0)
    }
  },
  beforeRouteEnter(to,from,next){
    if(history.length==1&&!!localStorage.shareLink){
      history.replaceState({},'',localStorage.shareLink)
    }
    next()
  },
  computed:{
    ...mapState(['width']),
    hotWords(){
      let hotWords = this.allWords
      let hotwordArr = []
      if(hotWords.length>6){
        let yuNum = !!hotWords?hotWords.length%6:0;
        let arr_1 = hotWords.slice(0,6-yuNum)
        const arr = splitArr(hotWords.concat(arr_1),6)
        let hotwordNum = sessionStorage.hotwordNum
        if(hotwordNum>arr.length-1){
          sessionStorage.hotwordNum = 0
          hotwordArr = arr[0]
        }else{
          hotwordArr = arr[hotwordNum]
        }
      }else{
        hotwordArr = hotWords
      }
      return hotwordArr;
    },
  },
  created(){
    this.getBrandList();
  },
  mounted(){
    // this.setWxShare();
  },
  methods:{
    ...mapActions(['setWxShare']),
    ...mapMutations(['setIsInter']),
    jumpToSearch(keyWord){
      // console.log(keyWord)
      localStorage.keyWord = keyWord;
      this.$router.push({path:"/credit/search"})
    },
    
    async getBrandList(){
      this.allWords = await searchApi.queryHotWordsAsync('国内热词');
      // requestGetyNationalBrandList()
      //   .then(res=>{
      //     this.allWords = res.data
      //   })
    },
    onGoCh(){

    },
    onGoInter(){
      //this.$emit('ihome');
      this.$router.push('/home/international');
      this.setIsInter(true);
    }
  }
}
</script>
<style lang="stylus">
.p-home
  min-height 100vh
  background url('../../image/bg/bg_home.jpg') no-repeat center center 
  background-size 100% 100%
  >section:first-child
    padding-bottom 5%
  .b-toggle-cn
    border 1px solid rgba(255,255,255,.4)
  .edition
    position relative
    height .64rem
    line-height .64rem
    padding-left .12rem
    padding-right .4rem
    background rgba(255,255,255,.15);
    border-radius .08rem
    img 
      position absolute
      top .25rem
      right .16rem
      width .12rem
      height .16rem
  .overflow-h 
    overflow hidden
  .index_brand2
    background url('../../image/bg/index_brand2.png') center center no-repeat;
    background-size 100% 100%;
    box-sizing border-box
    display flex
    align-items center
    flex-wrap wrap
    .box{
      p{
        padding-left 88px;
        font-size:28px;
        margin-bottom 0!important;
        width 100%;
        font-family:Arial;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:40px;
      }
    }
  .van-swipe
      height 120px
      width 100%
      overflow visible
      .van-swipe__indicators
        bottom -25px!important
        z-index 1000!important
        .van-swipe__indicator
          width 12px!important
          height 12px!important
          background:rgba(255,255,255,1);
          opacity:0.5;
          border-radius: 50%
        .van-swipe__indicator--active
          background:rgba(255,255,255,1);
          opacity:1;
        .van-swipe__indicator:not(:last-child) {
          margin-right: 16px!important;
}
</style>
<style scoped>
.itabn{
  color:rgba(255,255,255,0.7);
  cursor: pointer;
}
.itabn.act{
  color:rgba(255,255,255,1);
}
</style>

