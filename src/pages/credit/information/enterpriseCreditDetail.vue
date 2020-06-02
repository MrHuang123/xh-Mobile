<template>
  <div class="enterpriseCreditDetail p-r w-per-100">
      <header class="t-c">
        <h3 class="f-s-44 p-5 f-b-600 p-b-20 t-c">{{data.title}}</h3>
        <p class="f-s-14 l-h-20 c-333  b-b-eee">
          <span>
              <span>Publish Type：</span>
              <span>{{data.type | issueTypeFilter}}</span>
          </span>
        </p>
        <p class="f-s-14 l-h-20 c-333 p-b-20 b-eee b-no-lr b-no-t">
           <span>
              <span>Published：</span>
              <span>{{data.createTime|enTime}}</span>
          </span>
        </p>
      </header>
      <main class="">
          <section class="p-lr-32 p-tb-40 border" v-if='data.type=="2"'>
              <p class="l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10 f-s-24 f-w-600 f-f-PingFangSC-Semibold">Enterprise Name</span>
                <span class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular">
                  {{companyData.companyName?companyData.companyName:'-'}}
                </span>
              </p>
              <p class=" l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10 f-w-600 f-f-PingFangSC-Semibold">Unified Social Credit Code</span>
                <span class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular">
                  {{companyData.creditCode?companyData.creditCode:'-'}}
                </span>
              </p>
              <p class="l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10 f-w-600 f-f-PingFangSC-Semibold">Date of Establishment</span>
                <span class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular" v-if='companyData.createTime'>
                  {{companyData.createTime|enTime}}
                </span>
                <span v-else class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular">-</span>
              </p>
              <p class=" l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10 f-w-600 f-f-PingFangSC-Semibold">Legal Representative</span>
                <span class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular">
                  {{companyData.operName?companyData.operName:'-'}}
                </span>
              </p>
              <p class=" l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10 f-w-600 f-f-PingFangSC-Semibold">Registered Capital</span>
                <span class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular" v-if='companyData.registCapi'>
                  {{companyData.registCapi?companyData.registCapi:'-'}}
                </span>
              </p>
              <p class=" l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10  f-w-600 f-f-PingFangSC-Semibold">Company Type</span>
                <span class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular">
                  {{companyData.econKind?companyData.econKind:'-'}}
                </span>
              </p>
              <p class=" l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10 f-w-600 f-f-PingFangSC-Semibold">Industry</span>
                <span class="f-s-24 f-1 m-l-10f-w-400 f-f-PingFangSC-Regular">
                  {{companyData.industry?companyData.industry:'-'}}
                </span>
              </p>
               <p class=" l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10 f-w-600 f-f-PingFangSC-Semibold">Registered Address</span>
                <span class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular">
                  {{companyData.address?companyData.address:'-'}}
                </span>
              </p>
               <p class="l-h-34 m-b-24">
                <span class="f-s-24 w-per-100 d-i-b m-b-10  f-w-600 f-f-PingFangSC-Semibold">Company's Official Website</span>
                <span class="f-s-24 f-1 m-l-10 f-w-400 f-f-PingFangSC-Regular">
                  {{companyData.officialWebsite?companyData.officialWebsite:'-'}}
                </span>
              </p>
          </section>
          <section class="p-lr-32 m-b-50">
             <p
             v-if='data.type=="2"'
            class="f-s-c l-h-40 h-40 f-s-28 f-w-600 f-f-PingFangSC-Semibold c-0089D1 m-b-24 circle "
             >Credit Demonstration</p>
             <div class="w-per-100 h-450 m-b-40" v-if="data.promotionalVideoUrl">
                  <video class="h-per-100 w-per-100" controls >
                    <source :src="data.promotionalVideoUrl" type="video/mp4" />
                    您的浏览器不支持
                  </video>
              </div>
              <div class="imgBox b-r-8 bg-color-fff p-20" v-if='!!data.requestCompanyImages&&data.requestCompanyImages.length>0'>
                <van-swipe class="w-per-100 h-per-100 van-swipe" :autoplay="300000000000000" :show-indicators="false" :touchable="true" :initial-swipe="imgIndex">
                  <van-swipe-item v-for="(item, index) in data.requestCompanyImages" :key="index">
                    <img @click='previewImg(index)' :v-lazy="item.logoFile" :src="item.url"/>
                    <div class="imgNoBox p-a b-r-16 c-fff p-lr-16">{{index+1}}/{{data.requestCompanyImages.length}}</div>
                  </van-swipe-item>
                </van-swipe>
              </div>
              <div class="p-t-20 p-b-120">
                <div class="ql-editor" v-if='data.content' v-html="data.content"></div>
            </div>
          </section>
      </main>
  </div>
  
</template>
<script>
import { selectReleaseDetail,getCompanyInfo} from '../../../request/axios.credit';
import { Swipe, SwipeItem, ImagePreview, Lazyload} from 'vant';
Vue.use(Swipe).use(SwipeItem).use(ImagePreview);
export default {
  // name:'creditDetail',
  data(){
    return{
      imgIndex:0,
      data:{
        title:'',
        companyId:'',
      },
      companyData:{
        econKind:'',
      },
      images:[],
    }
  },
  async mounted(){
    // !!this.$route.query.title&&this.updateWxShareTitle({wxShareTitle:this.$route.query.title})
    !!this.$route.query.title&&this.setWxShare({wxShareTitle:`${this.$route.query.title}`})
    this.init()
  },
  methods:{
    previewImg(index){
			ImagePreview({
				images: this.images,
				startPosition: index,
			})
		},
    async init(){
      try{
        this._loading()
        await this.selectReleaseDetail()
         Vue.prototype.$toast.clear()
      }catch(err){
         Vue.prototype.$toast.clear()
        console.log(err)
      }
    },
    //获取公司信息
    getCompanyInfo(){
      getCompanyInfo({
        id:this.data.companyId
      }).then(res=>{
        if(res.code == 200){
          this.companyData = res.data
        }
      })
    },
    //获取发布详情
    selectReleaseDetail(){
      selectReleaseDetail({
        releaseId:this.$route.params.id
      }).then(res=>{
        if(res.code == 200){
            this.data = res.data
            if(!!this.data.requestCompanyImages&&this.data.requestCompanyImages.length>0){
              this.data.requestCompanyImages.map((item,index)=>{
                this.images.push(item.url)
              })
            }
            this.getCompanyInfo()
        }
      }).catch(err=>{
         Vue.prototype.$toast.clear()
      })
    }
  },
  beforeRouteEnter(from,to,next){
    next(vm=>{vm.isShow=true})
  },
  beforeDestroy(){
    this.isShow = false;
  },
  filters:{
      issueTypeFilter(value){
          let res = '-';
          const val = value*1;
          switch(val){
              case 0:
                  res = "Product Release";
                  break;
              case 1:
                  res = "Notice";
                  break;
              case 2:
                  res = "Credit Demonstration";
                  break;
              case 3:
                  res = "Others";
                  break;
          }
          return res;
      }
  }
}
</script>

<style lang="stylus">
.enterpriseCreditDetail
  .circle:before
    content: '';
    margin-right : 14px;
    display: table;
    width: 12px;
    height: 12px;
    background: #1C71B7;
    border-radius: 50%;
  .imgBox
    width 686px
    height 450px
    .van-swipe
      width 100%
      height 410px
      img
        width 100%
        height 410px
      .imgNoBox
        background rgba(0,0,0,0.44)
        right 20px
        bottom 20px
  .ql-editor
    width 100%
    img 
      max-width 100%
</style>
