<template>
    <div class=" bg-color-F6F6F6 p-r">
        <xHeader title='International Credit' @back="onBack"/>
        <div class="w-per-100 m-t-100 home-top">
            <div class="content">
                <p class="t-c f-w-600 p-t-32 m-b-48 f-s-48 c-fff qqq">Global Business Information at Your Fingertip</p>
                <div class="select w-per-100">
                    <div class="f-l select-input" @click="selectType('Country/Region')">
                        <em class="white-1">{{searchData.countryName}}</em>
                        <img src="../../../image/international/home-select.png">
                    </div>
                    <div class="f-r select-input" v-if="searchData.cityName != '' && searchData.cityCode != ''" @click="selectType('city')">
                        <em class="white-1">{{searchData.cityName}}</em>
                        <img src="../../../image/international/home-select.png">
                    </div>
                </div>
                <div class="h-88 bg-fff b-r-8 o-h f-b-c p-lr-25">
                    <input type="text"  @keyup.enter='!!searchData.company && !!searchData.countryName && jumpSearch(searchData)' x-webkit-speech="" v-model.trim="searchData.company" placeholder="Please enter enterprise name" id="input" class="f-1 m-r-5">
                    <i class="c-blue2 f-w-600 f-s-30 scale-80-active iconfont icon-search" @click="!!searchData.company && !!searchData.countryName && jumpSearch(searchData)"></i>
                </div>
                <ul class="nav">
                    <li v-for="(item,index) in hotWords" :key="index"
                    @click="jumpSearch(item)">
                        {{item.Abbreviation}}
                    </li>
                </ul>
            </div>
        </div>
        <ul class="home-list">
            <li v-for="(item,index) in listData" :key="index">
                <img :src="item.imgUrl">
                <p class="w-per-100 t-c">{{item.name}}</p>
            </li>
        </ul>
        <xChoice ref="choiceData" @select="receiveData"></xChoice>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
