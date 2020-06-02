<template>
    <div class="vendorquery p-r  p-b-120 bg-color-fff w-per-100">
        <!-- <xHeader title="Fight Against the Pandemic">
        </xHeader> -->
        <main class='w-per-100 vertical-top f-1 f-column' >
            <div class="w-per-100 h-450 vertical-top vendorqueryBg p-r">
                <Icon @click='back' class="f-s-32 c-fff scale-50-active p-a iconPossion" type='icon-left' />
                <div class='w-240 h-52 m-a m-b-32 m-t-40'>
                    <img class="w-per-100 h-per-100" src='../../image/bg/logo.png' />
                </div>
                <p class="f-s-30 f-f-Arial f-w-bold c-fff t-c m-b-28 daxie">Fight Against the Pandemic</p>
                <div class="w-637 h-1 m-a lineBg m-b-28"></div>
                <p class="f-s-24 f-f-Arial c-fff f-s-400 t-c daxie">INQUIRY FOR CHINESE PERSONAL PROTECTIVE</p>
                <p class="f-s-24 f-f-Arial c-fff f-s-400 t-c daxie">EQUIPMENT MANUFACTURERS</p>
            </div>
            <div class="w-per-100 p-40 h-650 bg-color-E6F0FC p-r">
                <div class="w-670  p-a seachPossion " > 
                    <ul class="w-per-100" >
                        <li @click.stop class="seachLiBox  bg-color-fff w-per-100 m-b-30 p-20">
                            <div class="f-s-c">
                                <div class="w-6 h-20  b-r-3 bg-color-2D6BD9 m-r-14"></div>
                                <p class="f-s-24 l-h-24 f-f-Arial c-999 m-b-0">PRODUCT CATEGORY</p>
                            </div>
                            <a-select
                                @click.stop
                                class="w-per-100 h-72 f-s-30 c-333"
                                v-model="product_category_en"
                                
                            >
                                <a-select-option value="">All</a-select-option>
                                <a-select-option v-for="(item,index) in product_category_enList" :key='index'  :value="item">{{item}}</a-select-option>
                            </a-select>
                        </li>
                        <li @click.stop class="seachLiBox  bg-color-fff w-per-100 m-b-30 p-20">
                            <div class="f-s-c ">
                                <div class="w-6 h-20  b-r-3 bg-color-2D6BD9 m-r-14"></div>
                                <p class="f-s-24 f-f-Arial c-999 m-b-0">PROVINCE </p>
                            </div>
                            <div class="w-per-100 p-r">
                                 <a-select
                                    @click.stop
                                    class="w-per-100 h-72 f-s-30 c-333"
                                    v-model="province_en"
                                    
                                >
                                    <a-select-option value="">All</a-select-option>
                                    <a-select-option v-for='(item,index) in province_enList' :key='index' :value="item">{{item}}</a-select-option>
                                </a-select>
                                <div class="p-a w-20 h-14 icon-p-a">
                                    <!-- <img class="w-per-100 " src='../../image/bg/seletIcon.png'/> -->
                                </div>
                            </div>
                        </li>
                        <li @click.stop class="seachLiBox  bg-color-fff w-per-100 m-b-40 p-20">
                            <div class="f-s-c ">
                                <div class="w-6 h-20  b-r-3 bg-color-2D6BD9 m-r-14"></div>
                                <p class="f-s-24 f-f-Arial c-999 m-b-0">MADE IN CHINA / OTHER COUNTRIES</p>
                            </div>
                            <a-select
                                class="w-per-100 h-72 f-s-30 c-333"
                                 v-model="made_in_en"
                                
                            >
                                 <a-select-option value="">All</a-select-option>
                                 <a-select-option value="Made in China">Made in China</a-select-option>
                                 <a-select-option value="Import">Other Countries</a-select-option>
                                  <!-- <a-select-option v-for='(item,index) in made_in_enList' :key='index' :value="item">{{item}}</a-select-option> -->
                            </a-select>
                        </li>
                    </ul>
                <div class="searchBtn f-c" @click.stop="()=>{search()}">
                        <!-- <Icon  type='icon-search' class='c-fff  f-s-42 scale-80-active m-r-23' /> -->
                       <div class="w-42 h-42 m-r-23">
                           <img class="w-per-100 h-per-100" src='../../image/bg/search.png' />
                       </div>
                        <span class="f-s-34">Search</span>
                    </div>
                </div>
            </div>
            <div class="f-1 w-per-100 bg-color-fff p-t-30 p-lr-40 p-b-40">
                <div class="w-per-100 o-x-a demo_2  m-b-30">
                    <table class="w-per-720 o-h " style="border-collapse:separate; border-spacing:0px 3px;">
                        <thead class="t-c ">
                            <tr >
                                <th class="h-60 b-2D6BD9 b-no-lrt  f-w-bold c-0B72E7 b-b-e8e8e8 f-s-24 ">No.</th>
                                <th class="h-60 b-2D6BD9 b-no-lrt c-0B72E7 f-w-bold f-s-24 ">Product Category</th>
                                <th class="h-60 b-2D6BD9 b-no-lrt c-0B72E7  f-w-bold f-s-24 ">Province</th>
                                <th class="h-60 w-550 b-2D6BD9 b-no-lrt c-0B72E7 f-w-bold f-s-24 ">Product Name</th>
                                <th class="h-60 b-2D6BD9 b-no-lrt c-0B72E7 f-w-bold f-s-24 ">Made in China / Other Countries</th>
                                <th class="h-60 b-2D6BD9 b-no-lrt c-0B72E7 f-w-bold f-s-24 ">Enterprise Name</th>
                                <th class="h-60 b-2D6BD9 b-no-lrt c-0B72E7   f-w-bold f-s-24 ">Enterprise Name(CN)</th>
                                <!-- <th class="h-60 b-2D6BD9 b-no-lrt c-0B72E7 f-w-bold f-s-24 ">Contact Details</th> -->
                                <th class="h-60 w-600 b-2D6BD9 b-no-lrt c-0B72E7 f-w-bold f-s-24 ">Enterprise Address</th>
                                <th class="h-60 b-2D6BD9 b-no-lrt c-0B72E7   f-w-bold f-s-24 ">Registration No.</th>
                                <th class="h-60 b-2D6BD9 b-no-lrt c-0B72E7   f-w-bold f-s-24 ">Qualifications</th>
                            </tr>
                        </thead>
                        <tbody class="t-c ">
                            <tr v-for="(item,i) in dataList" :key="i" class="bg-color-E9F1FA  c-000 f-s-24 ">
                                <td class="">{{i+1}}</td>
                                <td class=" ">{{item.product_category_en}}</td>
                                <td class=" ">{{item.province_en}}</td>
                                <td class="">
                                    <span class="">{{item.product_name_en}}</span>
                                </td>
                                <td class="">{{item.made_in_en}}</td>
                                <td class="">
                                    <router-link :to='`/credit/${item.company_id}/enter/home`' style='text-decoration: underline' class="c-0cb72e7" href='http://m.credit100.com/#/companyInfo?companyId=c40c9e3cda9b9fc2afd241ef2a45b354&companyName=%E9%87%8D%E5%BA%86%E5%B8%82%E5%AE%8F%E5%86%A0%E5%8C%BB%E7%96%97%E8%AE%BE%E5%A4%87%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8'>{{item.company_name_en}}</router-link>
                                </td>
                                <td class=" ">
                                    <router-link :to='`/credit/${item.company_id}/enter/home`' style='text-decoration: underline' class="c-0cb72e7" href='http://m.credit100.com/#/companyInfo?companyId=c40c9e3cda9b9fc2afd241ef2a45b354&companyName=%E9%87%8D%E5%BA%86%E5%B8%82%E5%AE%8F%E5%86%A0%E5%8C%BB%E7%96%97%E8%AE%BE%E5%A4%87%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8'>{{item.company_name_zh}}</router-link>
                                </td>
                                <!-- <td class=" ">{{item.contact_en}}</td> -->
                                <td class=''>
                                    {{item.address_en}}
                                </td>
                                <td class=" ">{{item.regist_num_en}}</td>
                                <td class=" ">{{item.label_en||''}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="w-per-100 t-c" v-if='pageTotal*1<=0'>No Data</p>
                </div>
                <div class="f-c h-30 m-b-50" v-if='pageTotal>0&&dataList.length<pageTotal'>
                    <span @click.stop="clickMore">
                         <span class="c-2D6BD9 f-s-24 m-r-18">More</span>
                         <Icon  type='icon-down' class='c-2D6BD9 f-w-600 f-s-24 scale-80-active ' />
                    </span>
                </div>
                <div class="w-per-100 b-FF0000 p-20">
                    <p class="f-s-22 c-666 l-h-30">The above information is collected and compiled by Xinhua Credit platform from government, enterprise and institution websites, media reports and other public channels. If there are any mistakes or omissions, please contact us to correct them. If you have PPE needs and business cooperation, please contact us.</p>
                    <p class="f-s-22 c-333 l-h-30">E-mail：credit@xinhua.org</p>
                </div>
            </div>
        </main>
        <div class="box">
            <div class="scrollbar"></div>
        </div>
    </div>
</template>
<script>
//抗击疫情
import {mapState,mapMutations} from 'vuex'
import xHeader from "@/layout/header";
import {Select,} from 'ant-design-vue';
import 'ant-design-vue/lib/select/style/css'
import { findAllMadeIn,findAllProCategory,findAllProvince,findByCondition} from '../../request/axios.summit'

Vue.use(Select)
export default {
	components: { xHeader },
	data() {
		return {
            picFormat:require('../../image/icon/icon_format_pic.png'),
            pageTotal:0,
            product_category_en:'',//产品类别
            product_category_enList:[],
            province_en:'',//省份
            province_enList:[],
            made_in_en:'',//产地
            made_in_enList:[],
            pageIndex:1,//页码,1开始
            pageSize:10,//页大小,默认10
            dataList:[],//数据列表
		};
	},
	computed:{
        ...mapState(['lan']),
    },
    created(){
        this.init()
        this.findByCondition()
    },
	mounted() {
        // INQUIRY FOR CHINESE PERSONAL PROTECTIVE EQUIPMENT MANUFACTURERS
       this.setWxShare({wxShareTitle:`Fight Against the Pandemic · Inquiry for Chinese Personal Protective Equipment Manufacturers`})
	},
	methods: {
     ...mapMutations(['setIsInter']),
    back(){
      if(this.$route.path.startsWith('/international/home')){
          this.setIsInter(false);
      }
      
      this.$router.push('/home')
    },
      search(){
          this.pageIndex = 1
          this.findByCondition()
      },
      init(){
          findAllMadeIn({}).then(res=>{
            //   console.log(res)
              if(res.code == 200){
                  this.made_in_enList = res.data
              }
          })
          findAllProCategory().then(res=>{
            //   console.log(res)
              if(res.code == 200){
                  this.product_category_enList = res.data
              }
          })
          findAllProvince().then(res=>{
            //   console.log(res)
              if(res.code == 200){
                  this.province_enList = res.data
              }
          })
      },
      clickMore(){
          this.pageIndex++
          this.findByCondition()
      },
      findByCondition(){
          this._loading()
          findByCondition({
              product_category_en:this.product_category_en,//产品类别
              province_en:this.province_en,//省份
              made_in_en:this.made_in_en,//产地
              pageIndex:this.pageIndex,//页码,1开始
              pageSize:this.pageSize,//页大小,默认10
          }).then(res=>{
              this.$toast.clear()
              if(res.code == 200){
                  this.pageTotal = res.total
                  this.dataList = this.pageIndex == 1 ?res.data:this.dataList.concat(res.data);
              }
          })
      }
	}
};
</script>
<style lang="stylus">

.demo_2{
  
}
/*滚动条整体样式*/
.demo_2::-webkit-scrollbar {
    width: 154px;
    height: 10px;
}
/*滚动条滑块*/
.demo_2::-webkit-scrollbar-thumb {
    background:rgba(217,227,238,1);
    border-radius:5px;
    -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
}
/*滚动条轨道*/
.demo_2::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0);
    border-radius: 10px;
    background: #fff;
}
 .ant-select-arrow
    //  top 55%!important
