import Router from "vue-router";
import ClientLogin from "@/components/pages/logins/ClientLogin.vue";
import PageNotFound from "@/components/pages/logins/PageNotFound.vue";
import HomePage from "@/components/pages/home/HomePage.vue";
import FaqPage from "@/components/pages/home/FaqPage.vue";
import RegistrationPage from "@/components/pages/home/RegistrationPage.vue";
import EmployeeLogin from "@/components/pages/logins/EmployeeLogin.vue";
import ClientTickets from "@/components/pages/client/ClientTickets.vue";
import ClientAddnew from "@/components/pages/client/ClientAddnew.vue";
import ClientTicketUpdate from "@/components/pages/client/ClientTicketUpdate.vue";
import AboutPage from "@/components/pages/home/AboutPage.vue";
import ClientAddcomment from "@/components/pages/client/ClientAddcomment.vue";
import AdminAllTickets from "@/components/pages/admin/AdminAllTickets.vue";
import AgentAllTickets from "@/components/pages/agent/AgentAllTickets.vue";
import AgentAddcomment from "@/components/pages/agent/AgentAddcomment.vue";
import AdminAddcomment from "@/components/pages/admin/AdminAddcomment.vue";
import AdminTicketUpdate from "@/components/pages/admin/AdminTicketUpdate.vue";
import AgentTicketUpdate from "@/components/pages/agent/AgentTicketUpdate.vue";
import AdminAddNewCategory from "@/components/pages/admin/category/AdminAddNewCategory.vue";
import AdminCreateFaq from "@/components/pages/admin/faq/AdminCreateFaq.vue";
import AdminCategoryList from "@/components/pages/admin/category/AdminCategoryList.vue";
import AdminUpdateCategory from "@/components/pages/admin/category/AdminUpdateCategory.vue";
import AdminFaqList from "@/components/pages/admin/faq/AdminFaqList.vue";
import AdminUpdateFaq from "@/components/pages/admin/faq/AdminUpdateFaq.vue";
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
      name: "client-addnew-ticket",
      path: "/client/newticket",
      component: ClientAddnew,
    },
    {
      name: "client-all-tickets",
      path: "/client",
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
      name: "admin-all-tickets-view",
      path: "/admin",
      component: AdminAllTickets,
    },
    {
      name: "admin-add-comment",
      path: "/admin/ticket/comment/:id",
      component: AdminAddcomment,
      props: true,
    },
    {
      name: "admin-addnew-category",
      path: "/admin/newcategory",
      component: AdminAddNewCategory,
    },
    {
      name: "admin-category-list",
      path: "/admin/categories",
      component: AdminCategoryList,
    },
    {
      name: "admin-category-update",
      path: "/admin/category/:id",
      component: AdminUpdateCategory,
      props: true,
      query: true,
    },
    {
      name: "admin-create-faq",
      path: "/admin/newfaq",
      component: AdminCreateFaq,
    },
    {
      name: "admin-faq-list",
      path: "/admin/faqs",
      component: AdminFaqList,
    },
    {
      name: "admin-faq-update",
      path: "/admin/faq/:id",
      component: AdminUpdateFaq,
      props: true,
      query: true,
    },
    {
      name: "admin-ticket-update",
      path: "/admin/ticket/:id",
      component: AdminTicketUpdate,
      props: true,
      query: true,
    },
    {
      name: "agent-all-tickets-view",
      path: "/agent",
      component: AgentAllTickets,
    },
    {
      name: "agent-add-comment",
      path: "/agent/ticket/comment/:id",
      component: AgentAddcomment,
      props: true,
    },
    {
      name: "agent-ticket-update",
      path: "/agent/ticket/:id",
      component: AgentTicketUpdate,
      props: true,
      query: true,
    },
    {
      name: "page-not-found",
      path: "/*",
      component: PageNotFound,
    },
  ],
});
export default router;
