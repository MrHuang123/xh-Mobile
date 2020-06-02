<template>
    <div class="select" v-show="slectState">
        <header  class="h-100 w-per-100  p-f-xl-yt bg-linear-header p-lr-30 f-b-c z-1000">
            <Icon @click='back' class="f-s-32 c-fff scale-50-active " type='icon-left' />
            <span class='f-s-32 c-fff white-1 w-520 t-c'>Select {{title}}</span>
            <p class=' f-e-c'>
                <slot>
                    <span>&nbsp;</span>
                </slot>
            </p>
        </header>
        <div  class="w-per-100 m-t-100 p-f-xl-yt  bg-color-fff">
            <div class="content m-t-32">
                <div class="h-88 bg-fff b-r-8 o-h f-b-c p-lr-25 search-input">
                    <input @keyup.enter='list(title)' type="text" x-webkit-speech="" v-model="searchData.name" :placeholder="placeholder" id="input" class="f-1 m-r-5">
                    <img v-show="searchData.name != '' " @click="searchData.name = ''" class="colse scale-80-active m-r-24" src="../../../image/international/colse.png">
                    <i @click="list(title)" class="c-blue2 f-w-600 f-s-30 scale-80-active iconfont icon-search"></i>
                </div>
            </div>
        </div>
        <ul class="select-list">
             <li v-for="(v,i) in listData" :key="i" :value="v" @click="onChanged(v,i,title)">
                 <p>{{i}}</p>
             </li>
        </ul>
        <p v-if="JSON.stringify(listData) == '{}'" class="NoData">No Data</p>
    </div>
</template>
<script>
import { getCountryList , getRegions } from '*/request/axios.international'
export default {
   components:{

   },
   data() {
      return {
          slectState:false,
          placeholder:'',
          title:'',
          searchData:{
              code:'',
              name:''
          },
          countryCode:'',
          listData:{}
      }
   },
   mounted(){
   },
   computed:{
   },
   created(){
   },
   methods:{
       back(){
           this.slectState = false
       },
       choiceType(type,data){
           if(type == 'Country/Region'){
               //this.searchData.code = data.countryCode;
               //this.searchData.name = data.countryName;
               this.placeholder = 'Please enter country/region name';
               this.title = 'Country/Region';
           }
            if(type == 'city'){
               //this.searchData.code = data.cityCode;
               //this.searchData.name = data.cityName;
               this.placeholder = 'Please enter city name';
               this.title = 'City';
           }
           this.countryCode = data.countryCode;
           this.list(this.title)
           this.slectState = true
       },
       list(type){
           this._loading();
           if(type == 'Country/Region'){
                let params = {
                    text:this.searchData.name
                }
                getCountryList(params).then(res => {
                    this.listData = res.data;
                })
            }
            if(type == 'City'){
                let params = {
                    text:this.searchData.name
                }
                getRegions(this.countryCode,params).then(res => {
                    this.listData = res.data[this.countryCode];
                });
            }
       },
       onChanged(code,name,type){
           this.searchData.code = code;
           this.searchData.name = name;
           this.$emit('select',this.searchData,type)
           this.back();
           this.searchData.code = '';
           this.searchData.name = '';
       }
   },
   watch: {
   }
}
</script>
<style scoped lang='less'  type='text/less'>
.select{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    min-height: 100%;
    z-index: 999;
    background: #fff;
    .content{
        padding: 0 .32rem;
        .search-input{
            border:1px solid rgba(28,113,183,1);
            .colse{
                width: .32rem;
                height: .32rem;
            }
        }
    }
}
.select-list{
    display: inline-block;
    width: 100%;
    max-height: 11rem;
    overflow-y: auto;
    margin-top: 2.2rem;
    li{
        line-height: .88rem;
        padding:0 .32rem;
        p{
            font-size: .28rem;
            color:#333;
            padding-left: .2rem;
            border-bottom: #f6f6f6 1px solid;
        }
        &:hover{
            background: #F3F8FB;
        }
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
