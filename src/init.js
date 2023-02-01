import Vue from "vue";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import Router from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(Vuex);
Vue.use(BootstrapVue);

Vue.use(IconsPlugin);
Vue.use(Router);
Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
