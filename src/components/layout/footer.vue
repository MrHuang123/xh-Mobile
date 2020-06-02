<template>
  <!-- <footer v-if='activeRoutes.includes($route.path)||$route.path.includes("credit/infor/list")'  class='w-per-100 h-120 p-b-10 p-f-xr-yb d-f bg-fff z-100 b-app b-no-lr b-no-b'> -->
   <footer class='w-per-100 h-120 p-b-10 p-f-xr-yb d-f bg-fff z-100 b-app b-no-lr b-no-b'>
    <router-link  tag='dl' v-for='(item,index) in tabs' :to='item.path' :key='item.path' class='f-1 f-c f-column '>
      <dt  class=''>
        <Icon v-if='$route.path.includes(item.path2) && tabsState' :type='item.icon_act' class=' f-s-48 c-blue'/>
        <Icon v-else-if='$route.path.includes(item.path) && !tabsState' :type='item.icon_act' class=' f-s-48 c-blue'/>
        <Icon v-else :type='item.icon_dis' class='f-s-48 c-999 '/>
      </dt>
      <dd class='f-s-18 ease-400 c-333 f-w-600' v-if='$route.path.includes(item.path2) && tabsState' style='margin:0 -20px;'>{{item.label}}</dd>
      <dd class='f-s-18 ease-400 c-333 f-w-600' v-else-if='$route.path.includes(item.path) && !tabsState' style='margin:0 -20px;'>{{item.label}}</dd>
      <dd class='f-s-18 ease-400 c-999' v-else style='margin:0 -20px;'>{{item.label}}</dd>
    </router-link>
  </footer>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
  data(){
    return {
      activeRoutes:['/home','/notificationCenter/index','/userCenter/mine','/login','/regist','/forgotPwd','/credit/infor/list','/enterprise/home','/credit/infor/index','/international/home'],
      tabs:[
        {
          icon_dis:'icon-home',
          icon_act:'icon-home1',
          label:'Home',
          path:'/home'
        },
        {
          icon_dis:'icon-news',
          icon_act:'icon-news1',
          label:'Credit Info',
          path:'/credit/infor'
        },
        {
          icon_dis:'icon-message1',
          icon_act:'icon-message',
          label:'Interact',
          path:'/notificationCenter/index'
        },
        {
          icon_dis:'icon-user2',
          icon_act:'icon-user1',
          label:'Me',
          path:'/userCenter/mine',
          path2:'/enterprise/home'
        },
        
      ],
      tabsState:false,
    }
  },
  mounted(){
  },
  methods:{
    ...mapMutations(['setIsInter']),
  },
  watch:{
    $route(to,from){
      if(to.path == '/home'){
        this.setIsInter(false);
      }
      if(to.path == '/enterprise/home' || 
         to.path == '/international/home'
        ){
        this.tabsState = true;
      }else{
        this.tabsState = false;
      }
    }
  },
}
</script>
