<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/" class="ml-2"
        ><img src="../assets/images/logo.png" class="img-width" alt="logo"
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="ml-3" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
          <b-nav-item to="/about" exact exact-active-class="active"
            >About</b-nav-item
          >
          <b-nav-item
            v-if="!isAuthenticated"
            to="/registration"
            exact
            exact-active-class="active"
            >Registration</b-nav-item
          >
          <b-nav-item
            to="/faq"
            exact
            exact-active-class="active"
            v-if="!isAdmin"
            >FAQ</b-nav-item
          >
          <b-nav-item
            v-if="isClient && isAuthenticated"
            to="/client/newticket"
            exact
            exact-active-class="active"
            >Raise Ticket</b-nav-item
          >
          <b-nav-item
            v-if="isClient && isAuthenticated"
            to="/client"
            exact
            exact-active-class="active"
            >All Tickets</b-nav-item
          >
          <b-nav-item
            v-if="isAdmin && isAuthenticated"
            to="/admin"
            exact
            exact-active-class="active"
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
            <b-dropdown-item
              to="/admin/newcategory"
              exact
              exact-active-class="active"
              >New Category</b-dropdown-item
            >
            <b-dropdown-item
              to="/admin/categories"
              exact
              exact-active-class="active"
              >Category List</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <!-- <b-nav-item v-if="isAdmin && isAuthenticated" href="/admin/newfaq"
            >Create FAQ</b-nav-item
          > -->
          <b-nav-item-dropdown v-if="isAdmin && isAuthenticated" right>
            <!-- Using 'button-content' slot -->
            <template #button-content> FAQ </template>
            <b-dropdown-item
              to="/admin/newfaq"
              exact
              exact-active-class="active"
              >New FAQ</b-dropdown-item
            >
            <b-dropdown-item to="/admin/faqs" exact exact-active-class="active"
              >FAQ List</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item
            v-if="isAgent && isAuthenticated"
            to="/agent"
            exact
            exact-active-class="active"
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
            <b-dropdown-item to="/clientlogin" exact exact-active-class="active"
              >Client Login</b-dropdown-item
            >
            <b-dropdown-item
              to="/employeelogin"
              exact
              exact-active-class="active"
              >Employee Login</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
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
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "success",
        title: `Successfully LoggedOut !!`,
      });
    },
  },
};
</script>

<style scoped>
.active {
  color: white;
}

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
