<template>
    <div class="h-per-100 p-b-120">
        <xHeader slot='header' title='Search Results' />
        <div class="w-per-100 m-t-100  h-320 p-f-xl-yt  bg-color-fff">
            <div class="content m-t-32">
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
                <div class="h-88 bg-fff b-r-8 o-h f-b-c p-lr-25 search-input">
                    <i @click="!!searchData.company && init(searchData)" class="c-142 f-w-600 f-s-30 m-r-16 scale-80-active iconfont icon-search"></i>
                    <input type="text" @keyup.enter='!!searchData.company && init(searchData)'  x-webkit-speech="" v-model.trim="searchData.company" placeholder="Please enter enterprise name" id="input" class="f-1 m-r-5">
                    <img v-show="searchData.company != '' " @click="searchData.company = ''" class="colse scale-80-active" src="../../../image/international/colse.png">
                </div>
            </div>
            <p class="w-per-100 m-t-30 h-60 l-h-60  bg-color-F6F6F6 f-s-24 c-999"><em class="m-l-32 c-1C71B7 f-s-24">{{listData.length}}</em> enterprises found</p>
        </div>
        <ul class="search-list">
            <li v-for="(item,index) in listData" :key="index" @click="jumpDetails(item)">
                <div class="f-b-c w-per-100 white-1 p-r-20">
                    <i class="f-s-32 c-blue m-r-20 m-t-2 iconfont icon-enterprise"></i>
                    <p class="f-1 white-1 m-r-20 f-w-600 white-1" v-html="labekKeyWord(item.name,searchData.company)">
                    </p>
                </div>
                <div class="m-t-10">
                    <font class="f-s-24 c-32BA59"  v-if='!!item.enterprise&&item.enterprise == 1'>
                        <i class="f-s-24 c-32BA59 m-r-5 m-t-2 iconfont icon-combinedShape"></i>
                        Certified <em class="c-ddd m-l-8 m-r-5">|</em>
                    </font>
                    <i class="f-s-24 c-999  iconfont icon-earth1"></i> 
                    <span class="f-s-24 c-666 l-h-34">{{item.countryCodeName}}</span>
                </div>
                <div class="m-t-10">
                    <i class="f-s-24 c-999  iconfont icon-position"></i>
                    <span class="f-s-24 c-666 l-h-34 f-r w-per-95 m-t-4">{{item.registrationAddress}}</span>
                </div>
            </li>
        </ul>
        <p v-if="listData.length == 0" class="NoData">No Data</p>
        <xChoice ref="choiceData"  @select="receiveData"></xChoice>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import xHeader from '@/layout/header'
import { getSearch , getRegions ,saveInternationalDeatil} from '*/request/axios.international'
import xChoice from '../../international/search/select_2'
export default {
   components:{
       xHeader,
       xChoice
   },
   data() {
      return {
          searchData:{
                company:'',
                countryName:'',
                countryCode:'',
                cityName:'',
                cityCode:'',
          },
          listData:[],
      }
   },
   mounted(){
       //this.searchData = JSON.parse(this.$route.query.condition);
       var international = JSON.parse(localStorage.international)
       this.searchData = international
       if(this.searchData.company != "" && this.searchData.countryName != ""){
           this.init();
       }
   },
   computed:{
       ...mapState( ["access_token"]),
       ...mapState('userCenter',['ucenterUserInfo']),
   },
   async created(){
       if(!!localStorage.access_token){
            await this.getUserCenterUserInfo();
        }
   },
   methods:{
       ...mapActions('userCenter',['getUserCenterUserInfo']),
       init(){
                this._loading();
                let params = {
                    cityCode:this.searchData.cityCode,
                    cityName:this.searchData.cityName,
                    company:this.searchData.company,
                    countryCode:this.searchData.countryCode,
                    countryName:this.searchData.countryName,
                };
                localStorage.setItem("international", JSON.stringify(params));
                getSearch(params).then(res => {
                    if(res.data.eearchVos != undefined){
                            this.listData = res.data.eearchVos
                    }else{
                        this.listData = []
                    }
                    //console.log(this.listData);
                });
       },
       //跳详情
       async jumpDetails(data){
           console.log(data)
            await saveInternationalDeatil({
               countryCode:data.countryCode||'',//国家编码
               countryName:data.countryCodeName||'',//国家名称
               name:data.name||'',//公司名称
               city:data.city||'',//城市
               cityName:data.cityName||'',//地区名称
               registrationAddress:data.registrationAddress||'',//注册地址
               registrationNumber:data.registrationNumber||'',//注册号
               supplierId:data.supplierId||'',//供应商id
               taxFreeCode:data.taxFreeCode||'',//免税代码
               username:this.ucenterUserInfo.username||'',//
               vatCode:data.vatCode||'',//增值税代码
               zipCode:data.zipCode||'',//邮编
            })
            this.$router.push({
               path:'/international/details',
           })
           localStorage.setItem("internationalDetails", JSON.stringify(data));
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
           if(this.searchData.company != ''){
               this.init(this.searchData);
           }
       },
       //地区
       cityList(value,data,state){
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
            border:1px solid rgba(28,113,183,1);
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
    .search-input{
        border:1px solid rgba(28,113,183,1);
        .colse{
            width: .32rem;
            height: .32rem;
        }
    }
}
.search-list{
    padding: 0 .32rem;
    margin-top: 4.2rem;
    margin-bottom: .6rem;
    li{
        display:inline-block;
        width: 100%;
        padding: .34rem 0;
        border-bottom: #F6F6F6 1px solid;
    }
}
.NoData{
    width: 100%;
    text-align: center;
    color:#333;
    font-size: .24rem;
    padding: .5rem 0;
}
</style>