.ant-select-arrow .ant-select-arrow-icon
    width 18px
    height 14px
    background-color red
    display inline-block
    background url('../../image/bg/seletIcon.png') center center no-repeat
    background-size cover
    svg
        display none;
.ant-select-open 
    .ant-select-selection
        box-shadow none!important;
    .ant-select-selection:focus, .ant-select-selection:active
        box-shadow none!important;
.ant-select
        width: 100%;
        height: .72rem;
        line-height : .72rem!important;
        font-size: .24rem;
        .ant-select-selection 
            outline: none!important;
            -webkit-user-select: none!important;
            -moz-user-select: none!important;
            -ms-user-select: none!important;
            user-select: none!important;
            -webkit-box-sizing: border-box!important;
            box-sizing: border-box!important;
            display: block;
            background-color: #fff;
            border-radius: 0;
            border:0!important;
            border-bottom: 1px solid rgba(208,221,236,1)!important;
        .ant-select-selection:focus
            box-shadow none!important;
        .ant-select-selection--single
            height: .72rem!important;
            line-height : .72rem!important;
        .ant-select-selection__rendered
            height: .72rem!important;
            line-height : .72rem!important;
        .ant-select-selection__placeholder, .ant-select-search__field__placeholder
            line-height: 0.3rem;
            height: 0.3rem;
        .ant-select-selection .ant-select-selection--single .ant-select-selection__rendered
            line-height : .72rem!important;
        // .ant-select-selection--single 
        //     line-height: 62px;
        //     margin-left: 0;
        //  .ant-select-selection__rendered
        //     line-height: 62px;
        //     margin-left: 0;
        //     margin-right: 0;
.ant-select-dropdown-menu
    max-height 450px;
    .ant-select-dropdown-menu-item
        line-height 60px!important;
.vendorquery
    .daxie
        text-transform:uppercase;   
       
    .iconPossion
        left 30px
        top 40px
    // .icon-p-a
    //     top 55%
    //     right 30px
    //     transform translate(0,-40%)
    //     background url('../../image/bg/seletIcon.png') center center no-repeat
    tbody:before 
        content: "-";
        display: block;
        line-height: 1px;
        color: transparent;
    .seachLiBox 
        width:670px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 16px 0px rgba(30,38,103,0.1);
        border-radius:6px;
    .seachPossion
        left 50%
        top -65px
        transform translate(-50%,0)
    .vendorqueryBg
        background url('../../image/bg/vendorqueryBg.png') center center no-repeat;
        background-size 100% 100%;
    .lineBg
        background url('../../image/bg/line.png') center center no-repeat;
        background-size 100%;
    .vertical-top
        vertical-align top
    .searchBtn
        width: 100%;
        height:88px;
        background:rgba(21,76,174,1);
        border-radius:8px;
        font-size:34px;
        font-family:Arial;
        font-weight:400;
        color:rgba(255,255,255,1)
</style>
