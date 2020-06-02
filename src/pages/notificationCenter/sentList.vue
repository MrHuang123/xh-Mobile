<template>
  <div class="sentListList">
    <section class="f-1 f-column p-b-180" v-if='bCardList.length>0'>
      <!-- <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" loading-text='loading...'  loosing-text='Release to refresh...'   pulling-text='Pull down to refresh...'> -->
          <van-list
            class="f-1  w-per-100 o-x-h"
            v-on='$listeners'
            :finished="upFinished"
            :offset="offset"
            finished-text=""
            loading-text="loading..."
            @load="currentPage>1 &&init()"
          >
            <div>
              <!-- <div  v-for="(v,index) in bCardList"   :key="index" class="w-per-100">
                 <van-swipe-cell  :right-width="60" class="f-b-c h-144  w-per-100" :on-close="onClose">
                    <div class="p-lr-32 h-144 w-per-100">
                       <router-link tag='div' :to='"/notificationCenter/detail/"+v.id+"/"+2' class="f-s-c  border h-144 w-per-100">
                          <div class="h-80 w-80 bg-linear-ellipse f-c b-r-circle m-r-24 m-b-2 p-r">

                              <div class="h-32 w-32 ">
                                  <Icon type="icon-enterprise" class="c-1C71B7 f-s-32 "/>
                              </div>
                          </div>
                          <div class="w-582">
                              <p   class="f-s-24 c-333 f-f-ArialMT l-h-32 white-2 m-b-12">{{v.companyName}}</p>
                              <p class="c-999 f-s-22 f-f-ArialMT l-h-24">{{v.date|enTime}}</p>
                          </div>
                      </router-link>
                    </div>
                    <div 
                    class="f-s-28 w-per-100 h-per-100 bg-color-C63639 c-fff f-c"
                    square
                    slot="right"
                    @click="id=v.id"
                    >
                        Delete
                    </div>
                  </van-swipe-cell>
              </div> -->
              <swipperDel :bCardList='bCardList' :type='2' ref='swipperDel'  @delItem='del'/>
            </div>
          </van-list>
      <!-- </van-pull-refresh> -->
    </section>
    <section v-else class="f-column f-c m-t-280">
        <div class="w-224 h-162 m-b-14">
          <img class="h-per-100 w-per-100" src="../../image/userCenter/certificationEmpty.png">
        </div>
        <!-- <p
          class="f-s-28 f-w-400 f-f-PingFangSC-Regular l-h-40"
        >You haven't received the company card</p> -->
      </section>
  </div>
</template>
<script>
//我的关注list
import { mapState, mapMutations, mapActions } from "vuex";
import swipperDel from '@/swipperDel/swipperDel.vue'    //滑动删除
export default {
  components:{
      swipperDel
  },
  data() {
    return {
        currentPage:1,
        pageSize:10,
        type:1,
        bCardList:[],
        total:0,
        isDownLoading: false, //下拉刷新
        isUpLoading:false,//
        offset: 100,
        id:'',
        imgUrl:[],
    };
  },
  computed: {
    ...mapState(["height"]),
    upFinished(){
      return this.bCardList.length >= this.total && this.total>0 ;
    }
  },
  mounted(){
    //   this.init();
  },
  methods: {
    ...mapActions("notificationCenter", ["msgList", "msgDelete","getBusinessCardsSent",'msgSendDelete']),
     ...mapActions("userCenter", ["focusCompanyList"]),
     onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: 'Are you sure you want to delete？',
            confirmButtonText:"confirm",
            cancelButtonText:'cancel'
          }).then(() => {
             this.msgSendDelete({
               id:this.id
             }).then(res=>{
                this.bCardList .map((item,index)=>{
                  if(this.id==item.id){
                    this.bCardList.splice(index,1)
                  }
                })
                this.$toast("Successful");
             })
          }).catch(() => {
          // on cancel
          });
          break;
      }
    },
    del(id){
      // console.log(id)
      this.$dialog.confirm({
            message: 'Are you sure you want to delete the selected data?',
            confirmButtonText:"confirm",
            cancelButtonText:'cancel'
          }).then(() => {
             this.msgSendDelete({
               id:id
             }).then(res=>{
                this.init();
                this.$refs.swipperDel.restSlide();
                this.$toast("Successful");
             })
          }).catch(() => {
            this.$refs.swipperDel.restSlide()
          });
    },
    initialization(){
            this.bCardList = [];
            this.currentPage = 1;
            // this.isUpLoading = true;//下拉加载中
            if(this.isUpLoading){
                this.init();
            }
    },
    //下拉刷新
    onRefresh(){
      this.currentPage = 1
      this.isDownLoading = true
      this.init()
    },
    //上拉加载
    // onLoadList(){
    //   this.currentPage++
    //   this.isUpLoading = true;
    //   this.init()
    // },
    init(page = this.currentPage){
        this.getBusinessCardsSent({
            currentPage: this.currentPage,
            pageSize: this.pageSize,
        }).then(res=>{
            this.bCardList = page == 1 ?res.data.list:this.bCardList.concat(res.data.list);
            this.total = res.data.total || 0;
            this.$parent.getSentList(this.total)
            this.isShow = this.bCardList.length>0?true:false
            if(this.bCardList&&this.bCardList.length>0){
              this.bCardList.map((item,index)=>{
                if(item.companyInfo){
                    let companyInfo = JSON.parse(item.companyInfo)
                    if(companyInfo.logo){
                      item.logo = companyInfo.logo
                    }
                  }
              })
            }
            res.data.list.length == this.pageSize && (this.currentPage+=1);
            this.isUpLoading= false;
        }).catch(()=>{
            this.isUpLoading= false;
        })
    },
  }
};
</script>
<style lang="stylus">
.sentListList
  .van-swipe-cell__left, .van-swipe-cell__right
    width 120px
</style>

