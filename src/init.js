import Vue from 'vue'
import Router from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
Vue.use(Router)
Vue.component('font-awesome-icon', FontAwesomeIcon)
