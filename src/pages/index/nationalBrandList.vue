<template>
    <div class="nationalBrandList p-r p-t-100 p-b-120 bg-color-fff w-per-100" >
        <xHeader title="National Brands">
        </xHeader>
        <main class='w-per-100 vertical-top f-1 f-column' >
            <div class="w-per-100 h-300 m-b-28 vertical-top">
                <img class="w-per-100 h-per-100 vertical-top" src='../../image/bg/brandListBg.png'/>
            </div>
            <div class="f-1 f-column " >
                <ul class="d-f t-c w-per-100  m-b-42 p-lr-32">
                    <li 
                    @click="changeTab(item.tab)"
                    class="f-1 h-140 bg-color-F6F6F6" 
                    v-for='(item,index) in tabList' 
                    :key='index'  
                    :class="{'bg-color-blue':tab==item.tab,'m-lr-30':item.tab==2}">
                        <div class="m-t-14 m-b-4 w-per-100 f-c" >
                            <img class='w-48 h-48' :src='tab==item.tab?item.activImgSrc:item.imgSrc' />
                        </div>
                        <p 
                        class='f-s-24 w-per-100 h-68 l-h-34 f-c'
                        :class='tab==item.tab?"c-fff":"c-1C71B7"'
                        >{{item.title}}</p>
                    </li>
                </ul>
                <ul class="f-1  o-x-h p-lr-32" id='ulBox'>
                    <li 
                    v-for='(item,index) in tab==1?brandList:tab==2?oldCompanyList:tab==3?newCompanyList:[]'
                    :key="index"
                    @click="goDetail(item,index)"
                    class="w-per-100  b-r-8 b-2-eee p-16 d-f justify-b m-b-28"
                    :class="{'b-2-1C71B7':clickActive==index&&!!isClick}">
                        <div class=" f-c">
                            <img class='w-220 h-128'  :src='item.image' />
                        </div>
                        <div class="m-l-40 h-128 d-f d-f-w">
                            <h5 class="c-333 l-h-40 white-2 f-s-28 f-w-600 f-f-PingFangSC-Semibold,PingFang SC">{{item.nameEn}}</h5>
                            <p class="t-r m-t-10 c-999 l-h-32 f-s-22 f-c-e  justify-e w-per-100 m-b-4">
                                Settle-in Time：{{item.createTime|convertDate}}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex'
import xHeader from "@/layout/header";
import {List} from 'vant';
import { requestGetyNationalBrandList } from '*/request/axios.credit'

Vue.use(List);

export default {
	components: { xHeader },
	data() {
		return {
            tabList:[
                {
                    tab:1,
                    title:'National Brands',
                    imgSrc:require('../../image/brandList/brand.png'),
                    activImgSrc:require('../../image/brandList/brandActive.png')
                },
                 {
                    tab:2,
                    title:'China Time-honored Brand',
                    imgSrc:require('../../image/brandList/oldCompany.png'),
                    activImgSrc:require('../../image/brandList/oldCompanyActive.png')
                },
                 {
                    tab:3,
                    title:'Cutting-edge Enterprises',
                    imgSrc:require('../../image/brandList/company.png'),
                    activImgSrc:require('../../image/brandList/companyActive.png')
                }
            ],
            tab:1,
            picFormat:require('../../image/icon/icon_format_pic.png'),
            brandList:[],
            newCompanyList:[],
            oldCompanyList:[],
            list:[],
            clickActive:0,
            isClick:false,
		};
	},
	computed:{
        ...mapState(['lan','height']),
	},
	mounted() {
		this.getBrandList()
	},
	methods: {
        goDetail(data,index){
            this.clickActive = index
            this.isClick = true
            this.$router.push({
                path:`/brand/${data.companyId}/${data.id}/${data.type}`
            })
        },
        changeTab(tab){
            this.tab = tab
            document.getElementById('ulBox').scrollTop = 0;
        },
         getBrandList(){
            this._loading();
            requestGetyNationalBrandList()
            .then(res=>{
                console.log(res)
                if(res.code == 200){
                    if(res.data.length>0){
                        res.data.map((item,index)=>{
                            if(item.type==1){
                                this.brandList.push(item)
                            }
                            if(!!item.newType&&item.newType == '0'){
                                this.newCompanyList.push(item)
                            }
                            if(!!item.oldType&&item.oldType == '0'){
                                this.oldCompanyList.push(item)
                            }
                        })
                        // console.log(this.brandList,this.newCompanyList,this.oldCompanyList)
                    }
                }
                // this.allWords = res.data
            })
        },
	}
};
</script>
<style lang="stylus">
.nationalBrandList
    main
        .bg-color-blue
            background-color #1C71B7
        .b-2-1C71B7
            border 2px solid #1C71B7
        .vertical-top
            vertical-align top
</style>