import xHeader from '@/layout/nHeader'
import xChoice from '../../international/search/select'
import { getCountryList ,getCountryList_2 , getRegions,getRegions_2 } from '*/request/axios.international'
import {searchApi} from '../../../request/axios.search';
export default {
   components:{
       xHeader,
       xChoice
   },
   data() {
      return {
          pCities:{}, //地区数据
          searchData:{
                company:'',
                countryName:'',
                countryCode:'',
                cityName:'',
                cityCode:'',
          },
          listData:[
              {
                  imgUrl:require('../../../image/international/home-icon1.png'),
                  name:'All-Round Risk Rating'
              },
              {
                  imgUrl:require('../../../image/international/home-icon2.png'),
                  name:'Rich Report Types'
              },
              {
                  imgUrl:require('../../../image/international/home-icon3.png'),
                  name:'Exclusive Customized Report'
              },
              {
                  imgUrl:require('../../../image/international/home-icon4.png'),
                  name:'Settle-in for More Privileges'
              },
          ],
          hotWords:[
              {
                  Abbreviation:'Panasonic',
                  company:'PANASONIC CORP',
                  countryName:'Japan',
                  countryCode:'JPN',
                  cityName:'',
                  cityCode:'',
              },
              {
                  Abbreviation:"Intesa Sanpaolo",
                  company:"INTESA SANPAOLO PREVIDENZASOCIETA' D' INTERMEDIAZIONE MOBILIARE SPA",
                  countryName:'Italy',
                  countryCode:'ITA',
                  cityName:'',
                  cityCode:'',
              },
              {
                  Abbreviation:'Leonardo',
                  company:'LEONARDO SRL',
                  countryName:'Italy',
                  countryCode:'ITA',
                  cityName:'',
                  cityCode:'',
              },
              {
                  Abbreviation:'Siemens',
                  company:'Siemens Aktiengesellschaft',
                  countryName:'Germany',
                  countryCode:'DEU',
                  cityName:'',
                  cityCode:'',
              },
              {
                  Abbreviation:'Volkswagen',
                  company:'VOLKSWAGEN AKTIENGESELLSCHAFT',
                  countryName:'Germany',
                  countryCode:'DEU',
                  cityName:'',
                  cityCode:'',
              },
          ]
      }
   },
   computed:{
   },
   async created(){
       await this.queryIHotw();
   },
   mounted(){
       this.init();
   },
   methods:{
       ...mapMutations(['setIsInter']),
       onBack(){
           this.setIsInter(false);
           this.$router.push('/home/china');
           //this.$emit('back');
       },
       async queryIHotw(){
            const res = await searchApi.queryHotWordsAsync('国际热词');
            let hws = [];
            res.forEach(hw=>hws.push({
                Abbreviation:hw.hotword,
                company:hw.show_hotword || hw.hotword,
                countryName:'',
                countryCode:hw.country,
                cityName:'',
                cityCode:hw.province,
            }))
            this.hotWords = hws;
        },
       init(){
           if(localStorage.international){
               var international = JSON.parse(localStorage.international)
               this.searchData.countryCode = international.countryCode
               this.searchData.countryName = international.countryName
               this.searchData.cityCode = international.cityCode
               this.searchData.cityName = international.cityName
           }
           if(this.searchData.countryName == ''){
               this._loading();
               let params = {
                    text:''
                }
                getCountryList(params).then(res => {
                    let data = res.data;
                    let name = JSON.stringify(data).replace(/^\{|\}$/g,'').split(':')[0];
                    name = name.replace(new RegExp(/(")/g),"");
                    let id =  data[Object.keys(data)[0]];
                    this.searchData.countryCode = id;
                    this.searchData.countryName = name;
                })
                //console.log(this.searchData);
           }
       },
       async jumpSearch(item){
           if(!item.countryName){
                let params = {
                    text:''
                }
                const res = await  getCountryList_2(params);
                let data = res.data;
                if(!item.countryCode){
                    item.countryName = Object.keys(data)[0];
                    item.countryCode = data[item.countryName];
                }else{
                    item.countryName = Object.keys(data).find(k=>data[k] == item.countryCode);
                }
           }
           if(!!item.cityCode&&!item.cityName){
               let params2 = {
                   text:''
               }
               const res_2 = await getRegions_2(item.countryCode,params2);
               let data_2 = res_2.data[item.countryCode]
               item.cityName = Object.keys(data_2).find(k=>data_2[k] == item.cityCode);
           }
           this.$router.push({
               path:'/international/search',
            //    query:{
            //        condition:JSON.stringify(item)
            //    },
           })
           //console.log(item);
           localStorage.setItem("international", JSON.stringify(item));
       },
       selectType(type){
            if(type == 'Country/Region'){
                this.$refs.choiceData.choiceType('Country/Region',this.searchData);
            }
            if(type == 'city'){
                this.$refs.choiceData.choiceType('city',this.searchData);
            }
       },
       receiveData(data,type){
           if(type == 'Country/Region'){
               this.searchData.countryCode = data.code
               this.searchData.countryName = data.name
               this.cityList(this.searchData.countryCode,'',false);
           }
           if(type == 'City'){
               this.searchData.cityCode = data.code
               this.searchData.cityName = data.name
           }
       },
       //地区
       cityList(value,data,state){
            this._loading();
            let params = {
                text:data
            }
            getRegions(value,params).then(res => {
                this.pCities = res.data[value];
                if(Object.keys(this.pCities).length == 0 ){
                    this.searchData.cityCode = ''
                    this.searchData.cityName = ''
                }else{
                    if(!state){
                        this.searchData.cityCode = ''
                        this.searchData.cityName = ''
                    }
                    let name = JSON.stringify(this.pCities).replace(/^\{|\}$/g,'').split(':')[0];
                        name = name.replace(new RegExp(/(")/g),"");
                    if(this.searchData.cityName == ''){
                        this.searchData.cityName = name;
                        this.searchData.cityCode = this.pCities[Object.keys(this.pCities)[0]];
                    }
                }
            });
       },
   },
   watch: {
   }
}
</script>
<style scoped lang='less'  type='text/less'>
.home-top{
    width: 100%;
    height: 620px;
    background: url('../../../image/international/home-top-bg.png') no-repeat center center;
    background-size: cover;
    .content{
        padding: 0 .32rem;
        .words{
            width: 6.46rem;
            text-align: center;
        }
        .select{
            display: inline-block;
            height: .8rem;
            margin-bottom: .2rem;
            .select-input{
                width:3.2rem;
                height:.8rem;
                line-height: .8rem;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 4px 0px rgba(187,187,187,0.5);
                border-radius:8px;
                em{
                    float:left;
                    width: 87%;
                    color: #333;
                    font-size: .32rem;
                    padding-left:.2rem;
                }
                img{
                    float:right;
                    width: .16rem;
                    height: .12rem;
                    margin-right: .2rem;
                    margin-top: .34rem;
                }
            }
        }
        .nav{
            li{
                float:left;
                height:.48rem;
                line-height: .48rem;
                padding: 0 .2rem;
                font-size: .24rem;
                color: #fff;
                margin-top: .2rem;
                margin-right: .2rem;
                background:rgba(0,0,0,.3);
                border-radius:.24rem;
            }
        }
    }
}
.home-list{
    display: inline-block;
    margin-top: .32rem;
    margin-bottom: 1.6rem;
    padding: 0 .32rem;
    li{
        float:left;
        width: 3.2rem;
        height: 3.2rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 20px 0px rgba(51,51,51,0.1);
        border-radius: 8px;
        text-align: center;
        margin-bottom: .4rem;
        img{
            width: 2.2rem;
            height: 2.2rem;
            margin-top:.3rem;
            margin-bottom:.1rem;
        }
        p{
            width: 100%;
            text-align: center;
            font-weight:600;
            color: #333;
            line-height:28px;
            font-size: .24rem;
            white-space: normal;
        }
        &:nth-child(even){
            float:right;
        }
        &:nth-child(3),
        &:nth-child(4){
            img{
                margin-top: .18rem;
            }
            p{
                line-height: 28px;
            }
        }
    }
}
.qqq{
    white-space: normal;
}
</style>
