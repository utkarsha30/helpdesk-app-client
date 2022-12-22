<template>
  <div>
    <b-card class="mb-3 extra-css container my-4">
      <b-card-title>Client Registration</b-card-title>
      <hr />
      <b-form @submit.prevent="submitNewClient">
        <b-form-group label-for="clientName" label="Name">
          <b-form-input id="clientName" placeholder="Enter name"></b-form-input>
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
          ></b-form-input>
        </b-form-group>
        <b-form-group class="block-inline" label-for="clientPassword" label="Password">
          <b-input-group>
            <b-form-input
              id="clientPassword"
              :type= "passwordType"
              aria-describedby="password-help-block"
            ></b-form-input>
          <template #append>
            <button class="button icon round-corners"  @click.prevent="togglePassword">
              <span class="is-small is-right">
                <img  v-if="showPassword" class="w-50" src="../../../assets/images/eye.svg" />
                <img v-if="!showPassword" class="w-50" src="../../../assets/images/eye_crossed.svg" />
              </span>
            </button>
          </template>   
      </b-input-group>
        </b-form-group>
        <b-form-group class="block-inline" label-for="clientConfirmPassword" label="Confirm Password">
          <b-input-group>
            <b-form-input
              id="clientConfirmPassword"
              :type= "passwordType"
              aria-describedby="password-help-block"
            ></b-form-input>
          <template #append>
            <button class="button icon round-corners"  @click.prevent="togglePassword">
              <span class="is-small is-right">
                <img  v-if="showPassword" class="w-50" src="../../../assets/images/eye.svg" />
                <img v-if="!showPassword" class="w-50" src="../../../assets/images/eye_crossed.svg" />
              </span>
            </button>
          </template>   
      </b-input-group>
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
export default {
  name: "RegistrationPage",
  components: {},
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      showPassword: false,
      passwordType: 'password'
    };
  },
  computed: {},
  methods: {
    togglePassword(){
      this.showPassword = !this.showPassword;
      if(this.passwordType === 'password')
      {
        this.passwordType = 'text'
      }
      else{
        this.passwordType = 'password'
      }
    }
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
.round-corners{
  border: 1px solid #ced4da;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
}
</style>
