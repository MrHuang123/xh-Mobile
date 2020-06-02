const NotificationCenter = res=> require.ensure([], ()=>res(require('./index.vue')),'NotificationCenter');
const Detail = res=> require.ensure([], ()=>res(require('./detail.vue')),'Detail');

export default [
    {
        path : '/notificationCenter',
        component:{
        render(){
            return (
            <div>
                <router-view></router-view>
            </div>
            )
        }
        },
        redirect:'/notificationCenter/index',
        children:[
            //消息中心
            {
                path:'index',
                component:NotificationCenter,
                name:'notificationCenter'
            },
            //详情
            {
                path:'detail/:id/:type',
                component:Detail,
                name:'detail'
            },
        ]
    }
]