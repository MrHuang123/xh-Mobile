<template>
  <div class="notificationCenter p-t-188">
    <xHeader title='Enterprise Interaction'  class="Interaction"/>
   
    <main class=''>
      <section class='w-per-100  p-f-xl-yt pos-t-100 z-100  h-88 o-x-a p-lr-20 list-container borderR'>
        <ul class='clearfix h-88 o-h ' id='ContainerLi' :style='{width:width+100+"px"}' >
          <li v-for='(item,index) in typeList' @click='tab(item.type)' :key='index'  class='h-88 f-c p-r f-l m-r-30' :class="{'m_r_5':index==2}">
             <p   class="f-s-24 f-w-400 f-f-PingFangSC-Regular c-999 p-r ">
               <span :class="{'c-333':cond==item.type,'f-w-600':cond==item.type}">{{item.name}}  ({{item.value}})</span>
               <span v-if='index==1&&type==2'  class="p-a-xr-yt span_possion w-16 h-16 b-r-circle bg-color-C63639"></span>
             </p>
            <transition name='fade'>
              <p v-if='cond==item.type' class='p-a-xc-yb w-per-100 h-4 bg-blue'></p>
            </transition>

          </li>
        </ul>
      </section>
      <attentionList v-show='cond=="1"'  ref='attentionList' />
      <receivedList v-show='cond=="2"' ref='receivedList' />
      <sentList v-show='cond=="3"' ref='sentList' />
    </main>
  </div>
</template>
<script>
// 消息中心
import { mapState, mapMutations, mapActions } from "vuex";
import xHeader from '@/layout/header'
import sentList from './sentList';
import receivedList  from './receivedList';
import attentionList  from './attentionList'
import { Icon, Cell, CellGroup, Tab, Tabs, Dialog ,List,PullRefresh,NavBar,SwipeCell,Button,NoticeBar} from "vant";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Dialog)
  .use(List)
  .use(PullRefresh)
  .use(NavBar)
  .use(SwipeCell)
  .use(Button)
  .use( NoticeBar);
export default {
  components: { 
    xHeader,
    sentList,
    receivedList,
    attentionList,
  },
  data() {
    return {
      active: 0,
      Cooperation: {},
      typeList:[
          {name:'Enterprises Followed',value:0,type:1},
          {name:'Business Cards Received',value:0,type:2},
          {name:'Business Cards Sent ',value:0,type:3},
      ],
      btotal:0,
      ctotal:0,
      cond:'1',
      width:400,
      type:'',
    };
  },
  computed: {
    ...mapState(["access_token", "appId", "userId"]),
    total(){
      return this.btotal + this.ctotal
    }
  },
  mounted() {
     window.addEventListener('resize',()=>{
        this.calcuateWidth();
    })
    this.calcuateWidth();
    this.$refs.attentionList.init()
    this.$refs.receivedList.init()
    this.$refs.sentList.init()
    this.cond = localStorage.notificationCenter_cond||1
  },
 beforeRouteLeave(to,from,next){
    if(to.name!=='detail'){
      localStorage.removeItem('notificationCenter_cond')
    }
    next();
  },
  methods: {
    // ...mapMutations("userCenter", ["changeRealName"]),
    ...mapActions("notificationCenter", ["msgList",'msgDelete']),
    getType(type){
      this.type = type
    },
    getAttentionListTotal(total){
       this.typeList[0].value = total
    },
    getReceivedList(total){
       this.typeList[1].value = total
    },
    getSentList(total){
       this.typeList[2].value = total
    },
    // 計算寬度
    calcuateWidth(){
      let width = 0;
      document.querySelector('#ContainerLi').querySelectorAll('li').forEach(item=>{
        width+=item.offsetWidth;
      })
      this.width = width;
      this.$nextTick(()=>{
        this.cond>1&&document.querySelector('.list-container').scrollTo(document.querySelector('#ContainerLi').querySelectorAll('li')[this.cond-1].offsetLeft-20,0)
      })
    },
    tab(type){
      this.cond = type
      this.$refs.attentionList.init()
      this.$refs.receivedList.init()
      this.$refs.sentList.init()
      localStorage.setItem('notificationCenter_cond',this.cond)
    },
  }
};
</script>
<style lang="stylus">

.notificationCenter 
  .Interaction
      display flex!important
      justify-content center!important
    .icon-left
      display none!important
  .m_r_5
    margin-right 5px!important;
  .van-list__finished-text
    display none
  .span_possion
    right -6px
    top -4px
  .border 
    border-bottom: 2px solid #f6f6f6
  .borderR
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  .van-tabs 
    padding-top: 88px;

    .van-tabs__wrap 
      height: 88px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);

      .van-tabs__line 
        background-color: #1C71B7;
        // width 80px!important
        height: 4px;
        transition-duration: 0s !important;
      

      .van-tab 
        height: 88px;
        line-height: 88px;
        color: #999999;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
      

      .van-tab--active 
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #333333;

        .span 
          color: #1C71B7;
        
      
    
  

</style>

