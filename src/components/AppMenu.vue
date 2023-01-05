<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/" class="ml-2"
        ><img src="../assets/images/logo.png" class="img-width" alt="logo"
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="ml-3" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item href="#">About</b-nav-item>
          <b-nav-item v-if="!isAuthenticated" href="/registration"
            >Registration</b-nav-item
          >
          <b-nav-item href="/faq">FAQ</b-nav-item>
          <b-nav-item v-if="isAuthenticated" href="/client/newticket"
            >Raise Ticket</b-nav-item
          >
          <b-nav-item v-if="isAuthenticated" href="/client/tickets"
            >All Tickets</b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-3">
          <b-nav-item
            v-if="this.$store.state.auth.token"
            @click.prevent="logOut"
            >Signout</b-nav-item
          >
          <b-nav-item-dropdown v-if="!this.$store.state.auth.token" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Login</em>
            </template>
            <b-dropdown-item href="/clientlogin">Client Login</b-dropdown-item>
            <b-dropdown-item href="/employeelogin"
              >Employee Login</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "AppMenu",
  computed: {
    isAuthenticated() {
      // no module name in case of using getters!
      // return this.$store.getters.auth.isAuthenticated;
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("clientLogout");
      this.$router.push("/");
      Vue.$toast.open({
        message: `Successfully LoggedOut !!`,
        type: "success",
        position: "bottom",
      });
    },
  },
};
</script>

<style scoped>
.img-width {
  width: 50px;
}
.bg-info {
  background-color: #453164 !important;
}
.navbar {
  padding: 0;
}
</style>
