<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Add New FAQ</b-card-title>
      <hr />
      <b-form @submit.prevent="Submit">
        <b-form-group label-for="faqQuestion" label="Question">
          <b-form-input
            id="faqQuestion"
            placeholder="Enter frequently asked question"
            v-model="question"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-for="faqSolution" label="Solution">
          <b-form-input
            id="faqSolution"
            placeholder="Enter solution"
            v-model="answer"
          ></b-form-input>
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
import { postNewFaq } from "@/service/faq";
import Vue from "vue";
export default {
  name: "AdminCreateFaq",
  components: {
    LoadingIcon,
  },
  data() {
    return {
      question: null,
      answer: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async Submit() {
      this.loading = true;
      const details = {
        question: this.question,
        answer: this.answer,
      };
      try {
        const newFaq = await postNewFaq(details);
        Vue.$toast.open({
          message: `New Category '${newFaq._id}'  was added !`,
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