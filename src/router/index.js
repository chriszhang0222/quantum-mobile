import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/View/Login";
import Home from "@/View/Home";
import Dashboard from "@/View/Dashboard";
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
            },
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router;
