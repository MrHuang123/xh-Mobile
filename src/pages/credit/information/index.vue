<template lang='jade'>
  .p-credit-info-index.p-b-180
    van-swipe(v-bind:autoplay="3000")
      van-swipe-item.swipe-info(v-for="(item, index) in newList" v-bind:key="index" )
        router-link.h-450.p-r(tag='section' v-bind:to='{path:"/credit/infor/detail/"+encodeURIComponent(item.artUrl),query: {title:item.title}}')
          img.h-per-100.w-per-100(v-lazy="item.logoFile" )
          div.p-lr-30.p-tb-25.p-a-xl-tb.summary.w-per-100
            p.f-s-32.l-h-40.f-w-600.c-fff.white-2 {{item.title}}
    section.m-t-40.p-lr-30(v-for='(item,index) in allCreditList' v-bind:key='index')
      router-link.h-30.f-b-c(:to='"/credit/infor/list/"+index' tag='header')
        p.d-f.align-c 
          span.w-4.h-22.bg-color-blue.b-r-4.m-r-10
          span.f-s-28.c-333.f-w-600 {{index}}
        Icon.f-s-30.c-999(type='icon-right')
      main.f-b-c.m-t-25
        dl.w-per-50.m-r-5(v-for='(unit,$i) in item.slice(0,2)' v-bind:key='$i' tag='dl' @click='goDetail(unit)'  v-bind:to='{path:"/credit/infor/detail/"+encodeURIComponent(unit.artUrl?unit.artUrl:unit.picLinks),query: {title:unit.title}}')
          dt.f-1
            img.b-r-4.w-per-100.h-204(v-lazy='unit.artUrl?unit.picLinks:(unit.companyId||unit.id)?unit.coverUrl:unit.logoFile')
          dd.p-r-40.f-1
            h3.w-o-2.w-per-100.f-s-28.l-h-36.h-72.f-w-600.c-333.m-t-15 {{unit.title}}
            p.f-s-22.c-999.m-t-15(v-if='unit.artUrl') {{unit.pubTime | convertUTC}}
            p.f-s-22.c-999.m-t-15(v-else-if='unit.companyId||unit.id') {{unit.auditTime | enTime}}
            p.f-s-22.c-999.m-t-15(v-else) {{unit.publishDate | enTime}}
      hr.b-no.h-2.bg-color-F6F6F6.m-t-40
    section.m-t-40.p-lr-30
      header.h-30.f-b-c
        p.d-f.align-c 
          span.w-4.h-22.bg-color-blue.b-r-4.m-r-10
          span.f-s-28.c-333.f-w-600 Top Views
      main
        ul 
          router-link.p-r.m-t-25.p-l-65(v-for='(item,index) in rankBottom' v-bind:key='index' tag='li' v-bind:to='{path:"/credit/infor/detail/"+encodeURIComponent(item.artUrl?item.artUrl:item.picLinks),query: {title:item.title}}')
            img.p-a-xl-yc.w-40.h-45(v-if='index==0' src='../../../image/icon/icon_rank_1.png')
            img.p-a-xl-yc.w-40.h-45(v-else-if='index==1' src='../../../image/icon/icon_rank_2.png')
            img.p-a-xl-yc.w-40.h-45(v-else-if='index==2' src='../../../image/icon/icon_rank_3.png')
            span.p-a-xl-yc.f-c.bg-color-ccc.h-40.w-40.b-r-circle(v-else)
              span.c-fff.f-s-24 {{index+1}}
            dl.d-f
              dt 
                img.w-272.h-164.b-r-4(v-lazy='item.artUrl?item.picLinks:item.logoFile')
              dd.p-l-25
                h3.white-3.f-s-28.l-h-36.f-w-600 {{item.title}}
                p.f-s-22.c-999.m-t-15(v-if='item.artUrl'){{item.pubTime | convertUTC}}
                p.f-s-22.c-999.m-t-15(v-else){{item.publishDate | enTime}}
    section.p-lr-30.m-t-80(v-if='adverList.length>0')
      //- van-swipe(v-bind:autoplay="3000")
      //-   van-swipe-item.swipe-info(v-for="(item, index) in adverList" v-bind:key="index" )
      //-     router-link.h-412.p-r(:to='"/credit/infor/detail/"+encodeURIComponent(item.artUrl)' tag='section')
      //-       img.h-per-100.w-per-100.b-r-4(v-lazy="item.picLinks")
      div.h-412.w-per-100(@click='goNation')
        img.h-per-100.w-per-100.b-r-4(src='../../../image/bg/bg_nation_brands.jpg')
    section.m-t-62
      header.h-30.f-b-c.p-l-30
        p.d-f.align-c 
          span.w-4.h-22.bg-color-blue.b-r-4.m-r-10
          span.f-s-28.c-333.f-w-600 Xinhua Credit Originals
      main.o-y-h.o-x-a.scroll-none
        ul.clearfix(style='margin-right:-4000px')
          router-link.p-r.w-400.h-245.f-l.xinhua-item.f-c(
              v-for='(item,index) in xinhuaList'
              v-bind:key='index'
              tag='li' 
              v-bind:to='{path:"/credit/infor/detail/"+encodeURIComponent(item.artUrl?item.artUrl:item.picLinks),query: {title:item.title}}'
            )
            img.h-48.w-48.p-a-xl-yt.m-l-40.m-t-10(src='../../../image/icon/icon_logo.png' )
            p.l-h-36.white-3.f-s-28.w-300.f-w-600.white-1 {{item.title}}
    section.p-lr-30
      hr.b-no.h-2.bg-color-F6F6F6.m-t-40
      header.h-30.f-b-c.m-t-40
        p.d-f.align-c 
          span.w-4.h-22.bg-color-blue.b-r-4.m-r-10
          span.f-s-28.c-333.f-w-600 Spotlight
      main
        ul 
          router-link.p-r.m-t-25(v-for='(item,index) in rankTop' v-bind:key='index' tag='li' v-bind:to='{path:"/credit/infor/detail/"+encodeURIComponent(item.artUrl?item.artUrl:item.picLinks),query: {title:item.title}}')
            dl.d-f
              dt 
                img.w-272.h-164.b-r-4(v-lazy='item.artUrl?item.picLinks:item.logoFile')
              dd.p-l-25
                h3.white-3.f-s-28.l-h-36.f-w-600 {{item.title}}
                p.f-s-22.c-999.m-t-15(v-if='item.artUrl'){{item.pubTime | convertUTC}}
                p.f-s-22.c-999.m-t-15(v-else){{item.publishDate | enTime}}

