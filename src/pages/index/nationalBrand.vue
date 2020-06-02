<template>
  <div class="nationalBrand p-r p-b-120 p-t-100">
    <!--  -->
    <xHeader :title="title">
      <a :href='`http://m.credit100.com/#/CreditCardsInfo?companyId=${$route.params.companyId}&companyname=${companyNameCN}&creditCode=${creditCode}&id=${id}`' class='d-f f-c h-50 w-60 b-r-4 b-toggle-cn' >
        <span class="f-s-24 c-fff">CN</span>
      </a>
    </xHeader>
    <main>
      <section class="w-per-100 m-b-32 p-r">
        <video class='w-per-100 h-per-100' :src="video" controls></video>
      </section>
      <section class="p-l-32 o-h m-b-40">
        <ul class="o-y-a">
          <swiper :options="swiperOption" class="h-150">
            <swiper-slide class="bg-color-1C71B7 m-r-16 w-200 b-r-4 o-h" v-for="(v,i) in allImg" :key="i">
              <img @click='previewImg(i)' v-lazy="v"  class='w-per-100 h-per-100 d-b' />
            </swiper-slide>
          </swiper>
        </ul>
      </section>
      <section class="p-lr-32 m-b-40">
        <div class="sectionBorder">

          <div class="p-lr-32 p-tb-40">
            <div class="f-b m-b-16">
              <router-link
                tag='p'
                :to='`/credit/${$route.params.companyId}/enter/home`'
                class="w-495 f-s-36 l-h-50  f-f-PingFangSC-Semibold f-w-600 "
              >{{company.companyName}}</router-link>
              <div class="h-96 w-96 bg"></div>
            </div>
            <!-- <div class="w-170 h-40 certifiedBg"></div> -->
            <p v-if='isEnter' class="bg-color-32BA59-1 w-180 m-l-15 b-r-20  f-b-c p-r-15">
              <Icon class="c-32BA59 f-s-42" type='icon-ok' />
              <span class="c-32BA59 f-s-24">Certified</span>
              
            </p>
            <p v-else class="bg-ccc w-180  m-l-15 b-r-20  f-c ">
              <span  class="f-s-24 c-fff" >
               Not Settled
              </span>
            </p>
          </div>


          <div class="p-lr-32 p-tb-40 border">
            <p class="f-b h-32 l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Unified Social Credit Code</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular">
                {{creditCode}}
              </span>
            </p>
            <p class="f-b h-32 l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Legal Representative</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular">
                {{company.operName}}
              </span>
            </p>
            <p class="f-b h-32 l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Date of Establishment</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular">
                {{company.startDate|convertDate}}
              </span>
            </p>
          </div>
          <div class="p-lr-32 p-tb-40">
            <!-- 公司官網 -->
            <p class="f-b f-column l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Website</span>
              <a :href='website' target="__blank" class="m-t-10 f-s-24 f-w-400 f-f-PingFangSC-Regular c-1C71B7">{{website}}</a>
            </p>
            <!-- 所屬行業 -->
            <p class="f-b f-column l-h-34 m-b-24 ">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold">Industry</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular m-t-10">{{industry}}</span>
            </p>
            <!-- 主營業務 -->
            <p class="f-b f-column l-h-34 m-b-24">
              <span class="f-s-24 f-w-600 f-f-PingFangSC-Semibold ">Business Scope</span>
              <span class="f-s-24 f-w-400 f-f-PingFangSC-Regular   m-t-10">{{company.scope}}</span>
            </p>
          </div>
        </div>
      </section>
      <section class="p-lr-32 m-b-50">
        <div class="p-lr-32">
          <p
            class="f-s-c l-h-40 h-40 f-s-28 f-w-600 f-f-PingFangSC-Semibold c-0089D1 m-b-24 circle "
          >Evaluation Grade:{{qualratingnm}}</p>
          <div class="h-412" v-if='isShowEvaluation'>
            <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
          </div>
          <p v-else class='c-333 f-w-400 f-s-24 m-t-24 m-b-32'>No Evaluation Data</p>
        </div>
        <div class="p-lr-32 m-b-32" >
          <p
            class="l-h-40 h-40 f-s-28 f-w-600 f-f-PingFangSC-Semibold c-0089D1 m-b-24 f-s-c  circle"
          >Evaluation Conclusion</p>
          <p
            v-if='!!desc'
            class="c-333 f-w-400 f-s-24 l-h-34"
            v-html='desc'
          ></p>
          <p  v-else class="c-333 f-w-400 f-s-24 l-h-34">No Evaluation Data</p>
        </div>
        <div class="p-lr-32">
          <img v-lazy="promiseImageUrl" class='w-per-100' alt="">
          <!-- <div class="h-946 bg-color-1C71B7"></div> -->
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import {mapState} from 'vuex'
// 民族品牌
import xHeader from "@/layout/header";
import { Icon, Cell, CellGroup, ImagePreview, Lazyload } from "vant";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import { requestGetyNationalBrandInfo } from '*/request/axios.credit'
Vue.use(Lazyload,{
    error:require('../../../src/image/format.png')
});
// 引入 ECharts 主模块
window.echarts = require('echarts/lib/echarts');
// 引入雷达
require('echarts/lib/chart/radar');
// 引入提示框
// require('echarts/lib/component/tooltip');
// require("echarts/lib/component/visualMap");



Vue.use(Cell)
  .use(CellGroup)
  .use(Icon);

