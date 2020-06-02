<template>
  <div class=' p-lr-30 p-b-30 ' :class='lan==="en"?"p-t-100":""'>
    <van-notice-bar
        :speed='40'
        class="p-f pos-t-100 pos-l-0 w-per-100 h-88 p-lr-64 z-100 detail"
        color="#1C71B7"
        background="#e7eef7"
        :left-icon=' isManual ? " iconfont icon-rengong" : " iconfont icon-jiqifanyi" '
       
        v-if='lan==="en"&&details.length'
      >
      <template slot='default'>
        <div>

        {{
          isManual ? 
          "The following information is from human translation.":
          "The following information is from machine translation, for reference only."
        }}
        </div>
      </template>
    </van-notice-bar>
    <van-list
      v-if='details.length'
      class='p-x-h'
      :finished="details.length>=total"
      :offset='page>15?50:100'
      finished-text=""
      loading-text="loading..."
      v-model='isLoading'
      :immediate-check='true'
      @load='getData()'
    >
      <ul >
        <li v-for='(item,index) in details' :key='index' class='m-t-30 shadow-app b-r-8 o-h p-b-30'>
          <header v-if='item.header' class='bg-linear-section-header p-30 l-h-40 f-s-28 c-333'>
            {{item.header}}
          </header>
          <main v-if='item.list' class='p-lr-20'>
            <li v-for='(unit,$i) in item.list' :key='$i' class='m-t-30 d-f'>
              <span class='b-r-circle h-10 w-10 m-t-10 bg-color-1C71B7'></span>
              <div class='m-l-20 f-1'>
                <h4 class='f-s-24 c-333'>{{unit.title}}</h4>
                <p class='f-s-24 c-999 m-t-10' v-html='unit.content'></p>
              </div>
            </li>
          </main>
        </li>
      </ul>
    </van-list>
    <NoData v-else />
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import { NoticeBar,List } from 'vant'

Vue.use(NoticeBar)
Vue.use(List)

