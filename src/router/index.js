import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/View/Login";
import Home from "@/View/Home";
import Dashboard from "@/View/Dashboard";
import Chat from "@/View/Chat";
import {SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
Vue.use(VueRouter);

const routes = [
    {path:'*',redirect:"/login"},
    {path: '', redirect: "/login"},
    {path:'/login', component:Login},
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {requiredAuth: true}
            },
            {
                path: '/chat',
                name: 'Chat',
                component: Chat,
                meta: {requiredAuth: true}
            }
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiredAuth){
        if(sessionStorage.getItem(SESSION_KEY_LOGIN_USER)){
            next();
        }else{
            next({path: '/'});
        }
    }else{
        next();
    }
})
export default router;
