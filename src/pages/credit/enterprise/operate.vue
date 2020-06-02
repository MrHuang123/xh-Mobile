<template>
  
  <div class='m-t-15 p-lr-30'>
    <ul>
      <router-link v-for='(item,index) in list'  :key='index' tag='li' :to='item.path+"/"+item.type' class='h-90 f-s-c'>
        <Icon :type='item.icon' class="f-s-32 c-blue m-r-30"/>
        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
          <span class='c-333 f-s-28 white-1'>
          {{item.en}}
          </span>
          <span class='f-c'>
            <span class='f-s-28 c-666 m-r-15'>{{item.num}}</span>
            <Icon type='icon-right' class='f-s-30 c-999 m-t-2'/>
          </span>
        </p>
      </router-link>
    </ul>
  </div>

</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'

export default {
  computed:{
    ...mapState(['lan']),
    ...mapState('creditEnterprise',['eciOperation','isRequested','totalAllDetail']),
    list(){
      return [
        // 融資信息
        {icon:'icon-money',path:'detail',zh:'融资信息',en:'Financing',num:this.totalAllDetail.financings,type:'financings'},
        // 財務總覽信息
        {icon:'icon-charts',path:'detail',zh:'财务总览信息',en:'Financial Overview',num:this.totalAllDetail.financingTaxes,type:'financingTaxes'},
        // 產品信息
        {icon:'icon-product',path:'detail',zh:'产品信息',en:'Products',num:this.totalAllDetail.products,type:'products'},
        // 抽查信息
        {icon:'icon-search-random',path:'detail',zh:'抽查信息',en:'Random Inspection',num:this.totalAllDetail.spotChecks,type:'spotChecks'},
        // 招投標信息--待定
        // {icon:'icon-bid',path:'detail',title:'Tender',num:this.eciOperation.mpledges.length,type:'tender'},
        // {icon:'icon-bid',path:'detail',title:'Tendering and Bidding',num:'等接口',type:'tender'},
        // 招聘類信息
        {icon:'icon-flag',path:'detail',zh:'招聘类信息',en:'Recruitment',num:this.totalAllDetail.recruitInfos,type:'recruitInfos'},
      ]
    }
  },
  mounted(){
    this.getOperateList()
  },
  methods:{
    ...mapActions('creditEnterprise',[
      'getTaxes',
      'getFinancing',
      'getProduct',
      'getSpotcheck',
      'getRecruit'
    ]),
    getOperateList(){
      this._loading();
      Promise.all([
        this.getTaxes({
          companyId:this.$route.params.id
        }),
        this.getFinancing({
          companyId:this.$route.params.id
        }),
        this.getProduct({
          companyId:this.$route.params.id
        }),
        this.getSpotcheck({
          companyId:this.$route.params.id
        }),
        this.getRecruit({
          companyId:this.$route.params.id
        })
      ])
      .then(res=>{
        this._clear()
      })
      .catch(()=>{
        this._clear()
      })
    }
  }
}
</script>
