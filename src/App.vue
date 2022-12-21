<template>
  
  <div >
    <app-menu></app-menu>
    <!-- <loading-icon></loading-icon>  -->
  
    <router-view></router-view>
  </div>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue'
// import LoadingIcon from '@/components/pages/LoadingIcon.vue'
export default {
  name: 'App',
  components: {
    AppMenu,
    // LoadingIcon
    // PageNotFound 
  }
}
</script>

<style>

</style>
