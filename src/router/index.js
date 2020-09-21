import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/View/Home";
import Dashboard from "@/View/Dashboard";
import Chat from "@/View/Chat";
import Report from "@/View/Report";
import {SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
import ChatRoom from "@/View/ChatRoom";
import Search from "@/View/Search";
import Supplier from "@/View/Supplier";
import {SessionStorage} from "@/utils/SessionStorage";
Vue.use(VueRouter);

const routes = [
    {path:'*',redirect:"/login"},
    {path: '', redirect: "/login"},
    {path:'/login', component:() => import('@/View/Login')},
    {path: '/add_supplier',
        component: () => import('@/View/AddSupplier'),
        meta: {
        requiredAuth: true,
            supplier: true
        }
    },
    {path: '/select',
        component: () => import('@/View/SelectCompany'),
        meta: {requiredAuth: true}
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/View/Home'),
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/View/Dashboard'),
                meta: {requiredAuth: true, company: true}
            },
            {
                path: '/chat',
                name: 'Chat',
                component: () => import('@/View/Chat'),
                meta: {requiredAuth: true}
            },
            {
                path: '/chatroom',
                name: 'ChatRoom',
                component: () => import('@/View/ChatRoom'),
                meta: {requiredAuth: true}
            },
            {
                path: '/report',
                name: 'Report',
                component: () => import('@/View/Report'),
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/search',
                name: 'Search',
                component: () => import('@/View/Search'),
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/supplier',
                name: 'Supplier',
                component: () => import('@/View/Supplier'),
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/profile/:id',
                name: 'Profile',
                component: () => import('@/View/SupplierProfile'),
                meta: {requiredAuth: true, supplier:true}
            },
            {
                path: '/report_detail',
                name: 'ReportDetail',
                component: () => import('@/View/report/ReportDetail'),
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/notification',
                name: 'Notification',
                component: () => import('@/View/Notification'),
                meta: {requiredAuth: true}
            }
        ]
    }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiredAuth){
        if(sessionStorage.getItem(SESSION_KEY_LOGIN_USER)){
            let user = SessionStorage.getJson(SESSION_KEY_LOGIN_USER);
            if(to.meta.company){
                if(user.group === 'company user' || user.group === 'company admin'){
                    next();
                }else if(user.group === 'supplier'){
                    next({path: '/select'})
                }
            }else if(to.meta.supplier){
                if(user.group === 'supplier'){
                    next();
                }else{
                    next({path: '/'});
                }
            }else{
                next();
            }
        }else{
            next({path: '/'});
        }
    }else{
        next();
    }
})
export default router;
