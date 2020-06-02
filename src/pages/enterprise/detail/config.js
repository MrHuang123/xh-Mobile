import {mapActions,mapMutations} from 'vuex'


const EnterDetailIndex = res=> require.ensure([], ()=>res(require('./index.vue')),'EnterDetailIndex');
const EnterDetailApp = res=> require.ensure([], ()=>res(require('./app.vue')),'EnterDetailApp');
const internationalDetailIndex = res=> require.ensure([], ()=>res(require('./internationalIndex.vue')),'internationalDetailIndex');

const EnterDetailBaseIndex = res=> require.ensure([], ()=>res(require('./base/index.vue')),'EnterDetailBaseIndex');
const EnterDetailBaseName = res=> require.ensure([], ()=>res(require('./base/enterpriseName.vue')),'EnterDetailBaseName');
const EnterDetailBaseTelephone = res=> require.ensure([], ()=>res(require('./base/telephoneNumberEdit.vue')),'EnterDetailBaseTelephone');
const EnterDetailBaseFax = res=> require.ensure([], ()=>res(require('./base/faxNumberEdit.vue')),'EnterDetailBaseFax');
const EnterDetailBaseWebsite = res=> require.ensure([], ()=>res(require('./base/websiteEdit.vue')),'EnterDetailBaseWebsite');
const EnterDetailBaseAddress = res=> require.ensure([], ()=>res(require('./base/enterpriseAddress.vue')),'EnterDetailBaseAddress');
const EnterDetailBaseIntroduce = res=> require.ensure([], ()=>res(require('./base/enterpriseIntroduceEdit.vue')),'EnterDetailBaseIntroduce');

const EnterDetailDevelopmentList = res=> require.ensure([], ()=>res(require('./development/list.vue')),'EnterDetailDevelopmentList');
const EnterDetailDevelopmentEdit = res=> require.ensure([], ()=>res(require('./development/edit.vue')),'EnterDetailDevelopmentEdit');

const EnterDetailProductList = res=> require.ensure([], ()=>res(require('./product/list.vue')),'EnterDetailProductList');
const EnterDetailProductEdit = res=> require.ensure([], ()=>res(require('./product/edit.vue')),'EnterDetailProductEdit');
const EnterDetailProductTitle = res=> require.ensure([], ()=>res(require('./product/title.vue')),'EnterDetailProductTitle');
const EnterDetailProductDescribe = res=> require.ensure([], ()=>res(require('./product/describe.vue')),'EnterDetailProductDescribe');

const EnterDetailGalleryList = res=> require.ensure([], ()=>res(require('./gallery/list.vue')),'EnterDetailGalleryList');
const EnterDetailGalleryEdit = res=> require.ensure([], ()=>res(require('./gallery/edit.vue')),'EnterDetailGalleryEdit');
const EnterDetailGalleryTitle = res=> require.ensure([], ()=>res(require('./gallery/title.vue')),'EnterDetailGalleryTitle');

const EnterDetailAptitudeList = res=> require.ensure([], ()=>res(require('./aptitude/list.vue')),'EnterDetailAptitudeList');
const EnterDetailAptitudeEdit = res=> require.ensure([], ()=>res(require('./aptitude/edit.vue')),'EnterDetailAptitudeEdit');
const EnterDetailAptitudeTitle = res=> require.ensure([], ()=>res(require('./aptitude/title.vue')),'EnterDetailAptitudeTitle');

const EnterDetailVisionIndex = res=> require.ensure([], ()=>res(require('./vision/index.vue')),'EnterDetailVisionIndex');
const EnterDetailVisionTitle = res=> require.ensure([], ()=>res(require('./vision/title.vue')),'EnterDetailVisionTitle');

export default [
  {
    path:'detail/:id',
    component:EnterDetailApp,
    // redirect:'detail/:id/index',
    children:[
      {
        // 企业详情首页
        path:'index',
        component:EnterDetailIndex
      },
      {
        // 国际企业详情首页
        path:'/enterprise/detail/internationalIndex',
        component:internationalDetailIndex
      },
      {
        // 基本信息
        path:'base',
        component:{
          render(){
            return (
              <transition name='fade'>
                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
              </transition>
            ) 
          },
          
        },
        redirect:'base/index',
        children:[
          {
            path:'index',
            component:EnterDetailBaseIndex
          },
          {
            path:'name',
            component:EnterDetailBaseName
          },
          {
            path:'telephone',
            component:EnterDetailBaseTelephone
          },
          {
            path:'fax',
            component:EnterDetailBaseFax
          },
          {
            path:'website',
            component:EnterDetailBaseWebsite
          },
          {
            path:'address',
            component:EnterDetailBaseAddress
          },
          {
            path:'introduce',
            component:EnterDetailBaseIntroduce
          },
        ]
      },
      {
        // 发展历程
        path:'development',
        component:{
          render(){
            return <router-view></router-view>
          }
        },
        redirect:'development/list',
        children:[
          {
            path:'list',
            component:EnterDetailDevelopmentList
          },
          {
            path:'edit/:id',
            component:EnterDetailDevelopmentEdit
          },
        ]
      },
      {
        // 产品列表
        path:'product',
        component:{
          render(){
            return <router-view></router-view>
          }
        },
        redirect:'product/list',
        children:[
          {
            path:'list',
            component:EnterDetailProductList
          },
          {
            path:'edit/:id',
            component:EnterDetailProductEdit
          },
          {
            path:'title',
            component:EnterDetailProductTitle
          },
          {
            path:'describe',
            component:EnterDetailProductDescribe
          },
        ]
      },
      {
        //照片墙
        path:'gallery',
        component:{
          render(){
            return(
              <transition name='fade'>
                <router-view></router-view>
              </transition>
            ) 
          }
        },
        redirect:'gallery/list',
        children:[
          {
            path:'list',
            component:EnterDetailGalleryList
          },
          {
            path:'title',
            component:EnterDetailGalleryTitle
          },
          {
            path:'edit/:index',
            component:EnterDetailGalleryEdit
          },
        ]
      },
      {
        //资质
        path:'aptitude',
        component:{
          render(){
            return <router-view></router-view>
          }
        },
        redirect:'aptitude/list',
        children:[
          {
            path:'list',
            component:EnterDetailAptitudeList
          },
          {
            path:'title',
            component:EnterDetailAptitudeTitle
          },
          {
            path:'edit/:index',
            component:EnterDetailAptitudeEdit
          },
        ]
      },
      
      {
        // 企业视界
        path:'vision',
        component:{
          render(){
            return <router-view></router-view>
          }
        },
        redirect:'vision/index',
        children:[
          {
            path:'index',
            component:EnterDetailVisionIndex
          },
          {
            path:'title',
            component:EnterDetailVisionTitle
          }
        ]
      }
    ]
  }
]