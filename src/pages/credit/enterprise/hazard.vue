<template>
  <div class='m-t-15 p-lr-30'>
    <ul>
      <router-link v-for='(item,index) in list' :key='index'  tag='li' :to='item.path+"/"+item.type' class='h-90 f-s-c'>
        <Icon :type='item.icon' class="f-s-32 c-blue m-r-30"/>
        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
          <span class='c-333 f-s-28 break-word white-1'>
          {{item.en}}
          </span>
          <span class='w-140 f-e-c'>
            <span class='f-s-28 c-666 m-r-15 '>{{item.num}}</span>
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
  data(){
    return {
      
    }
  },
  computed:{
    ...mapState(['lan']),
    ...mapState('creditEnterprise',['eciOperation','eci','totalAllDetail']),
    list(){
      return [
        // 動產抵押
        {icon:'icon-pledge',path:'detail',zh:'动产抵押',en:'Pledge of Movables',num:this.totalAllDetail.mpledges,type:'mpledges'},
        // 股權出資
        {icon:'icon-stock-right',path:'detail',zh:'股权出资',en:'Equity Pledge',num:this.totalAllDetail.pledges,type:'pledges'},
        // 清算信息
        {icon:'icon-calculator',path:'detail',zh:'清算信息',en:'Liquidation',num:this.totalAllDetail.liquidations,type:'liquidations'},
        // 工商异常
        {icon:'icon-list-danger',path:'detail',zh:'工商异常',en:'List of Industrial and Commercial Exceptions',num:this.totalAllDetail.opExceptions,type:'opExceptions'},
        // 行政處罰
        {icon:'icon-gov-punish',path:'detail',zh:'行政处罚',en:'Administrative Penalty',num:this.totalAllDetail.penaltys,type:'penaltys'},
      ]
    }
  },
  mounted(){
    this.getHazardList()
  },
  methods:{
    ...mapActions('creditEnterprise',[
      'getMpledge',
      'getPledge',
      'getLiquidation',
      'getPenalty',
      'getOpexception',
    ]),
    getHazardList(){
      this._loading()
      Promise.all([
        this.getMpledge({
          companyId:this.$route.params.id
        }),
        this.getPledge({
          companyId:this.$route.params.id
        }),
        this.getLiquidation({
          companyId:this.$route.params.id
        }),
        this.getPenalty({
          companyId:this.$route.params.id
        }),
        this.getOpexception({
          companyId:this.$route.params.id
        }),
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
