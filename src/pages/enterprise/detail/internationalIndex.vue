<template>
  <div class="p-enter-home p-t-100">
    <!-- 企业首页**我的入口 -->
    <main class="p-30 bg-fff">
      <!-- 企业信息 -->
      <section>
        <div class="d-f p-r-30">
          <h3 class="f-s-36 c-333">{{companyData[0].companyName}}</h3>
        </div>
        <div class="m-t-25 d-f h-40 m-t-15" v-if="enterpriseState">
          <font class="f-s-24 c-32BA59">
                <i class="f-s-24 c-32BA59 m-r-5 m-t-2 iconfont icon-combinedShape"></i>
                Certified
            </font>
        </div>
        <div class="m-t-30 p-lr-25 p-tb-30 bg-fff shadow-app b-app b-r-8">
          <section class="d-f">
             <Icon class="f-s-30 c-999 m-r-25" type='icon-email' />
             <p class="f-s-22 c-999" v-if="companyData[0].email">{{companyData[0].email}}</p>
             <p class="f-s-22 c-999" v-else>-</p>
          </section>
          <section class="d-f m-t-15">
             <Icon class="f-s-30 c-999 m-r-25" type='icon-earth' />
             <p class="f-s-22 c-999" v-if="companyData[0].website">{{companyData[0].website}}</p>
             <p class="f-s-22 c-999" v-else>-</p>
          </section>
          <section class="d-f m-t-15">
             <Icon class="f-s-30 c-999 m-r-25" type='icon-position' />
             <p class="f-s-22 c-999" v-if="companyData[0].address">{{companyData[0].address}}</p>
             <p class="f-s-22 c-999" v-else>-</p>
          </section>
        </div>  

      </section>
      <!-- 企业模块入口 -->
      <section class="m-t-30">
         <ul class="">
            <li v-for='(item,index) in modules' @click='jump(item.route)' :key='index'  class="h-90 f-b-c">
              <Icon :type='item.icon' class="m-r-30 f-s-32 w-35 c-1C71B7" />
              <p class="f-1 h-per-100 f-b-c b-2-eee b-no-lr b-no-t">
                <span class="white-1 c-333 f-s-28">{{item.title}}</span>
                <Icon type='icon-right' class="f-s-32 c-999" />
              </p>
            </li>
         </ul>
      </section>
    </main>
    <footer class="p-30 p-b-60">
      <p class="c-C63639 f-s-22">
      * All data and information provided by our organization to credit reporting agencies are authentic, accurate and without major omissions.
      </p>
    </footer>
  </div>
</template>
<script>
// 企业主页
import xHeader from '@/layout/header'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import { getSearch , findInternationalCompanyDetail} from '*/request/axios.international'

// import {
//   requesetGetCompanyDetail
// } from '../../../request/axios.credit.js'

export default {
  components:{xHeader},
  data(){
    return {
      // company:{},
      modules:[
        {icon:'icon-base-info',title:'Basic Information',route:'details'},
        {icon:'icon-share',title:'Settle-in Sharing',route:'share'}, 
      ],
      companyData:[
        {
          companyName:'',
          email:'',
          website:'',
          address:'',
          companyId:'',
        }
      ],
      uid:'',
      enterpriseState:false,
      detailsData:{},
    }
  },
  computed:{
  },
  created(){
  },
  mounted(){
    this.init();
  },
  methods:{
    ...mapActions("userCenter", [
            "getUserCenterUserInfo",
    ]),
    jump(name){
      //console.log(this.detailsData);
      if(name == 'share'){
        if(this.detailsData.enterprise == '1'){
          this.$router.push({
            path:'/international/share',
            query:{
              id:this.companyData[0].companyId,
              companyName:this.companyData[0].companyName,
            }
          })
        }else{
          this.$dialog.alert({
              message:'The company has not settled-in',
              confirmButtonText:'OK'
            }).then(() => {
               
            });
        }

      }
      if(name == 'details'){
           this.$router.push({
               path:'/international/details',
           })
           localStorage.setItem("internationalDetails", JSON.stringify(this.detailsData));
      }
    },
    init(){
      !!localStorage.access_token&&this.getUserCenterUserInfo().then((res)=>{
                this.uid = res.data.username;
                this.details();
       })
    },
    details(){
       if(localStorage.internationalData){
          this._loading();
          this.companyData = JSON.parse(localStorage.internationalData);
          if(this.companyData[0].isCustom == '1'){
                  findInternationalCompanyDetail({
                        companyId:this.companyData[0].companyId,
                        username:this.uid,
                  }).then(res=>{
                      //console.log(res.data.status);
                      this.detailsData = {
                        ...res.data,
                        enterprise:res.data.status,
                        name:res.data.companyNameEn,

                        countryCodeName:res.data.countryName,
                        cityName:res.data.cityName,
                        zipCode:res.data.zipCode,
                        registrationAddress:res.data.addressEn
                      }
                      //console.log(this.detailsData)
                      if(this.detailsData.enterprise == '1'){
                          this.enterpriseState = true;
                      }else{
                          this.enterpriseState = false;
                      }
                  })
          }else{
              if(this.companyData[0].website != ''){
                  if(this.companyData[0].website.includes("http") || this.companyData[0].website.includes("https")){
                  this.companyData[0].website = this.companyData[0].website;
                  }else{
                  this.companyData[0].website = "http://"+this.companyData[0].website
                  }
              }
            let params = {
                  cityCode:this.companyData[0].city?this.companyData[0].city:'',
                  company:this.companyData[0].companyName,
                  countryCode:this.companyData[0].country,
              };
              //localStorage.setItem("international", JSON.stringify(params));
              //console.log(this.companyData,params)
              getSearch(params).then(res => {
                if(res.data.eearchVos != undefined){
                    for(var i = 0; i<res.data.eearchVos.length; i++){
                        if(res.data.eearchVos[i].registrationAddress == this.companyData[0].address &&
                           res.data.eearchVos[i].name == this.companyData[0].companyName){
                            this.detailsData = res.data.eearchVos[i];
                            if(res.data.eearchVos[i].enterprise == '1'){
                                this.enterpriseState = true;
                            }else{
                                this.enterpriseState = false;
                            }
                            //console.log(this.detailsData,this.enterpriseState)
                        }
                    }
                }
              });
          }
       }
    }
  }
}
</script>