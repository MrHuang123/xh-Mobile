import EnterConfig from './enterprise/config'
import InformationConfig from './information/config'

const CreditSearch = res=> require.ensure([], ()=>res(require('./search.vue')),'CreditSearch');


export default [
  {
    path:'/credit',
    component:{
      render(){
        return (
          <div>
            <transition name='route'>
              <keep-alive include='search'>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        )
      }
    },
    redirect:'/credit/enter/home',
    children:[
      {
        path:'search',
        component:CreditSearch
      }
    ]
    .concat(EnterConfig)
    .concat(InformationConfig)
  }
]