export default {
  components: { xHeader, swiper, swiperSlide },
  data() {
    return {
      username: "",
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },

      video:'',//视频
      allImg:[],
      isEnter:false,//是否认证过
      website:'',
      qualratingnm:'',//等级
      desc:'',//总结
      creditCode:'',
      promiseImageUrl:'',
      company:{},
      companyNameCN:'',
      industry:'',
      id:'',//传中文网的id
      isShowEvaluation:true,//雷达图显影
      title:'National Brand',
    };
  },
  computed:{
    ...mapState(['lan'])
  },
  mounted() {
    this._loading();
    this.getyNationalBrandInfo();
    console.log(this.$route.params.type)
    this.title = this.$route.params.type == 1?"National Brand":'Key Enterprise'
  },
  methods: {
    previewImg(index){
      ImagePreview({
          images: this.allImg,
          startPosition: index,
      })
    },
    getyNationalBrandInfo(){
      requestGetyNationalBrandInfo({companyId:this.$route.params.companyId})
        .then(res=>{
          this.companyNameCN = res.data.companyInfo.zh.eci.company.companyName||'';
          this.video = res.data.allVideo[0];
          this.allImg = res.data.allImg;
          this.isEnter = res.data.isEnter;
          this.website = res.data.website;
          this.qualratingnm = res.data.scoringModel && res.data.scoringModel.qualratingnm;
          this.desc = res.data.scoringModel && res.data.scoringModel.desc&&res.data.scoringModel.desc.replace(/\<\s*br\s*\/\s*>/ig,'<br />').replace(/\&lt;\s*br\s*\/\s*\&gt;/ig,'<br />');
          this.promiseImageUrl = res.data.promiseImageUrl;
          this.company = res.data.companyInfo[this.lan].eci.company;
          // !!this.company.companyName&&this.updateWxShareTitle({wxShareTitle:`[Credit Archives] ${this.company.companyName}`})
          !!this.company.companyName&&this.setWxShare({wxShareTitle:`[Enterprise Publish] ${this.company.companyName}`})
          this.creditCode = res.data.creditCode ;
          this.industry = res.data.companyInfo[this.lan].eci.industry.industry
          this.id = res.data.id

          const {d1=0,d2=0,d3=0,d4=0,d5=0,d6=0} = res.data.scoringModel||{};
          if(!res.data.scoringModel){
            this.isShowEvaluation = false
          }
          !!res.data.scoringModel&&this.drawLine({d1,d2,d3,d4,d5,d6});
          
        })
    },
    drawLine( {d1,d2,d3,d4,d5,d6} ) {
      this.$nextTick(() => {
        let sales = echarts.init(document.getElementById("myChart"));
        let option = {
          tooltip: {},
          legend: {
            itemGap: 28,
            itemWidth: 10, // 图例标记的图形宽度。[ default: 25 ]
            itemHeight: 20 // 图例标记的图形高度。[ default: 14 ]
          },
          grid:{
            top:100,
            bottom:40,
          },
          radar: {
            name: {
              shadowOffsetY:0,
              lineHeight:10,
              // height:52,
              // backgroundColor:'#f00',
              // formatter(v){
              //   // return v.split(' ').join('\n')
              // },
              textStyle: {
                color: "#999999",
                fontSize: 10,
                padding: [0, 0],
              }
            },
            splitLine: {
              lineStyle: {
                color: "#C4ECCF", // 分隔线颜色
                width: 2 // 分隔线线宽
              }
            },
            indicator: [
              { name: "External Environment", max: 100 },
              { name: "Associated\n Risk", max: 100 },
              { name: "Credit\n History", max: 100 },
              { name: "Management Level", max: 100 },
              { name: "Shareholder\n Background", max: 100 },
              { name: "Enterprise \n Characteristics", max: 100 }
            ]
          },
          series: [
            {
              type: "radar",
              data: [
                {
                  value: [d1,d6,d5,d4,d3,d2],
                  symbolSize: 5,
                  itemStyle: {
                    normal: {
                      color: "#32BA59",
                      lineStyle: { color: "#32BA59" }
                    }
                  },
                  areaStyle: {
                    // 单项区域填充样式
                    normal: {
                      color: " #C4ECCF " // 填充的颜色。[ default: "#000" ]
                    }
                  }
                }
              ]
            }
          ]
        };
        sales.setOption(option);

        window.addEventListener("resize", function() {
          sales.resize();
        });
      });
    }
  }
};
</script>
<style lang="stylus">
.b-toggle-cn
  border 1px solid rgba(255,255,255,.4)
.nationalBrand {
  .bg {
    background: url('../../image/userCenter/nationImg.png') no-repeat;
    background-size: 100% 100%;
  }

  .sectionBorder {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    border: 2px solid rgba(246, 246, 246, 1);
  }

  // .certifiedBg {
  //   background: url('../../image/userCenter/certified.png') no-repeat;
  //   background-size: 100% 100%;
  // }

  // .txt {
  //   text-overflow: -o-ellipsis-lastline;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   display: -webkit-box;
  //   -webkit-line-clamp: 2;
  //   line-clamp: 2;
  //   -webkit-box-orient: vertical;
  // }
  .circle:before{
     content: '';
      margin-right : 14px;
      display: table;
      width: 12px;
      height: 12px;
      background: #1C71B7;
      border-radius: 50%;
  }
  .border {
    border-bottom: 2px solid #F6F6F6;
    border-top: 2px solid #F6F6F6;
  }
}
</style>
