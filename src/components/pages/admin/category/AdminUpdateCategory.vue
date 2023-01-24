<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Update Category</b-card-title>
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
          <b-button type="submit" class="button-style">Update</b-button>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { updateCategory } from "@/service/categories";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
export default {
  name: "AdminUpdateCategory",
  props: {
    id: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
  },
  components: {
    LoadingIcon,
  },
  data() {
    return {
      loading: false,
      error: null,
      name: this.category.name,
      description: this.category.description,
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
      const categoryDetails = {
        name: this.name,
        description: this.description,
      };

      try {
        const updatedCategory = await updateCategory(this.id, categoryDetails);
        Vue.$toast.open({
          message: `Category '${updatedCategory.name}'  was updated`,
          type: "success",
          position: "top-right",
        });
      } catch (error) {
        Vue.$toast.open({
          message: error.response.data,
          type: "error",
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

<style>
</style>