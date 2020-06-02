import DetailConfig from './detail/config'
import IdentifyConfig from './identify/config'
import xHeader from '@/layout/header'
import { mapState } from 'vuex'

const EnterHome = res=> require.ensure([], ()=>res(require('./home.vue')),'EnterHome');


export default [
  {
    path:'/enterprise',
    component:{
      components:{xHeader},
      render(){
        return (
          <div>
            <xHeader title={this.title}
              //  back={()=>{
              
              // this.$route.path==='/enterprise/home' ? this.$router.push('/userCenter/mine') : this.$router.back()
              // }
            // }
            >
            </xHeader>
            <transition name='down'>
              <router-view></router-view>
            </transition>
          </div>
        )
      },
      computed:{
        ...mapState('enterDetail',['title'])
      }
    },
    redirect:'/enterprise/home',
    children:[
      {
        path:'home',
        component:EnterHome
      },
      {
        path:'enterpriseStatus/:companyId',
        component:()=>import('./enterpriseStatus.vue')
      }
    ]
    .concat(DetailConfig)
    .concat(IdentifyConfig)
  }
]
