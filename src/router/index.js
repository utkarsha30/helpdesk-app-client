import Router from 'vue-router';
import ClientLogin from '@/components/pages/logins/ClientLogin.vue';
import PageNotFound from '@/components/pages/logins/PageNotFound.vue';
import HomePage from '@/components/pages/home/HomePage.vue';
import FaqPage from '@/components/pages/home/FaqPage.vue';
import RegistrationPage from '@/components/pages/home/RegistrationPage.vue';
import EmployeeLogin from '@/components/pages/logins/EmployeeLogin.vue';
const router = new Router({
    mode:'history',
    routes: [

        {
            name:'home-page',
            path:'/',
            component: HomePage
        },
        {
            name: 'registration-page',
            path:'/registration',
            component: RegistrationPage
        },
        {
            name: 'faq-page',
            path:'/faq',
            component: FaqPage
        },
        {
            name:'client-login',
            path:'/clientlogin',
            component: ClientLogin
        },
        {
            name:'employee-login',
            path:'/employeelogin',
            component: EmployeeLogin
        },
        {
            name:'page-not-found',
            path:'/*',
            component: PageNotFound
        }
    ]
});
export default router;