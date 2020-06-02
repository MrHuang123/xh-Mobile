const CreditEnterApp = res=> require.ensure([], ()=>res(require('./app.vue')),'CreditEnterApp');
const CreditEnterHome = res=> require.ensure([], ()=>res(require('./home.vue')),'CreditEnterHome');
const CreditEnterDetail = res=> require.ensure([], ()=>res(require('./detail.vue')),'CreditEnterDetail');
const CreditEnterGrades = res=> require.ensure([], ()=>res(require('./grades.vue')),'CreditEnterGrades');

const CreditEnterBaseIndex = res=> require.ensure([], ()=>res(require('./base/index.vue')),'CreditEnterBaseIndex');
const CreditEnterBaseBasic = res=> require.ensure([], ()=>res(require('./base/basic.vue')),'CreditEnterBaseBasic');

// 经营风险
const CreditEnterHazard = res=> require.ensure([], ()=>res(require('./hazard.vue')),'CreditEnterHazard');

// 只是产权
const CreditEnterIntellectual = res=> require.ensure([], ()=>res(require('./intellectual.vue')),'CreditEnterIntellectual');

// 经营状况
const CreditEnterOperate = res=> require.ensure([], ()=>res(require('./operate.vue')),'CreditEnterOperate');

// 司法信息
const CreditEnterJudicial = res=> require.ensure([], ()=>res(require('./judicial.vue')),'CreditEnterJudicial');

// 企業互動
const CreditEnterAction = res=> require.ensure([], ()=>res(require('./action.vue')),'CreditEnterAction');

// 风采展示
const CreditEnterMienApp = res=> require.ensure([], ()=>res(require('./mien/app.vue')),'CreditEnterMienApp');
const CreditEnterMienIndex = res=> require.ensure([], ()=>res(require('./mien/index.vue')),'CreditEnterMienIndex');
const CreditEnterMienBase = res=> require.ensure([], ()=>res(require('./mien/base.vue')),'CreditEnterMienBase');
const CreditEnterMienDevelopment = res=> require.ensure([], ()=>res(require('./mien/development.vue')),'CreditEnterMienDevelopment');
const CreditEnterMienProduct = res=> require.ensure([], ()=>res(require('./mien/product.vue')),'CreditEnterMienProduct');
const CreditEnterMienGallery = res=> require.ensure([], ()=>res(require('./mien/gallery.vue')),'CreditEnterMienGallery');
const CreditEnterMienAptitude = res=> require.ensure([], ()=>res(require('./mien/aptitude.vue')),'CreditEnterMienAptitude');
const CreditEnterMienVision = res=> require.ensure([], ()=>res(require('./mien/vision.vue')),'CreditEnterMienVision');

// 信用评价
const CreditEnterCommentIndex = res=> require.ensure([], ()=>res(require('./comment/index.vue')),'CreditEnterCommentIndex');
const CreditEnterCommentGrade = res=> require.ensure([], ()=>res(require('./comment/grade.vue')),'CreditEnterCommentGrade');
const CreditEnterCommentNoFinancial = res=> require.ensure([], ()=>res(require('./comment/noFinancial.vue')),'CreditEnterCommentNoFinancial');
const CreditEnterCommentDynanmicModel = res=> require.ensure([], ()=>res(require('./comment/dynamicModel.vue')),'CreditEnterCommentDynanmicModel');
const CreditEnterCommentCompetitve = res=> require.ensure([], ()=>res(require('./comment/competitive.vue')),'CreditEnterCommentCompetitve');

// 递送名片
// const CreditEnterConcat = res=> require.ensure([], ()=>res(require('./concat.vue')),'CreditEnterConcat');


export default [
  {
    path:':id/enter',
    component:CreditEnterApp,
    // redirect:'enter/home',
    children:[
      {
        path:'home',
        component:CreditEnterHome
      },
      {
        path:'grades',
        component:CreditEnterGrades
      },
      {
        path:'detail/:type',
        component:CreditEnterDetail
      },
      {
        path:'intellectual',
        component:CreditEnterIntellectual
      },
      {
        path:'judicial',
        component:CreditEnterJudicial
      },
      {
        path:'operate',
        component:CreditEnterOperate
      },
      {
        path:'hazard',
        component:CreditEnterHazard
      },
      {
        path:'action',
        component:CreditEnterAction
      },
      // {
      //   path:'concat',
      //   component:CreditEnterConcat,
      // },
      // 评价信息
      {
        path:'comment',
        component:{
          render(){
            return <router-view></router-view>
          }
        },
        redirect:'comment/index',
        children:[
          {
            path:'index',
            component:CreditEnterCommentIndex
          },
          {
            path:'grade',
            component:CreditEnterCommentGrade
          },
          {
            path:'noFinancial',
            component:CreditEnterCommentNoFinancial
          },
          {
            path:'dynamicModel',
            component:CreditEnterCommentDynanmicModel
          },
          {
            path:'competitive',
            component:CreditEnterCommentCompetitve
          },
        ]
      },
      // 基本信息
      {
        path:'base',
        component:{
          render(){
            return(
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            ) 
          }
        },
        redirect:'base/index',
        children:[
          {
            path:'index',
            component:CreditEnterBaseIndex
          },
          {
            path:'basic',
            component:CreditEnterBaseBasic
          },
        ]
      },
      {
        path:'mien',
        component:CreditEnterMienApp,
        redirect:'mien/index',
        children:[
          {
            path:'index',
            component:CreditEnterMienIndex
          },
          {
            path:'base',
            component:CreditEnterMienBase
          },
          {
            path:'aptitude',
            component:CreditEnterMienAptitude
          },
          {
            path:'development',
            component:CreditEnterMienDevelopment
          },
          {
            path:'product',
            component:CreditEnterMienProduct
          },
          {
            path:'gallery',
            component:CreditEnterMienGallery
          },
          {
            path:'vision',
            component:CreditEnterMienVision
          }
        ]
      }
      // {
      //   path:'grade',
      //   component:CreditGrade,
      // }
    ]
  }
]
