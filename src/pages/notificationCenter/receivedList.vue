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
              <swipperDel :bCardList='bCardList' :type='1' ref='swipperDel'  @delItem='del'/>
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
        sUpLoading:false,
        offset: 100,
        id:'',
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
    ...mapActions("notificationCenter", ["msgList", "msgDelete","getReceive",'msgReceiveDelete',]),
     ...mapActions("userCenter", ["focusCompanyList"]),
    del(id){
      // console.log(id,2)
      this.$dialog.confirm({
            message: 'Are you sure you want to delete the selected data?',
            confirmButtonText:"confirm",
            cancelButtonText:'cancel'
          }).then(() => {
             this.msgReceiveDelete({
               id:id
             }).then(res=>{
                this.init()
                this.$refs.swipperDel.restSlide()
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
    init(page = this.currentPage){
        this.getReceive({
            currentPage: this.currentPage,
            pageSize: this.pageSize,
        }).then(res=>{
            this.bCardList = page == 1 ?res.data.page.list:this.bCardList.concat(res.data.page.list);
            this.total = res.data.page.total || 0;
            this.$parent.getType(res.data.type)
            this.$parent.getReceivedList(this.total)
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
            res.data.page.list.length == this.pageSize && (this.currentPage+=1);
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
  .span_possion
    right 6px
    top 4px
</style>