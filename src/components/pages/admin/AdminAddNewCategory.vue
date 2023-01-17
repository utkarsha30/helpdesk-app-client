<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Add New Category</b-card-title>
      <hr />
      <b-form @submit.prevent="Submit">
        <b-form-group label-for="categoryName" label="Category Name">
          <b-form-input
            id="categoryName"
            placeholder="Enter Name"
            v-model="name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="categoryDescription"
          label="Category Description"
        >
          <b-form-textarea
            id="categoryDescription"
            placeholder="Category description..."
            v-model="description"
            rows="3"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group class="text-center">
          <b-button type="submit" class="button-style">Submit</b-button>
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import { postNewCategory } from "@/service/categories";
import Vue from "vue";
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
    };
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
        Vue.$toast.open({
          message: `New Category '${newCategory._id}'  was added !`,
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
  },
};
</script>

<style scoped>
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