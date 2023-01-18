import Vue from "vue";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import Router from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueToast from "vue-toast-notification";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toast-notification/dist/theme-default.css";

Vue.use(Vuex);
Vue.use(BootstrapVue);

Vue.use(IconsPlugin);
Vue.use(Router);
Vue.use(VueToast);
Vue.use(Vuelidate);
