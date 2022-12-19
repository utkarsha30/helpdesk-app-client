import Router from 'vue-router';
import ClientLogin from '@/components/pages/logins/ClientLogin.vue';
import PageNotFound from '@/components/pages/logins/PageNotFound.vue';
const router = new Router({
    mode:'history',
    routes: [
        {
            name:'client-login',
            path:'/login',
            component: ClientLogin
        },
        {
            name:'page-not-found',
            path:'/*',
            component: PageNotFound
        }
    ]
});
export default router;