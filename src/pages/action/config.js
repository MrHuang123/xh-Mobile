import vHeader from '@/layout/header.vue';
// import vFooter from '@/layout/footer.vue';

const ActionConcat = res=> require.ensure([], ()=>res(require('./concat.vue')),'ActionConcat');


export default [
  {
    path:'/action',
    component:{
      components:{
        vHeader,
        // vFooter
      },
      render(){

        return(
          <div class='p-t-100'>
            <vHeader title='Send Business Card' />
            <router-view></router-view>
            {/* <vFooter /> */}
          </div>

        ) 
      }
    },
    children:[
      {
        path:'concat/:id',
        component:ActionConcat
      }
    ]
  }
]