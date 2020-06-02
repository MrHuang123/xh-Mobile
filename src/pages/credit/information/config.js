const CreditInforList = res=> require.ensure([], ()=>res(require('./list.vue')),'CreditInforList');
const CreditInforDetail = res=> require.ensure([], ()=>res(require('./detail.vue')),'CreditInforDetail');
const CreditInforIndex = res=> require.ensure([], ()=>res(require('./index.vue')),'CreditInforIndex');

import xHeader from '@/layout/header.vue'
import {mapMutations,mapState,mapActions} from 'vuex'

export default [
  {
    path:'infor',
    component:{
      components:{xHeader},
      render(){
        return (
          <div class={this.isToggle ? 'p-r z-1000 ' : ""} >
            <xHeader title = {this.title} />
            <main class={this.isToggle ? 'p-r z-100 p-t-100 ' : "p-t-100 "} >
                <transition name='route'>
                  <keep-alive include='creditIndex'>
                      <router-view></router-view>
                  </keep-alive>
                  {/* <router-view></router-view> */}
                </transition>
            </main>
          </div>
        )
      },
      data(){
        return {
          title:''
        }
      },
      mounted(){
        // this.setWxShare('测试title---information','测试desc---information')
        const to = this.$route;
        this.title = to.path == '/credit/infor/index' ? 'Credit  Information' : to.path.includes('infor/detail')||to.path.includes('/infor/enterpriseCreditDetail') ? 'Details' : 'Credit Information'
      },
      watch:{
        $route(to){
          this.title = to.path == '/credit/infor/index' ? 'Credit Information' : to.path.includes('infor/detail')||to.path.includes('/infor/enterpriseCreditDetail') ? 'Details' : 'Credit Information'
        }
      },
      computed:{
        ...mapState('creditInfo',[
          'isToggle'
        ])
      },
      methods:{
        ...mapActions(['setWxShare']),
        ...mapMutations('creditInfo',['changeKey'])
      }, 
    },
    redirect:'infor/index',
    children:[
      {
        path:'index',
        component:CreditInforIndex
      },
      {
        path:'list/:type',
        component:CreditInforList,
        meta:{
          keepAlive: true
        }
      },
      {
        path:'detail/:url',
        component:CreditInforDetail
      },
      {
        path:'enterpriseCreditDetail/:id',
        component:()=>import('./enterpriseCreditDetail.vue')
      },
      {
        path:'*',
        redirect:'index'
      }
    ]
  }
]