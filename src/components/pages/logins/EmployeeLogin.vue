<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>

    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Employee Login</b-card-title>
      <hr />
      <b-form @submit.prevent="onSubmit">
        <b-form-group label-for="clientEmail" label="Email">
          <b-form-input
            id="clientEmail"
            type="email"
            v-model.trim="$v.email.$model"
            :class="{ error: $v.email.$error, valid: !$v.email.$invalid }"
            placeholder="Enter email"
          ></b-form-input>
          <transition name="bounce">
            <div v-if="$v.email.$error" class="errorMessage">
              <p v-if="!$v.email.required">Email is Required !</p>
              <p v-else-if="$v.email.$invalid">Please enter valid Email !</p>
              <p v-else-if="$v.email.emailValidation">
                Please enter valid Email !
              </p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group
          class="block-inline"
          label-for="clientPassword"
          label="Password"
        >
          <b-input-group>
            <b-form-input
              id="clientPassword"
              :type="show ? 'text' : 'password'"
              v-model.trim="$v.password.$model"
              :class="{
                error: $v.password.$error,
                valid: !$v.password.$invalid,
              }"
              placeholder="Enter password"
            ></b-form-input>
            <template #append>
              <button
                class="button icon round-corners"
                @click.prevent="show = !show"
              >
                <span class="is-small is-right">
                  <img
                    v-if="show"
                    class="w-50"
                    src="../../../assets/images/eye.svg"
                  />
                  <img
                    v-if="!show"
                    class="w-50"
                    src="../../../assets/images/eye_crossed.svg"
                  />
                </span>
              </button>
            </template>
          </b-input-group>
          <transition name="bounce">
            <div v-if="$v.password.$error" class="errorMessage">
              <p v-if="!$v.password.required">Password is Required !</p>
              <p v-else-if="!$v.password.minLength">
                Password should contain 8 Minimum Character !
              </p>
              <p v-else-if="!$v.password.passwordValidation">
                Password must have at least 1 character , 1 digit, 1 special
                characters, and should be atleast 8 characters in length.
              </p>
            </div>
          </transition>
        </b-form-group>

        <b-form-group class="text-center">
          <b-button type="submit" class="button-style">Login</b-button>
        </b-form-group>
      </b-form>
    </b-card>
    <div v-if="!loading" class="text-muted container my-5">
      <div>
        <small><strong>NOTE (DEMO ACCOUNTS)</strong></small>
      </div>
      <div>
        <small>Admin Email : shirley.chopra306@gmail.com</small>
      </div>
      <div>
        <small>Admin Password : AgentAccess@123</small>
      </div>
      <hr />
      <div>
        <small>Agent Email : Advait@fynd.com</small>
      </div>
      <div>
        <small>Admin Password : AgentAccess@123</small>
      </div>
    </div>
  </div>
</template>

<script>
import {
  passwordValidation,
  emailValidation,
} from "@/service/patternValidation";
import { required, email, minLength } from "vuelidate/lib/validators";
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
      submitStatus: null,
      show: false,
      loading: false,
      error: null,
      email: null,
      password: null,
    };
  },
  validations: {
    email: {
      required,
      email,
      emailValidation,
    },
    password: {
      required,
      minLength: minLength(8),
      passwordValidation,
    },
  },
  methods: {
    async submitEmployeeLogin() {
      const loginDetails = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      try {
        await this.$store.dispatch("employeeLogin", loginDetails);
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: `Welcome ${this.$store.state.auth.name}`,
        });

        if (this.isAdmin) {
          console.log("admin");
          this.$router.push("/admin");
        } else if (this.$store.state.auth.role === "agent") {
          this.$router.push("/agent");
        }
      } catch (error) {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "error",
          title: error.response.data,
        });
      } finally {
        this.loading = false;
      }
    },
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "FAIL";
      } else {
        this.submitStatus = "SUCCESS";
        this.submitEmployeeLogin();
      }
    },
  },
};
</script>

<style scoped>
.valid {
  border: 1.5px solid rgb(55, 161, 14);
  color: rgb(26, 82, 4);
}
form div .error {
  border: 1.5px solid red;
  color: rgb(247, 10, 10);
}
.errorMessage {
  transition: visibility 0s, opacity 0.5s linear;
  color: rgb(233, 64, 22);
  font-size: 0.8em;
}
/* animation of validation messages */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.7s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
.button-style {
  background-color: #ed0a71;
  width: 200px;
  align-items: center;
  border: 0;
}
.btn-secondary:hover {
  background-color: #ec599b !important;
  border-color: #f0036e !important;
}
.round-corners {
  border: 1px solid #ced4da;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
