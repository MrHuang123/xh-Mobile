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
// 翻译未解决
import {mapState,mapActions,mapMutations} from 'vuex'

export default {
  computed:{
    ...mapState(['lan']),
    ...mapState('creditEnterprise',['eciAsset','totalAllDetail']),
  
    list(){
      return [
        // 专利信息
        {icon:'icon-news',path:'detail',en:'Patents',zh:'专利信息',num:this.totalAllDetail.patentDetails,type:'patentDetails'},
        // 软件著作权限
        {icon:'icon-opus-change',path:'detail',en:'Software Copyright',zh:'软件著作权限',num:this.totalAllDetail.softwareCopyrightses,type:'softwareCopyrightses'},
        // 作品著作
        {icon:'icon-opus-info',path:'detail',en:'Copyright of Works',zh:'作品著作',num:this.totalAllDetail.copyrights,type:'copyrights'},
        // 网站信息
        {icon:'icon-website',path:'detail',en:'Websites',zh:'网站信息',num:this.totalAllDetail.websites,type:'websites'},
        // 证书信息
        {icon:'icon-certification-info',path:'detail',en:'Certificate',zh:'证书信息',num:this.totalAllDetail.certifications,type:'certifications'},
        // 商标信息
        {icon:'icon-money',path:'detail',en:'Trademark',zh:'商标信息',num:this.totalAllDetail.tmInfos,type:'tmInfos'},
      ]
    }
  },
  mounted(){
    // this._loading();
     this.getIntellList()

  },
  methods:{
    ...mapActions('creditEnterprise',[
      'getPatentDetail',
      'getSoftwareCopyrights',
      'getCopyrights',
      'getWebsites',
      'getCertification',
      'getTmInfo',
    ]),
    getIntellList(){
      this._loading()
      Promise.all([
        this.getPatentDetail({
          companyId:this.$route.params.id
        }),
        this.getSoftwareCopyrights({
          companyId:this.$route.params.id
        }),
        this.getCopyrights({
          companyId:this.$route.params.id
        }),
        this.getWebsites({
          companyId:this.$route.params.id
        }),
        this.getCertification({
          companyId:this.$route.params.id
        }),
        this.getTmInfo({
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