</template>
<script>
import { getNewstColumn ,requestSelectAllColumn ,getChinaBrandsColumn,getChinaProjectColumn,getCompanyColumn, getColumnList_2 ,getAdvertList,getNewArticleList,getReleaseList} from '*/request/axios.credit.js';

import axios from 'axios'
import { Swipe, SwipeItem,Lazyload } from 'vant';

Vue.use(Swipe).use(SwipeItem).use(Lazyload,{
    error:require('../../../image/format.png')
});

export default {
  name:'creditIndex',
  data(){
    return {
      newList:[],
      allCreditList:{},
      rankTop:[],
      rankBottom:[],
      xinhuaList:[],
      adverList:[],
      option:{
        error:require('../../../image/format.png')
      },
      ChinaBrands:{},
      ChinaProject:{},
      Company:{},
      enterprisePublish:[],
      creditDemonstration:[],
    }
  },
  computed:{
    width(){
      return ( parseInt(this.xinhuaList.length) || 0 ) * 400 || 0;
    }
  },
  created(){
    this._loading()
  },
  mounted(){
    this.getAllColumns()
    // this.getAdver()
    this.getNewArticleList()
    // Promise.all([this.getAllColumns(),this.getAdver(),getNewstColumn()
    //   .then(res=>{
    //     axios({
    //       url:res.data
    //     })
    //     .then(response=>{
    //       this.newList = response.data.slice(0,3)
    //     })
    //   })])
    //   .then(res=>{
    //     let timer = setTimeout(()=>{
    //       clearTimeout(timer)
    //       this._clear()
    //     },900)
    //   })
      
  },
  beforeRouteEnter(to,from,next){
    document.scrollingElement.scrollTop = 0
    next()
  },
  // updated() {
  //     console.log(1111)
  //     document.scrollingElement.scrollTop = 0
  // },
  methods:{
    goNation(){
      this.$router.push('/nationalBrandList')
    },
    goDetail(unit){
      //{path:"/credit/infor/detail/"+encodeURIComponent(unit.artUrl?unit.artUrl:unit.picLinks),query: {title:unit.title}}
      // console.log(unit)
      if(!!unit.id&&!unit.artUrl){
        this.$router.push({
          path:"/credit/infor/enterpriseCreditDetail/"+unit.id,
          query:{
            title:unit.title
          }
        })
      }else{
        this.$router.push({
          path:"/credit/infor/detail/"+encodeURIComponent(unit.artUrl?unit.artUrl:unit.picLinks),
          query:{
            title:unit.title
          }
        })
      }
    },
    //获取最新资讯
    getNewArticleList(){
      getNewArticleList({
        page:1,
        size:10
      }).then(res=>{
        if(res.code == 200){
          this.newList = !!res.data&&res.data.data?res.data.data.returnData.slice(0,3):[]
        }
      })
    },
    async getAllColumns(){
      await getChinaBrandsColumn({
        pageNo:1,
        pageSize:500
      }).then(res=>{
        this.ChinaBrands = {
          columnName:'China Brands',
          columnContent:res.data,
        }
      })
      await getCompanyColumn({
        pageNo:1,
        pageSize:500
      }).then(res=>{
        this.Company = {
          columnName:'Company',
          columnContent:res.data,
        }
      })
      await getChinaProjectColumn({
        pageNo:1,
        pageSize:500
      }).then(res=>{
        this.ChinaProject = {
          columnName:'Project',
          columnContent:res.data,
        }
      })
      await getReleaseList({
         type:0,
         currentPage:1,
         pageSize:10000
      }).then(res=>{
        this.enterprisePublish = !!res.data&&!!res.data.pageData?res.data.pageData.list[0]:[]
      })
      await getReleaseList({
         type:2,
         currentPage:1,
         pageSize:10000
      }).then(res=>{
        this.creditDemonstration = !!res.data&&!!res.data.pageData?res.data.pageData.list[0]:[]
      })
      await requestSelectAllColumn()
        .then(res=>{
          let promiseList = [];
          let allCreditList = {};
          let allNewsList = [];
          let dataList = res.data;
          dataList.push(this.ChinaBrands)
          dataList.push(this.Company)
          dataList.push(this.ChinaProject)
          dataList.push({columnName:'Xinhua Enterprise Information',path:''});
          dataList.push({columnName:'Credit Demonstration',path:''});
          // console.log(dataList)
          dataList.forEach(item=>{
            if(item.columnContent){
              promiseList.push(getColumnList_2({
                url:item.columnContent+'?version='+new Date().getTime()
              }))
            }
          })
          // return ;
          
          Promise.all(promiseList)
            .then(list=>{
              let timer = setTimeout(()=>{
                clearTimeout(timer)
                 this._clear()
              },300)
              list.push({
                list:this.enterprisePublish
              })
              list.push({
                list:this.creditDemonstration
              })
              list.forEach((item,index)=>{
                if(item.data){
                  item.list = item.data
                }
                allCreditList[res.data[index].columnName] = item.list ;
                allNewsList=[...allNewsList,...item.list.slice(2).map(item=>Object.assign({},item,{key:res.data[index].columnName}))] 
              })
              this.allCreditList = allCreditList ;
              allNewsList=allNewsList.filter((i)=>!!i.hitCount).sort((a,b)=>b.hitCount-a.hitCount);

              this.rankTop = allNewsList.slice(0,5);
              this.rankBottom = allNewsList.slice(-5);

              let xinhuaList = [];
              let otherList = [];
              allNewsList.forEach(item=>{
                !!item.source&&item.source.toLowerCase().includes('xinhua') ?
                xinhuaList.push(item) :
                otherList.push(item) ;
              })
              xinhuaList = allNewsList//没有新华原创时取的数据
              const len = xinhuaList.length>6 ? 6 : xinhuaList.length;

              for(let i=0;i<len;i++){
                let num = Math.random()*xinhuaList.length;
                    num = Math.floor(num);
                    this.xinhuaList.push(xinhuaList[num]);
                    xinhuaList.splice(num,1)
              }
              // console.log(xinhuaList,999999)

            })
        
        })
    },
    getAdver(){
      getAdvertList()
        .then(res=>{
          this.adverList = res.list
        })
    }
  }
}
</script>
<style lang="stylus">
.p-credit-info-index
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height:100%;
  .swipe-info
    .summary
      background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%);
      height 128px
      transform translateY(-100%)
  .van-swipe__indicator
    height 8px !important
    width 8px !important
    opacity 1
    border-radius 50%
  .van-swipe__indicator:not(:last-child)
    margin-right 8px
  .van-swipe__indicators
    left 100%
    transform translateX(-100%)
    padding-right 40px
    padding-bottom 20px
.xinhua-item
  background:url("../../../image/bg/bg_swipe.png") no-repeat center center;
  background-size:100% 100%
.scroll-none::-webkit-scrollbar
  display none
.w-o-2
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word; 
</style>
