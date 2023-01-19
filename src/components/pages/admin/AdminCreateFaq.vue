<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Add New FAQ</b-card-title>
      <hr />
      <b-form @submit.prevent="onSubmit">
        <b-form-group label-for="faqQuestion" label="Question">
          <b-form-input
            id="faqQuestion"
            placeholder="Enter frequently asked question"
            v-model="$v.question.$model"
            :class="{ error: $v.question.$error, valid: !$v.question.$invalid }"
          ></b-form-input>
          <transition name="bounce">
            <div v-if="$v.question.$error" class="errorMessage">
              <p v-if="!$v.question.required">Question is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group label-for="faqSolution" label="Solution">
          <b-form-input
            id="faqSolution"
            placeholder="Enter solution"
            v-model="$v.answer.$model"
            :class="{ error: $v.answer.$error, valid: !$v.answer.$invalid }"
          ></b-form-input>
          <transition name="bounce">
            <div v-if="$v.answer.$error" class="errorMessage">
              <p v-if="!$v.answer.required">Answer is Required !</p>
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
      submitStatus: null,
    };
  },
  validations: {
    question: {
      required,
    },
    answer: {
      required,
    },
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
          message: `New FAQ '${newFaq._id}'  was added !`,
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