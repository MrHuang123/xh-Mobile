import Enter from './pages/enterprise/config'
import Credit from './pages/credit/config'
import UserCenter from './pages/userCenter/config.js'                       //我的
import Account from './pages/account/config.js'                              //帐号相关
import Notification from './pages/notificationCenter/config.js'                              //消息中心
import Action from './pages/action/config.js'

const Home = res=> require.ensure([], ()=>res(require('./pages/home/index.vue')),'Home');
const Vendorquery = res=> require.ensure([], ()=>res(require('./pages/index/vendorquery.vue')),'Vendorquery');//疫情
const Summit = res=> require.ensure([], ()=>res(require('./pages/index/summit.vue')),'Summit');
const SummitOverview = res=> require.ensure([], ()=>res(require('./pages/index/summitOverview.vue')),'SummitOverview');//峰会首页
const SummitList = res=> require.ensure([], ()=>res(require('./pages/index/summitList.vue')),'SummitList');//峰会列表页
const SummitDetail = res=> require.ensure([], ()=>res(require('./pages/index/summitDetail.vue')),'SummitDetail');//峰会详情页
const Brand = res=> require.ensure([], ()=>res(require('./pages/index/nationalBrand.vue')),'Brand');
const NationalBrandList = res=> require.ensure([], ()=>res(require('./pages/index/nationalBrandList.vue')),'NationalBrandList');
const Share = res=> require.ensure([], ()=>res(require('./pages/index/share.vue')),'Share');
const international = res=> require.ensure([], ()=>res(require('./pages/international/home/home.vue')),'international');
const internationalSearch = res=> require.ensure([], ()=>res(require('./pages/international/search/search.vue')),'internationalSearch');
const internationalDetails = res=> require.ensure([], ()=>res(require('./pages/international/search/details.vue')),'internationalDetails');
const internationalShare = res=> require.ensure([], ()=>res(require('./pages/international/search/share.vue')),'internationalShare');


Vue.use(VueRouter)

/* 
  根路由配置；

  拼接pages中一級子路由，並到處配置對象

*/

export default new VueRouter({
  mode:'history',
  routes: []
    .concat(Enter,Credit,Account,UserCenter,Notification,Action)
    .concat([
      {
        path: '*',
        redirect: '/home',
        name: 'NotFound'
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/home/vendorquery',//疫情
        component:Vendorquery
      },
      //峰会H5
      {
        path:'/home/international',
        component:Home
      },
      //峰会H5
      {
        path:'/summit',
        component:Summit
      },
      //峰会首页
      {
        path:'/summitOverview',
        component:SummitOverview
      },
      //峰会列表页
      {
        path:'/summitList',
        component:SummitList,
        /* children: [
          {
            path: '/summitDetail',
            component: SummitDetail
          }
        ] */
      },
      //峰会详情
      {
        path: '/summitDetail/:url',
        component: SummitDetail
      },
      //名族品牌列表
      {
        path:'/nationalBrandList',
        component:NationalBrandList,
      },
      {
        path:'/brand/:companyId/:id/:type',
        component:Brand
      },
      {
        path:'/share/:id',
        component:Share
      },
      //国际版-首页
      {
        path:'/international/home',
        component:international
      },
      //国际版-搜索
      {
        path:'/international/search',
        component:internationalSearch
      },
      //国际版-详情
      {
        path:'/international/details',
        component:internationalDetails
      }
      ,
      //国际版-分享
      {
        path:'/international/share',
        component:internationalShare
      }
    ]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