export default {
  name:'detailEnter',
  data(){
    return {
      // type
      to:{},
      from:{},
      page:1,
      isLoading:false,
    }
  },
  
  computed:{
    ...mapState('creditEnterprise',['eci','details','isBrand','totalAllDetail']),
    ...mapState(['lan']),
    isManual(){
      const typeList = ['partner','invest','branch','change','scope'];
      return typeList.includes(this.$route.params.type) && this.isBrand;
    },
    total(){
      return this.totalAllDetail[this.$route.params.type]
    },
  },
  beforeRouteEnter(to,from,next){
    next( vm=>{

        vm.to = to;
        vm.from = from ;
        vm.getData(to,from)

    })
  },
  // mounted(){
    // this.page = 1;
  // },
  destroyed(){
    this.changeKey({details:[]})
  },
  watch:{
    lan(){
      this.getData(this.to,this.from,true)
    }
  },
  methods:{
    ...mapMutations('creditEnterprise',['changeKey']),
    ...mapActions('creditEnterprise',[
      'changeDetail',
      'getPartner',
      'getBranch',
      'getChange',
      'getEmployee',
      'getOpexception',
      'getSoftwareCopyrights',
      'getCertification',
      'getCopyrights',
      'getPatentDetail',
      'getTmInfo',
      'getWebsites',
      'getCase',
      'getCourts',
      'getShixin',
      'getZhixing',
      'getTaxes',
      'getFinancing',
      'getInvest',
      'getMpledge',
      'getProduct',
      'getRecruit',
      'getSpotcheck',
      'getPledge',
      'getLiquidation',
      'getPenalty',
  
    ]),
    getData(to=this.to,from=this.from,isRefresh=false){
        
        this.page==1 && this._loading();

        // if(this.isLoading) return ;

        this.isLoading = true;
        
        const vm = this;
       
       async function * getDetails (){
        
        const {type,id } = to.params;

        const companyId = id;

        // if(!from.path.includes('/enter/')||isRefresh){
          switch (type){
            case 'partner':
              await vm.getPartner({companyId,page:vm.page});
              break ;
            case 'invest':
              await vm.getInvest({companyId,page:vm.page});
              break ;
            case 'branch':
              await vm.getBranch({companyId,page:vm.page});
              break ;
            case 'change':
              await vm.getChange({companyId,page:vm.page,type:false});
              break ;
            case 'scope':
              await vm.getChange({companyId,type:true,page:vm.page});
              break ;
            case 'patentDetails':
              await vm.getPatentDetail({companyId,page:vm.page});
              break ;
            case 'softwareCopyrightses':
              await vm.getSoftwareCopyrights({companyId,page:vm.page});
              break ;
            case 'copyrights':
              await vm.getCopyrights({companyId,page:vm.page});
              break ;
            case 'websites':
              await vm.getWebsites({companyId,page:vm.page});
              break ;
            case 'certifications':
              await vm.getCertification({companyId,page:vm.page});
              break ;
            case 'tmInfos':
              await vm.getTmInfo({companyId,page:vm.page});
              break ;
            case 'debtor':
              await vm.getZhixing({companyId,page:vm.page});
              break ;
            case 'dishonest':
              await vm.getShixin({companyId,page:vm.page});
              break ;
            case 'cases':
              await vm.getCase({companyId,page:vm.page});
              break ;
            case 'chinaCourts':
              await vm.getCourts({companyId,page:vm.page});
              break ;
            case 'financings':
              await vm.getFinancing({companyId,page:vm.page});
              break ;
            case 'financingTaxes':
              await vm.getTaxes({companyId,page:vm.page});
              break ;
            case 'products':
              await vm.getProduct({companyId,page:vm.page});
              break ;
            case 'spotChecks':
              await vm.getSpotcheck({companyId,page:vm.page});
              break ;
            case 'recruitInfos':
              await vm.getRecruit({companyId,page:vm.page});
              break ;
            case 'mpledges':
              await vm.getMpledge({companyId,page:vm.page});
              break ;
            case 'pledges':
              await vm.getPledge({companyId,page:vm.page});
              break ;
            case 'liquidations':
              await vm.getLiquidation({companyId,page:vm.page});
              break ;
            case 'opExceptions':
              await vm.getOpexception({companyId,page:vm.page});
              break ;
            case 'penaltys':
              await vm.getPenalty({companyId,page:vm.page});
              break ;
            default :
              break ;
          }
        // }
        vm._clear();
        return yield {type,companyId}
      };
      const handleDetail = getDetails().next()

      handleDetail.then(({done,value})=>{
        
        const {type} = value ;
        
        // this.changeDetail(type) ;
        // let timer1 = setTimeout(()=>{
        //   clearTimeout(timer1)
        //   this.changeDetail(type) ;
        // },300)
        // let timer2 = setTimeout(()=>{
        //   clearTimeout(timer2)
        //   this.changeDetail(type) ;
        // },600)
        let timer3 = setTimeout(()=>{
          clearTimeout(timer3)
          this.changeDetail(type) ;
          vm.page++;
        },400)
        let timer4 = setTimeout(()=>{
          clearTimeout(timer4)
          // this.changeDetail(type) ;
          this.isLoading = false;
        },800)
        // let timer5 = setTimeout(()=>{
        //   clearTimeout(timer5)
        //   this.changeDetail(type) ;
        // },1000)
        
      });


      
    }
  }
}
</script>
<style lang="stylus">
.bg-linear-section-header
  background:linear-gradient(90deg,rgba(1,69,168,0.1) 0%,rgba(28,113,183,0.02) 100%);
  position relative
  &:before
    content :''
    position absolute
    height 100%
    width 6px
    background #0145A8
    top 0
    left 0
.van-notice-bar__wrap
  line-height 0.36rem
</style>

