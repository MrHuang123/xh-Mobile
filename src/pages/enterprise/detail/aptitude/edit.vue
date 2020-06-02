<template>
  <!-- 编辑 -->
  <x-article>
    <article slot='main'>
      <router-link tag='section'  to='../title' class='h-90 b-f6f6f6 b-no-lr b-no-t f-b-c'>
        <span class='c-333 f-s-28 f-w-600'>Title</span>
        <p class='f-e-c'>
          <span class='f-s-28 c-666 white-1 t-r m-r-15 w-495'>{{addDetailInfo.t_qa_info.picTitle}}</span>
          <Icon type='icon-right' class='f-s-32 c-666' />
        </p>
      </router-link>
      
      <!-- 視頻展示部分 -->
      <section class='p-t-80 f-column f-c'>
        <h3 class='f-s-28 c-333 f-w-600 t-c'>Click here to take a picture/upload</h3>
        <div v-if='addDetailInfo.t_qa_info.picUrl' class='w-560 h-335 p-r d-f m-t-50 b-f6f6f6 b-w-1 p-20 '>
          <img class='h-per-100 w-per-100' :src="addDetailInfo.t_qa_info.picUrl" alt="">
          <span @click='clearPicUrl' class='p-a-xr-yt h-50 w-50 m-t-25 m-r-25 f-c ' style='background:rgba(255,255,255,0.6)'>
            <Icon type='icon-trash' class='f-s-32 c-C63639'/>
          </span>
        </div>
        <div v-else class='w-560 h-335 p-r d-f m-t-50 b-f6f6f6 b-w-1  f-c'>
          <x-upload @cb='uploadAptitude' />
        </div>
      </section>
    </article>
    <div @click='handleAptitude' slot='footer' class="p-r f-c f-1 h-90 bg-linear-header b-r-45" >
      <span class="c-fff">Save</span>
    </div>
  </x-article>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import xArticle from '@/layout/article'
import xUpload from '@/upload/index'
import { requestAddQaInfo,requestEditQaInfo,requestAddPhoto } from '*/request/axios.enterprise'

export default {
  components:{xArticle,xUpload},
  computed:{
    ...mapState('enterDetail',['editDetailInfo','addDetailInfo'])
  },
  created(){
    if(this.$route.params.index=='add'){
      // this.changeKeyVisionAdd({
      //   t_qa_info:Object.assign({},)
      // })
    }else{
      this.changeKeyVisionAdd({
        t_qa_info:Object.assign({},this.editDetailInfo.t_qa_info[this.$route.params.index],{
          id:this.editDetailInfo.t_qa_info[this.$route.params.index].id,
          companyId:this.$route.params.id,
        },this.addDetailInfo.t_qa_info)
      })
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      if(location.href.includes('/add')&&from.path.includes('/list')){
        vm.changeKeyVisionAdd({
          t_qa_info:{}
        })
      }
    })
  },
  methods:{
    ...mapMutations('enterDetail',['changeKeyVisionAdd']),
    ...mapActions('enterDetail',['requestVision']),
    
    uploadAptitude(file){
      this.changeKeyVisionAdd({
        t_qa_info:Object.assign({},this.addDetailInfo.t_qa_info,{
          picUrl:file.url
        })
      })
    },
    clearPicUrl(){
      this.changeKeyVisionAdd({
        t_qa_info:Object.assign({},this.addDetailInfo.t_qa_info,{
          picUrl:''
        })
      })
    },
    handleAptitude(){
      if(!!!this.addDetailInfo.t_qa_info.picTitle ){
        this._toast('Title cannot be empty when adding or updating photo wall');
        return ;
      }
      if(!!!this.addDetailInfo.t_qa_info.picUrl ){
        this._toast('Please upload picture');
        return ;
      }
      this.$route.params.index == 'add' ?
      this.addAptitude() :
      this.editAptitude() ;
    },
    addAptitude(){
      requestAddQaInfo(Object.assign({},this.addDetailInfo.t_qa_info,{
        companyId:this.$route.params.id
      }))
      .then(()=>{
        
        this.requestVision({tableName:'t_qa_info',companyId:this.$route.params.id})
          .then(()=>{
            this._success()
            this.$router.back()

          })

      })
    },
    editAptitude(){
      requestEditQaInfo(Object.assign({},this.addDetailInfo.t_qa_info,{
        createTime:'',
        updateTime:'',
      })) 
        .then(()=>{

          this.requestVision({tableName:'t_qa_info',companyId:this.$route.params.id})
            .then(()=>{
              this._success()
              this.$router.back()

            })

        })
    }
  }  
}
</script>
