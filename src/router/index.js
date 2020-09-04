import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/View/Login";
import Home from "@/View/Home";
import Dashboard from "@/View/Dashboard";
import Chat from "@/View/Chat";
import Report from "@/View/Report";
import {SESSION_KEY_LOGIN_USER} from "@/utils/Constants";
import ChatRoom from "@/View/ChatRoom";
import Search from "@/View/Search";
import Supplier from "@/View/Supplier";
import SupplierProfile from "@/View/SupplierProfile";
import SelectCompany from "@/View/SelectCompany";
import AddSupplier from "@/View/AddSupplier";
import {SessionStorage} from "@/utils/SessionStorage";
Vue.use(VueRouter);

const routes = [
    {path:'*',redirect:"/login"},
    {path: '', redirect: "/login"},
    {path:'/login', component:Login},
    {path: '/add', component: AddSupplier},
    {path: '/select', component: SelectCompany},
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {requiredAuth: true, company: true}
            },
            {
                path: '/chat',
                name: 'Chat',
                component: Chat,
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/chatroom',
                name: 'ChatRoom',
                component: ChatRoom,
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/report',
                name: 'Report',
                component: Report,
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/search',
                name: 'Search',
                component: Search,
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/supplier',
                name: 'Supplier',
                component: Supplier,
                meta: {requiredAuth: true, company:true}
            },
            {
                path: '/profile',
                name: '/profile',
                component: SupplierProfile,
                meta: {requiredAuth: true, supplier:true}
            }
        ]
    }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
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
            }
        }else{
            next({path: '/'});
        }
    }else{
        next();
    }
})
export default router;
