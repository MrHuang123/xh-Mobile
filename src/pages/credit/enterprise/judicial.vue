<template>
  
  <div class='m-t-15 p-lr-30'>
    <ul>
      <router-link v-for='(item,index) in list' :key='index' tag='li' :to='item.path+"/"+item.type' class='h-90 f-s-c'>
        <Icon :type='item.icon' class="f-s-32 c-blue m-r-30"/>
        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
          <span class='c-333 f-s-28 white-1'>
          {{item.en}}
          </span>
          <span class='w-140 f-e-c'>
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
    ...mapState('creditEnterprise',['law','isRequested','totalAllDetail']),
    
    list(){
      return [
                // 被执行人信息
                {icon:'icon-user3',path:'detail',zh:'被执行人信息',en:'Person Subject to Enforce',num:this.totalAllDetail.debtor,type:'debtor'},
                // 失信被执行人信息
                {icon:'icon-break-faith',path:'detail',zh:'失信被执行人信息',en:'Credit Defaulter Subject to Enforce ',num:this.totalAllDetail.dishonest,type:'dishonest'},
                // 裁判文书信息
                {icon:'icon-certification-info',path:'detail',zh:'裁判文书信息',en:'Judicial Documents',num:this.totalAllDetail.cases,type:'cases'},
                // 法院公告信息
                {icon:'icon-announce',path:'detail',zh:'法院公告信息',en:'Court Announcements',num:this.totalAllDetail.chinaCourts,type:'chinaCourts'},
             ]
    }
  },
  mounted(){
    this.getJudicalList()
  },
  methods:{
    ...mapActions('creditEnterprise',[
      'getCase',
      'getCourts',
      'getShixin',
      'getZhixing'
    ]),
    getJudicalList(){
      this._loading();
      Promise.all([
        this.getCase({
          companyId:this.$route.params.id
        }),
        this.getCourts({
          companyId:this.$route.params.id
        }),
        this.getShixin({
          companyId:this.$route.params.id
        }),
        this.getZhixing({
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
