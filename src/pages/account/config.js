/**
 * 注册登录找回密码模块，
 */
import ForgotPwd from './forgotPwd.vue';
import Login from './login.vue';
import Regist from './regist.vue';
import ChangePwd from './changePwd.vue';

export default [
    {
        path:'/login',
        component:Login,
        name : 'login',
    },
    {
        path:'/forgotPwd',
        component:ForgotPwd,
        name : 'forgotPwd',
    },
    {
        path:'/regist',
        component:Regist,
        name : 'regist',
    },
    {
        path:'/changePwd',
        component:ChangePwd,
        name : 'changePwd',
    }
]