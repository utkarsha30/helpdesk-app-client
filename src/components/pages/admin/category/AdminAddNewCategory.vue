<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Add New Category</b-card-title>
      <hr />
      <b-form @submit.prevent="onSubmit">
        <b-form-group label-for="categoryName" label="Category Name">
          <b-form-input
            id="categoryName"
            placeholder="Enter Name"
            v-model="$v.name.$model"
            :class="{ error: $v.name.$error, valid: !$v.name.$invalid }"
          ></b-form-input>
          <transition name="bounce">
            <div v-if="$v.name.$error" class="errorMessage">
              <p v-if="!$v.name.required">Name is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group
          label-for="categoryDescription"
          label="Category Description"
        >
          <b-form-textarea
            id="categoryDescription"
            placeholder="Category description..."
            v-model="$v.description.$model"
            :class="{
              error: $v.description.$error,
              valid: !$v.description.$invalid,
            }"
            rows="3"
          ></b-form-textarea>
          <transition name="bounce">
            <div v-if="$v.description.$error" class="errorMessage">
              <p v-if="!$v.description.required">Description is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group class="text-center">
          <b-button type="submit" class="button-style">Submit</b-button>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import { postNewCategory } from "@/service/categories";

export default {
  name: "AdminAddNewCategory",
  components: {
    LoadingIcon,
  },
  data() {
    return {
      name: null,
      description: null,
      loading: false,
      error: null,
      submitStatus: null,
    };
  },
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
  },
  methods: {
    async Submit() {
      this.loading = true;
      const details = {
        name: this.name,
        description: this.description,
      };
      try {
        const newCategory = await postNewCategory(details);
        if (newCategory) {
          this.name = null;
          this.description = null;
          this.$nextTick(() => {
            this.$v.$reset();
          });
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: `New Category '${newCategory.name}' was added `,
          });
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "error",
            title: "Unsuccessful attempt to add new Category",
          });
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
        this.Submit();
      }
    },
  },
};
</script>

<style scoped>
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
</style>