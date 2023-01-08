import Router from "vue-router";
import ClientLogin from "@/components/pages/logins/ClientLogin.vue";
import PageNotFound from "@/components/pages/logins/PageNotFound.vue";
import HomePage from "@/components/pages/home/HomePage.vue";
import FaqPage from "@/components/pages/home/FaqPage.vue";
import RegistrationPage from "@/components/pages/home/RegistrationPage.vue";
import EmployeeLogin from "@/components/pages/logins/EmployeeLogin.vue";
import ClientDashboard from "@/components/pages/client/ClientDashboard.vue";
import ClientTickets from "@/components/pages/client/ClientTickets.vue";
import ClientAddnew from "@/components/pages/client/ClientAddnew.vue";
import ClientTicketUpdate from "@/components/pages/client/ClientTicketUpdate.vue";
import AboutPage from "@/components/pages/home/AboutPage.vue";
import AgentDashboard from "@/components/pages/agent/AgentDashboard.vue";
import AdminDashboard from "@/components/pages/admin/AdminDashboard.vue";
import ClientAddcomment from "@/components/pages/client/ClientAddcomment.vue";
const router = new Router({
  mode: "history",
  routes: [
    {
      name: "home-page",
      path: "/",
      component: HomePage,
    },
    {
      name: "registration-page",
      path: "/registration",
      component: RegistrationPage,
    },
    {
      name: "faq-page",
      path: "/faq",
      component: FaqPage,
    },
    {
      name: "about-page",
      path: "/about",
      component: AboutPage,
    },
    {
      name: "client-login",
      path: "/clientlogin",
      component: ClientLogin,
    },
    {
      name: "client-dashboard",
      path: "/client",
      component: ClientDashboard,
    },
    {
      name: "client-addnew-ticket",
      path: "/client/newticket",
      component: ClientAddnew,
    },
    {
      name: "client-all-tickets",
      path: "/client/tickets",
      component: ClientTickets,
    },
    {
      name: "client-ticket-update",
      path: "/client/ticket/:id",
      component: ClientTicketUpdate,
      props: true,
      query: true,
    },
    {
      name: "client-add-comment",
      path: "/client/ticket/comment/:id",
      component: ClientAddcomment,
      props: true,
    },
    {
      name: "employee-login",
      path: "/employeelogin",
      component: EmployeeLogin,
    },
    {
      name: "admin-dashboard",
      path: "/admin",
      component: AdminDashboard,
    },
    {
      name: "agent-dashboard",
      path: "/agent",
      component: AgentDashboard,
    },

    {
      name: "page-not-found",
      path: "/*",
      component: PageNotFound,
    },
  ],
});
export default router;
