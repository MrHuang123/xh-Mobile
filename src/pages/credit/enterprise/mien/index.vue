<template>
  
  <div class='m-t-15 p-lr-30'>
    <ul>
      <li v-for='(item,index) in list' :key='index' tag='li' @click="routerChange(item.path)"  :to='item.path' class='h-90 f-s-c'>
        <Icon :type='item.icon' class="f-s-32 c-blue m-r-30"/>
        <p class='f-1 f-b-c h-per-100  b-app b-w-1 b-no-lrt '>
          <span class='c-333 f-s-28 white-1'>
          {{item.title}}
          </span>
          <span class='f-c'>
            <!-- <span class='f-s-28 c-666 m-r-15'>{{item.num}}</span> -->
            <Icon type='icon-right' class='f-s-30 c-999 m-t-2'/>
          </span>
        </p>
      </li>
    </ul>
  </div>

</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex';
import { checkAuthority} from "*/request/axios.checkAuthority";
export default {
  data(){
    return {
      list:[
        {icon:'icon-base-info',path:'base',title:'Essential Information',num:245},
        // {icon:'icon-trend',path:'development',title:'Development history',num:8},
        // {icon:'icon-product',path:'product',title:'Product service',num:9},
        {icon:'icon-gallery',path:'gallery',title:'Photo Wall',num:''},
        {icon:'icon-dentifyingcode',path:'aptitude',title:'Certificate Information',num:''},
        // {icon:'icon-enterprise',path:'vision',title:'Enterprise vision',num:''},
      ]
    }
  },
  computed:{
    ...mapState("userCenter", ["ucenterUserInfo"]),
  },
  created(){

  },
  methods:{
    ...mapActions("userCenter", ["getUserCenterUserInfo"]),
    //判断是否有权限访问
    checkAuthority(moduleName){
       return new Promise((resolve, reject)=>{
          checkAuthority({
            moduleName:moduleName,
            number:0,
            userName:this.ucenterUserInfo.username?this.ucenterUserInfo.username:'',
            // token:token
          }).then(res=>{
              if(res.code == 200){
                 resolve()
              }
          }).catch(err=>{
              if(!!err&&!!err.code&&err.code == 81000199){
               this.$dialog.alert({
                  message:`<p class="c-666 t-c">Content access is limited. Please contact us for more privilege.</p><p class="c-333 t-c">Hotline：（86）010-88052705</p>`,
                  confirmButtonText:'OK'
                }).then(() => {
                
                });
              }
              return
          })
       })
    },
    async routerChange(path){
      var moduleName = ''
      if(path == 'base'){
        //essentialInformation
        moduleName = 'essentialInformation'
      }else if(path == 'gallery'){
        //photoWall
        moduleName = 'photoWall'
      }else if(path == 'aptitude'){
        //qualificationInformation
        moduleName = 'qualificationInformation'
      }
      await this.checkAuthority(moduleName)
      this.$router.push(path)
    }
  }
}
</script>
