<template>
  <div class='p-b-120'> 
    <header class='m-t-30 d-f'>
      <Icon type='icon-enterprise' class='f-s-30 c-blue' />
      <p class='m-l-30 f-s-28 f-w-600 c-333 '>
        {{company.companyName}} 
      </p>
    </header>
    <main class='m-t-30 shadow-content p-30'>
      <section class='b-app p-b-30 b-no-lrt'>
        <p class="f-b-c">
          <span class='f-s-24 c-333 f-w-600 '>Credit Code</span>
          <span class='f-s-24 c-999 f-1 t-r'>{{company.creditCode}}</span>
        </p>
        <p class="f-b-c m-t-25">
          <span class='f-s-24 c-333 f-w-600 '>Legal Representative</span>
          <span class='f-s-24 c-999 f-1 t-r'>{{company.operName}}</span>
        </p>
        <p class="f-b-c m-t-25">
          <span class='f-s-24 c-333 f-w-600'>Status of Certification</span>
          <span class='f-s-24 c-999 f-1 t-r'>{{company.status}}</span>
        </p>
      </section>
      <section class='p-t-30'>
        <h3 class='f-s-24 c-333 f-w-600'>Registered Address</h3>
        <p class='m-t-15 f-s-24 c-999 l-h-30'>
          {{company.address}}
        </p>
      </section>
    </main>
    <footer>
      <section class='m-t-30 d-f'>
        <Icon type='icon-gallery' class='f-s-30 c-blue' />
        <p class='m-l-30 f-s-28 f-w-600 c-333 '>
          Click here to take a picture of/upload business license
        </p>
      </section>
      <section class='m-t-30 clearfix' style='margin-right:-15px;'>
        <div v-for='(item,index) in licenseList' :key='index' :style='{"background-image":"url("+item.url+")"}' class='w-148 h-148 b-r-4 step1-bg f-l m-r-30 p-r'>
          <span @click='deleteItem(index)' class='h-40 w-40 p-a-xr-yt bg-red f-c'>
            <Icon class='c-fff f-s-24' type='icon-trash' />
          </span>
        </div>
        <div v-if='licenseList.length<3' class='w-148 h-148 p-r f-l bg-app b-r-8 f-c o-h'>
          <!-- <form action=""> -->
            <!-- <input type="file" multiple  @change='uploadLicense' class='p-a-xl-yt h-per-100 w-per-100 o-0' /> -->
          <!-- </form> -->
          <img src="../../../image/icon/icon_photo.png" alt="" class='w-72' />
          <xUpload @cb='uploadLicense' :length='3' :accept="accept" class='h-per-100 w-per-100 p-a o-0' />
        </div>
      </section>
      <section class='m-t-30 f-s-24 c-C63639 l-h-42'>Enterprises having not realized consolidation of three certificates into one must also provide tax registration certificate and photocopies of organizational code certificate and business qualification (permit) certificate</section>
    </footer>
    <aside class='p-tb-50 f-c'>
      <button @click='$router.push("/enterprise/identify/step0")' class='w-312 h-88 f-c b-blue b-w-1 b-r-44 m-r-30'><span class='c-app f-s-32'>Previous</span></button>
      <button v-if='licenseList.length&&!!company.companyName'  @click='$router.push("step2")' class='w-312 h-88 f-c bg-linear-header b-r-44 '><span class='c-fff f-s-32 '>Next</span></button>
      <button v-else  class='w-312 h-88 f-c bg-ccc b-r-44 '><span class='c-fff f-s-32 '>Next</span></button>
    </aside>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
import { localUpload } from '../../../request/axios.common'
import xUpload from '@/upload/index.vue'


export default {
  data(){
    return {
      accept:'image/*',
    }
  },
  components:{xUpload},
  computed:{
    ...mapGetters('enterDetail',['company']),
    ...mapState('enterIdentify',['licenseList']),
    ...mapState(['userId','appId'])
  },
  mounted(){
        
    
  },
  methods:{
  
    ...mapMutations('enterIdentify',['changeKey','changeIdentify']),

  
    deleteItem(index){
      let licenseList = JSON.parse(JSON.stringify(this.licenseList));

      licenseList.splice(index,1)

      this.changeKey({
        licenseList
      })

    },
    uploadLicense(file){
      this.changeKey({
        licenseList:this.licenseList.concat(file)
      })

      this.$nextTick(()=>{
        this.changeIdentify({
          certificationImg:this.licenseList.map(item=>item.url).join(',')
        })
      })
     

    }

  }
}
</script>

<style lang="stylus">
.shadow-content
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.05);
.step1-bg
  background-repeat no-repeat
  background-size cover
  background-position center center

</style>
