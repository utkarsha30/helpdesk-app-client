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
          <b-nav-item href="/about">About</b-nav-item>
          <b-nav-item v-if="!isAuthenticated" href="/registration"
            >Registration</b-nav-item
          >
          <b-nav-item href="/faq">FAQ</b-nav-item>
          <b-nav-item
            v-if="isClient && isAuthenticated"
            href="/client/newticket"
            >Raise Ticket</b-nav-item
          >
          <b-nav-item v-if="isClient && isAuthenticated" href="/client"
            >All Tickets</b-nav-item
          >
          <b-nav-item v-if="isAdmin && isAuthenticated" href="/admin"
            >Dashboard</b-nav-item
          >
          <!-- <b-nav-item
            v-if="isAdmin && isAuthenticated"
            href="/admin/newcategory"
            >New Category</b-nav-item
          > -->
          <b-nav-item-dropdown v-if="isAdmin && isAuthenticated" right>
            <!-- Using 'button-content' slot -->
            <template #button-content> Category </template>
            <b-dropdown-item href="/admin/newcategory"
              >New Category</b-dropdown-item
            >
            <b-dropdown-item href="/admin/categories"
              >Category List</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <!-- <b-nav-item v-if="isAdmin && isAuthenticated" href="/admin/newfaq"
            >Create FAQ</b-nav-item
          > -->
          <b-nav-item-dropdown v-if="isAdmin && isAuthenticated" right>
            <!-- Using 'button-content' slot -->
            <template #button-content> FAQ </template>
            <b-dropdown-item href="/admin/newfaq">New FAQ</b-dropdown-item>
            <b-dropdown-item href="/admin/faqs">FAQ List</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="isAgent && isAuthenticated" href="/agent"
            >Dashboard</b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-3">
          <b-nav-text v-if="this.$store.state.auth.token" class="text-color"
            >Hello <span>{{ this.$store.state.auth.name }}!</span></b-nav-text
          >
          <b-nav-item
            v-if="this.$store.state.auth.token"
            @click.prevent="logOut"
            >Signout</b-nav-item
          >
          <b-nav-item-dropdown v-if="!isAuthenticated" right>
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
    isAgent() {
      return this.$store.getters.isAgent;
    },
    isClient() {
      return this.$store.getters.isClient;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
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
.text-color {
  color: #ffff;
}
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
