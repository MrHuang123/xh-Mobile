<template>
  <div class="attentionList">
    <section class="f-1 f-column p-b-180" v-if='bCardList.length>0'>
      <!-- <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" loading-text='loading...'  loosing-text='Release to refresh...'   pulling-text='Pull down to refresh...'> -->
          <van-list
            class="f-1 p-lr-30 w-per-100"
            :finished="upFinished"
            :offset='100'
            finished-text=""
            loading-text="loading..."
            @load="currentPage>1 &&init()"
          >
            <div>
              <div  v-for="(v,index) in bCardList"   :key="index" class="">
                <div class="f-s-c h-144 border">
                  <img v-if="v.logo" class="h-80 w-80 b-r-circle m-r-24"  :src="v.logo">
                  <div v-else class="h-80 w-80 bg-linear-ellipse f-c b-r-circle m-r-24 m-b-2">
                    <div class="h-32 w-32 ">
                        <Icon type="icon-enterprise" class="c-1C71B7 f-s-32 "/>
                    </div>
                  </div>

                  <div class="w-400 m-r-70">
                      <p  @click="goDetail(v)"  :to='"/credit/"+v.companyId+"/enter/home"'  class="f-s-24 c-333 f-f-ArialMT l-h-32 white-2">{{v.companyName}}</p>
                  </div>
                  <div class="f-b-c">
                      <!-- <Icon type="icon-dimingpian" class="c-32BA59 f-s-32 m-r-48"/> -->
                      <vEntry :id='v.companyId' @click="sendCard" :source='v.source' :companyInfo='v.companyInfo?v.companyInfo:{}' :companyInfoData='v'>
                        <Icon type="icon-dimingpian" class="c-32BA59 f-s-32 m-r-48"/>
                      </vEntry>
                      <Icon type="icon-like"   class="c-red f-s-32" @click="unfollow(v)"/>
                  </div>
                </div>
              </div>
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
import {requestToggleFocus,requestIsFocusCompany,getUserIsCert} from '../../request/axios.userCenter';
import vEntry from '@/entry/index.vue'
export default {
  components:{vEntry},
  data() {
    return {
        currentPage:1,
        pageSize:10,
        type:1,
        bCardList:[],
        total:0,
        isDownLoading: false, //下拉刷新
        isUpLoading:false,
        imgUrl:[],
        timer:null,
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
     ...mapActions("notificationCenter", ["msgList", "msgDelete"]),
     ...mapActions("userCenter", ["focusCompanyList"]),
     //发送名片
     async sendCard(){
       console.log(11111)
     },
    //前往详情
    goDetail(item){
      if(item.source == 2){
        let obj = JSON.parse(item.companyInfo)
        let obj_1 = {
          ...obj,
          companyName:obj.name,
          country:obj.countryCode,
          address:obj.registrationAddress,
        }
        this.$router.push({
            path:'/international/details',
        })
        localStorage.setItem("internationalDetails", JSON.stringify(obj_1));
      }else{
        this.$router.push(`/credit/${item.companyId}/enter/home`)
      }
    },
    unfollow(item) {
      var that = this
      this.$dialog
        .confirm({
          message: "Are you sure you want to delete the selected data?",
          confirmButtonText:"confirm",
          cancelButtonText:'cancel'
        })
        .then(() => {
            var  obj = {}
            if(item.source == 1){
              obj = {
                companyId: item.companyId,
                source:item.source//关注来源：英文版1 国际版2
              }
            }else if(item.source == 2){
              obj = {
                companyId: item.companyId,
                companyName: item.companyName,
                source:item.source,//关注来源：英文版1 国际版2
                address:item.address
              }
            }
            requestToggleFocus(obj).then(()=>{
                // that.init();
                that.bCardList.map((i,index)=>{
                  if(i.companyId == item.companyId){
                    that.bCardList.splice(index,1)
                    that.total--
                    that.$parent.getAttentionListTotal(that.total)
                  }
                })
                this.$toast("Successful");
            })
        })
        .catch(() => {
          // on cancel
        });
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
    getFocusCompanyList(){
      var that = this
      this.focusCompanyList({
            currentPage: this.currentPage,
            pageSize: this.pageSize,
        }).then(res=>{
            that.bCardList = this.currentPage == 1 ?res.list:that.bCardList.concat(res.list);
            that.total = res.total || 0;
            that.$parent.getAttentionListTotal(that.total)
            if(that.bCardList&&that.bCardList.length>0){
                that.isShow = true
                that.bCardList.map((item,index)=>{
                    if(item.type == 1){
                        item.typeName = 'Recieved a business card'
                    }
                    if(item.companyInfo){
                      let companyInfo = JSON.parse(item.companyInfo)
                      if(companyInfo.logo){
                        item.logo = companyInfo.logo
                      }
                    }
                })
            }
            res.list.length == that.pageSize && (that.currentPage+=1);
            that.isUpLoading= false;
        }).catch(()=>{
            that.isUpLoading= false;
        })
    },
    init(page = this.currentPage){
        this._loading()
        if(!this.timer){
          this.timer = setTimeout(() => {
              this.getFocusCompanyList()     //请求数据的方法
              this.timer = null;
          }, 500)
        }
    },
  }
};
</script>
