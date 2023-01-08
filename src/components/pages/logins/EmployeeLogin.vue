<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>

    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Employee Login</b-card-title>
      <hr />
      <b-form @submit.prevent="submitEmployeeLogin">
        <b-form-group label-for="clientEmail" label="Email">
          <b-form-input
            id="clientEmail"
            type="email"
            v-model="email"
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="block-inline"
          label-for="clientPassword"
          label="Password"
        >
          <b-input-group>
            <b-form-input
              id="clientPassword"
              :type="passwordType"
              aria-describedby="password-help-block"
              placeholder="Enter password"
              v-model="password"
            ></b-form-input>
            <template #append>
              <button
                class="button icon round-corners"
                @click.prevent="togglePassword"
              >
                <span class="is-small is-right">
                  <img
                    v-if="showPassword"
                    class="w-50"
                    src="../../../assets/images/eye.svg"
                  />
                  <img
                    v-if="!showPassword"
                    class="w-50"
                    src="../../../assets/images/eye_crossed.svg"
                  />
                </span>
              </button>
            </template>
          </b-input-group>
        </b-form-group>

        <b-form-group class="text-center">
          <b-button type="submit" class="button-style">Login</b-button>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
export default {
  name: "EmployeeLogin",
  computed: {
    isAdmin() {
      // no module name in case of using getters!
      // return this.$store.getters.auth.isAuthenticated;
      return this.$store.getters.isAdmin;
    },
  },
  components: {
    LoadingIcon,
  },
  data() {
    return {
      loading: false,
      error: null,
      email: null,
      password: null,
      showPassword: false,
      passwordType: "password",
    };
  },
  methods: {
    async submitEmployeeLogin() {
      const loginDetails = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      try {
        const login = await this.$store.dispatch("employeeLogin", loginDetails);
        console.log("login", login);
        Vue.$toast.open({
          message: `Welcome ${this.$store.state.auth.name}`,
          type: "success",
          position: "bottom",
        });
        if (this.isAdmin) {
          console.log("admin");
          this.$router.push("/admin");
        } else if (this.$store.state.auth.role === "agent") {
          this.$router.push("/agent");
        }
      } catch (error) {
        Vue.$toast.open({
          message: error.response.data,
          type: "error",
          position: "bottom",
        });
      } finally {
        this.loading = false;
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
  },
};
</script>

<style scoped>
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
.button-style {
  background-color: #ed0a71;
  width: 20%;
  align-items: center;
  border: 0;
}
.round-corners {
  border: 1px solid #ced4da;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
