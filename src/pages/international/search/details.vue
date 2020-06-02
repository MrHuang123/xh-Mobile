<template>
    <div class="p-b-120"> 
        <xHeader slot='header' title='Enterprise Details' />
        <div class="detailsContent m-t-100">
            <p class="f-s-36 c-333 l-h-50 f-w-600 m-b-12 title w-per-100">{{detailsData.name}}</p>
            <font class="f-s-24 c-32BA59" v-if="!!detailsData.enterprise &&detailsData.enterprise==1">
                <i class="f-s-24 c-32BA59 m-r-5 m-t-2 iconfont icon-combinedShape"></i>
                Certified
            </font>
            <div class="basic">
                <p class="subTitle">
                    <em></em>
                    Basic Information
                </p>
                <ul class="list">
                    <li>
                        <em>Country/Region</em>
                        <font>{{detailsData.countryName}}</font>
                    </li>
                    <li>
                        <em>City</em>
                        <font v-if="detailsData.cityName">{{detailsData.cityName}}</font>
                        <font v-else>-</font>
                    </li>
                    <li>
                        <em>Zip Code</em>
                        <font v-if="detailsData.zipCode">{{detailsData.zipCode}}</font>
                        <font v-else>-</font>
                    </li>
                    <li>
                        <em>Registration Address</em>
                        <font>{{detailsData.registrationAddress}}</font>
                    </li>
                    <li>
                        <em>Registration Number</em>
                        <font v-if="detailsData.registrationNumber">{{detailsData.registrationNumber}}</font>
                        <font v-else>-</font>
                    </li>
                    <li>
                        <em>Tax-free Code</em>
                        <font v-if="detailsData.taxFreeCode">{{detailsData.taxFreeCode}}</font>
                        <font v-else>-</font>
                    </li>
                    <li>
                        <em>VAT Code</em>
                        <font v-if="detailsData.vatCode">{{detailsData.vatCode}}</font>
                        <font v-else>-</font>
                    </li>
                    <li>
                        <em>Website</em>
                        <font v-if='detailsData.website' ><a :href='detailsData.website'>{{detailsData.website}}</a></font>
                        <font v-else>-</font>
                    </li>
                </ul>
            </div>
            <div class="basic">
                <p class="subTitle">
                    <em></em>
                    Other Information
                </p>
                <p class="f-s-28 c-333 l-h-40 p-b-30">• Download the enterprise credit report to get more information, including enterprise risk assessment, financial information and enterprise relations, etc. The specific contents are subject to the report actually downloaded.</p>
                <p class="f-s-28 c-333 l-h-40 p-b-40">• The assessment of risk ratings in the report is automatically calculated based on different risk models and is for reference only. In addition, Xinhua Credit is not liable for the data and the consequences of using it.</p>
            </div>
            <p class="f-s-28 c-000 t-c l-h-48 h-130 m-t-32">You can login on PC to download the credit report of the enterprise.</p>
        </div>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import xHeader from '@/layout/header'
import { getSearch , getInternationalDeatil } from '*/request/axios.international'
export default {
   components:{xHeader},
   data() {
      return {
          detailsData:{}
      }
   },
   mounted(){
       this.init();
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
       init(){
           if(localStorage.internationalDetails){
                var data = JSON.parse(localStorage.internationalDetails)
                console.log(data)
                if(data.isCustom == '1'){
                    this.detailsData = {
                        ...data,
                        taxFreeCode:data.taxfreeCode,
                        vatCode:data.vATCode
                    };
                }else{
                    let params = {
                        cityCode:data.city?data.city:'',
                        company:data.name,
                        countryCode:data.countryCode,
                    };
                    localStorage.setItem("international", JSON.stringify(params));
                    console.log(data,params)
                    this._loading();
                    getInternationalDeatil({
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
                    }).then(res=>{
                        this.$toast.clear()
                        if(res.code == 200){
                            this.detailsData = res.data
                            if(this.detailsData.cityName != ''){
                                    this.detailsData.cityName = this.detailsData.cityName;
                                }
                                if(!!this.detailsData.website){
                                console.log(item)
                                if(this.detailsData.website.includes("http") || this.detailsData.website.includes("https")){
                                    this.detailsData.website = this.detailsData.website;
                                }else{
                                    this.detailsData.website = "http://"+this.detailsData.website
                                }
                            }
                        }
                    }).catch(err=>[
                        this.$toast.clear()
                    ])
                    // getSearch(params).then(res => {
                    //     if(res.data.eearchVos != undefined){
                    //         for(var i = 0; i<res.data.eearchVos.length; i++){
                    //             if(res.data.eearchVos[i].registrationAddress == data.registrationAddress &&
                    //               res.data.eearchVos[i].name == data.name){
                    //                 this.detailsData = res.data.eearchVos[i]
                    //                 //console.log(data);
                    //                 if(this.detailsData.website != undefined && this.detailsData.website != ''){
                    //                     if(!!this.detailsData.website&&(this.detailsData.website.includes("http") || this.detailsData.website.includes("https"))){
                    //                         this.detailsData.website = this.detailsData.website;
                    //                     }else{
                    //                         this.detailsData.website = "http://"+this.detailsData.website
                    //                     }
                    //                 }

                    //             }
                                
                    //         }
                    //     }
                    // });
                }
           }    
       }
   },
   watch: {
   }
}
</script>
<style scoped lang='less'  type='text/less'>
.detailsContent{
  padding: 0 .32rem;
  .title{
      display: inline-block;
      margin-top: .14rem;
  }
  .basic{
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 20px 0px rgba(0,0,0,0.1);
      border-radius:8px;
      margin-top: .4rem;
      padding:0 .2rem;
      .subTitle{
          height: .68rem;
          line-height: .68rem;
          border-bottom: #eee 1px solid;
          font-size: .32rem;
          color:#333;
          margin-bottom: .2rem;
          em{
              float:left;
              width: .04rem;
              height: .2rem;
              background:rgba(28,113,183,1);
              border-radius:1px;
              margin-top: .24rem;
              margin-right: .2rem;
          }
      }
      .list{
          display: inline-block;
          width: 100%;
          li{
              float:left;
              width: 100%;
              em,font{
                  line-height: .48rem;
                  font-size: .28rem;
                  margin-bottom: .12rem;
              }
              em{
                  float:left;
                  width: 45%;
                  color: #666
              }
              font{
                  float:right;
                  width: 54%;
                  color:#333;
                  a{
                      color: #1C71B7;
                  }
              }
          }
      }
   }
}
</style>
