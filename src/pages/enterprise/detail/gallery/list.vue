<template>
  <!-- 照片墻 -->
  <x-article>
    <main slot='main'>
      <ul v-if='editDetailInfo.t_photo_wall.length'  class='p-t-15'>
        <li v-for='(item,index) in editDetailInfo.t_photo_wall' :key='index'>
          <section v-if='!isEnableButton' tag='li'  class="f-b-c h-90 b-2-eee b-no-lr b-no-t ">
            <p class="white-1 f-s-28 f-w-600 c-ccc">{{item.picTitle}}</p>
            <span class='c-ccc f-s-26'>In the audit</span>
          </section>
          <router-link v-else tag='li'  :to='"edit/"+index' :key='index' class="f-b-c h-90 b-2-eee b-no-lr b-no-t">
            <p class="white-1 f-s-28 f-w-600">{{item.picTitle}}</p>
            <Icon @click.stop.prevent.native='deleteItem(item.id)' type='icon-trash' class="m-l-40 c-C63639 f-s-32 scale-50-active"/>
          </router-link>
        </li>
      </ul>
      <NoData  v-else />
    </main>
    <div slot='footer' class="p-r f-c f-1 h-90  b-r-45" :class='isEnableButton?"bg-linear-header":"bg-color-ccc"' >
      <span @click='isEnableButton && submitAudit()' class="c-fff">Submit</span>
      <section class='p-a h-100 w-per-100 bg-color-ccc translateY-per-100-reverse zezhao-footer'>
        <span v-if='editDetailInfo.t_photo_wall.length<10' @click='isEnableButton && $router.push("edit/add")'>
          <Icon type='icon-add'  class='p-a-xr-yt  f-s-90  b-r-circle translateY-40-reverse' :class='!isEnableButton?" c-ccc ":" c-1C71B7 add-shadow "'/>
        </span>
        <Icon type='icon-add' v-else @click='_toast("Photo up to 10")'  class='p-a-xr-yt f-s-90 c-ccc b-r-circle translateY-40-reverse'/>

      </section>
    </div>
  </x-article>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import xArticle from '@/layout/article'
import {requestSubmitVision,getIsEnableButtom} from '*/request/axios.enterprise'

export default {
  components:{xArticle},
  data(){
    return{
      isEnableButton:false
    }
  },
  computed:{
    ...mapState('enterDetail',['editDetailInfo'])
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.changeTitle('Photo Wall')
    })
  },
  mounted(){
    this.requestVision({tableName:'t_photo_wall',companyId:this.$route.params.id})
    this.getIsEnableButtom()
  },
  methods:{
    ...mapActions('enterDetail',['requestVision','requestDeleteVision','changeTitle']),
    ...mapMutations('enterDetail',['changeKeyVision']),
    async getIsEnableButtom(){
      this.isEnableButton = await getIsEnableButtom({
        companyId:this.$route.params.id,
        auditType:'t_photo_wall'
      })
      .then(res=>{
        return res.data
      })

    },
    // 提交审核
    async submitAudit(){

      let ids = [];
      
      this.editDetailInfo.t_photo_wall.forEach(item=>{
        item.isPass != 2  && ids.push(item.id)
      })

      await requestSubmitVision({
        ids:ids.join(','),
        auditType:'t_photo_wall',
        companyId:this.$route.params.id,
      })
      .then(res=>{
        this._success();
        this.requestVision({tableName:'t_photo_wall',companyId:this.$route.params.id})
        this.$router.back()

      })

      this.getIsEnableButtom()
      // .catch(()=>{
      //   this._fail()
      // })
    },
    async deleteItem(id){
      
      await this.requestDeleteVision({
        tableName:'t_photo_wall',
        id
      })
      .then(()=>{
        setTimeout(()=>{
          this._success();
          this.requestVision({tableName:'t_photo_wall',companyId:this.$route.params.id})
        },0)

      })

      this.isEnableButton()

    },
  }  
}
</script>
