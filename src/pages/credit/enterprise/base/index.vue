<template>
  
  <div class='m-t-15 p-lr-30'>
    <ul>
      <router-link 
        v-for='(item,index) in list' 
        :key='index'  
        tag='li' 
        :to='item.path.includes("detail")?item.path+"/"+item.type:item.path' 
        class='h-90 f-s-c'
      >
        <Icon :type='item.icon' class="f-s-32 c-blue m-r-30"/>
        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
          <span class='c-333 f-s-28 break-word white-1'>
          {{item.en}}
          </span>
          <span class='f-e-c w-140'>
            <span class='f-s-28 c-666 m-r-15'>{{item.num}}</span>
            <Icon type='icon-right' class='f-s-30 c-999 m-t-2'/>
          </span>
        </p>
      </router-link>
    </ul>
  </div>

</template>
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
import {

  getPartner,
  getEmployee,
  getBranch,
  getChange,
  getOpexception,
  getInvest,

} from '*/request/axios.company'

export default {

  computed:{
    ...mapState(['lan']),
    ...mapState('creditEnterprise',['eci','eciOperation','totalAllDetail']),
    ...mapGetters('creditEnterprise',['scopeLength']),
    
    list(){
      return [
              // 基本信息
              {icon:'icon-base-info',path:'basic',en:'Basic Info',zh:'基本信息',num:'',type:''},
              // 股東出資方
              {icon:'icon-partners',path:'../detail',en:'Shareholder & Investor',zh:'股东出资方',num:this.totalAllDetail.partner,type:'partner'},
              // 對外投資
              {icon:'icon-invest',path:'../detail',en:'External Investments',zh:'对外投资',num:this.totalAllDetail.invest,type:'invest'},
              // 分支機構
              {icon:'icon-branch',path:'../detail',en:'Branches',zh:'分支机构',num:this.totalAllDetail.branch,type:'branch'},
              // 工商變更記錄
              {icon:'icon-company-change',path:'../detail',en:'Change Records of Industrial and Commercial Registration',zh:'工商变更记录',num:this.totalAllDetail.change,type:'change'},
              // 經營範圍變更
              {icon:'icon-scope-change',path:'../detail',en:'Changes in Business Scope',zh:'经营范围变更',num:this.totalAllDetail.scope,type:'scope'},
            ]
    }
  },
  mounted(){
    // this._loading()
    this.getBaseList()
  },
  methods:{
    ...mapActions('creditEnterprise',[
      'changeDetail',
      'getPartner',
      'getBranch',
      'getChange',
      'getInvest'
    ]),
    getBaseList(){
      this._loading();
      Promise.all([
        this.getPartner({
          companyId:this.$route.params.id
        }),
        this.getBranch({
          companyId:this.$route.params.id
        }),
        this.getChange({
          companyId:this.$route.params.id,
          type:false,
        }),
        this.getChange({
          companyId:this.$route.params.id,
          type:true,
        }),
        this.getInvest({
          companyId:this.$route.params.id,
        }),
      ])
      .then(res=>{
        this._clear()
      })
    }
  },

}
</script>
