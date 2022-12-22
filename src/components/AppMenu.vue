<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/" class="ml-2"><img src="../assets/images/logo.png" class="img-width" alt="logo"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" class="ml-3" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item href="#" >About</b-nav-item>
        <b-nav-item href="/registration" >Registration</b-nav-item>
        <b-nav-item href="/faq" >FAQ</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto mr-3">
 
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Login</em>
          </template>
          <b-dropdown-item href="/clientlogin">Client Login</b-dropdown-item>
          <b-dropdown-item href="/employeelogin">Employee Login</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    
</template>

<script>
export default {
    name: 'AppMenu'
}
</script>

<style scoped>

.img-width{
    width:50px;
}
.bg-info {
    background-color:#453164 !important;
}
.navbar {
    padding: 0;
}
</style>