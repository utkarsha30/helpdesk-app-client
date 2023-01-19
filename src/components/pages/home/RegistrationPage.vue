<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>

    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Client Registration</b-card-title>
      <hr />
      <b-form @submit.prevent="onSubmit">
        <b-form-group label-for="clientName" label="Name">
          <b-form-input
            id="clientName"
            placeholder="Enter name"
            v-model="$v.name.$model"
            :class="{ error: $v.name.$error, valid: !$v.name.$invalid }"
          ></b-form-input>
          <transition name="bounce">
            <div v-if="$v.name.$error" class="errorMessage">
              <p v-if="!$v.name.required">Username is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group
          label-for="clientEmail"
          label="Email"
          description="We will never share your email with anyone else"
        >
          <b-form-input
            id="clientEmail"
            type="email"
            placeholder="Enter email"
            v-model="$v.email.$model"
            :class="{ error: $v.email.$error, valid: !$v.email.$invalid }"
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
              v-model="$v.password.$model"
              :class="{
                error: $v.password.$error,
                valid: !$v.password.$invalid,
              }"
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
        <b-form-group
          class="block-inline"
          label-for="clientConfirmPassword"
          label="Confirm Password"
        >
          <b-input-group>
            <b-form-input
              id="clientConfirmPassword"
              :type="confirmPassShow ? 'text' : 'password'"
              v-model="$v.confirmPassword.$model"
              :class="{
                error: $v.confirmPassword.$error,
                valid: password != '' ? !$v.confirmPassword.$invalid : '',
              }"
            ></b-form-input>
            <template #append>
              <button
                class="button icon round-corners"
                @click.prevent="confirmPassShow = !confirmPassShow"
              >
                <span class="is-small is-right">
                  <img
                    v-if="confirmPassShow"
                    class="w-50"
                    src="../../../assets/images/eye.svg"
                  />
                  <img
                    v-if="!confirmPassShow"
                    class="w-50"
                    src="../../../assets/images/eye_crossed.svg"
                  />
                </span>
              </button>
            </template>
          </b-input-group>
          <transition name="bounce">
            <div v-if="$v.confirmPassword.$error" class="errorMessage">
              <p v-if="!$v.confirmPassword.sameAsPassword">
                Password must be identical.
              </p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group class="text-center">
          <b-button type="submit" class="button-style">Submit</b-button>
        </b-form-group>

        <!-- <b-icon icon="eye" ></b-icon> -->
      </b-form>
    </b-card>
  </div>
</template>

<script>
import {
  passwordValidation,
  emailValidation,
} from "@/service/patternValidation";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Vue from "vue";
import { postNewClient } from "@/service/client";
// import { getAllClients } from "@/service/client";
export default {
  name: "RegistrationPage",
  components: {
    LoadingIcon,
  },
  data() {
    return {
      show: false,
      confirmPassShow: false,
      loading: false,
      error: null,
      name: null,
      email: null,
      password: "",
      confirmPassword: "",
      showPassword: false,
      passwordType: "password",
      clients: [],
      submitStatus: null,
    };
  },
  validations: {
    name: {
      required,
    },
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
    confirmPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  computed: {},
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    async submitNewClient() {
      this.loading = true;
      const clientDetails = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      try {
        const newClient = await postNewClient(clientDetails);
        Vue.$toast.open({
          message: `Wohoo! New account created for ${newClient.name} `,
          type: "success",
          position: "bottom",
        });
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
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "FAIL";
      } else {
        this.submitStatus = "SUCCESS";
        this.submitNewClient();
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
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.7s reverse;
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
.round-corners {
  border: 1px solid #ced4da;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
