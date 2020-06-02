const IdenApp = res=> require.ensure([], ()=>res(require('./app.vue')),'IdenApp');
const IdenStep0 = res=> require.ensure([], ()=>res(require('./step0.vue')),'IdenStep0');
const IdenStep1 = res=> require.ensure([], ()=>res(require('./step1.vue')),'IdenStep1');
const IdenStep2 = res=> require.ensure([], ()=>res(require('./step2.vue')),'IdenStep2');
const IdenStep3 = res=> require.ensure([], ()=>res(require('./step3.vue')),'IdenStep3');

const IdenName = res=> require.ensure([], ()=>res(require('./enterPriseAccountName.vue')),'IdenName');
const IdenCode = res=> require.ensure([], ()=>res(require('./enterPriseAccountCode.vue')),'IdenCode');


export default [
  {
    path:'identify',
    component:IdenApp,
    redirect:'identify/step0',
    children:[
      {
        path:'step0',
        component:IdenStep0
      },
      {
        path:':id/step1',
        component:IdenStep1
      },
      {
        path:':id/step2',
        component:IdenStep2
      },
      {
        path:':id/step3',
        component:IdenStep3
      },
      {
        path:'name',
        component:IdenName
      },
      {
        path:'code',
        component:IdenCode
      },
    ]
  }
]
