<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title>Raise new ticket</b-card-title>
      <hr />
      <b-form @submit.prevent="onSubmit">
        <b-form-group label-for="ticketCategory" label="Ticket Category">
          <b-form-select
            class="mr-3"
            id="ticketCategory"
            v-model="$v.selectedCategory.$model"
            :class="{
              error: $v.selectedCategory.$error,
              valid: !$v.selectedCategory.$invalid,
            }"
          >
            <option selected value="">Select Category</option>
            <option v-for="category in categories" :key="category._id">
              {{ category.name }}
            </option>
          </b-form-select>
          <transition name="bounce">
            <div v-if="$v.selectedCategory.$error" class="errorMessage">
              <p v-if="!$v.selectedCategory.required">Category is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group label-for="ticketTitle" label="Ticket Title">
          <b-form-input
            id="ticketTitle"
            placeholder="Enter title"
            v-model="$v.title.$model"
            :class="{ error: $v.title.$error, valid: !$v.title.$invalid }"
          ></b-form-input>
          <transition name="bounce">
            <div v-if="$v.title.$error" class="errorMessage">
              <p v-if="!$v.title.required">Title is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group label-for="ticketDescription" label="Ticket Description">
          <b-form-textarea
            id="ticketDescription"
            placeholder="Ticket description..."
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
        <b-form-group label="Attachement" label-for="ticketAttachement">
          <b-input-group>
            <b-input-group-prepend class="icon-color" is-text>
              <b-icon icon="folder-plus"></b-icon>
            </b-input-group-prepend>
            <b-form-file
              id="ticketAttachement"
              ref="attachments"
              @change="previewImage"
              accept="image/*"
            ></b-form-file>
          </b-input-group>
          <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="preview">
              <img :src="preview" class="img-fluid w-25" />
              <p class="mb-0">file name: {{ image.name }}</p>
              <p class="mb-0">size: {{ image.size / 1024 }}KB</p>
            </template>
          </div>
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
import { required } from "vuelidate/lib/validators";
import { getAllCategories } from "@/service/categories";
import { postNewTicket } from "@/service/client";
import Vue from "vue";
export default {
  name: "ClientAddnew",
  components: {
    LoadingIcon,
  },
  data() {
    return {
      loading: false,
      error: null,
      categories: [],
      attachments: null,
      selectedCategory: "",
      title: null,
      description: null,
      preview: null,
      image: null,
    };
  },
  validations: {
    title: {
      required,
    },
    description: {
      required,
    },
    selectedCategory: {
      required,
    },
  },
  methods: {
    // convert() {
    //   console.log(this.attachement);
    //   this.val = JSON.stringify(this.attachement);
    //   console.log(this.val);
    // },
    previewImage: function (event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
      this.attachments = event.target.files[0];
      console.log("attachment", this.attachments);
    },
    async Submit() {
      this.loading = true;
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("category", this.selectedCategory);
      formData.append("client", this.$store.state.auth.id);
      formData.append("attachments", this.attachments);
      try {
        const newTicket = await postNewTicket(formData);
        if (newTicket) {
          console.log("newTicket", newTicket);
          Vue.$toast.open({
            message: `Ticket '${newTicket._id}'  was added`,
            type: "success",
            position: "top-right",
          });
        } else {
          Vue.$toast.open({
            message: "Unsuccessful add attempt",
            type: "error",
          });
        }
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
  async mounted() {
    const categories = await getAllCategories();
    this.categories = categories;
  },
};
</script>

<style >
/* validations-css */
form .valid {
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
/* animation for error message */
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
/* validations-css */
.custom-file-label::after {
  color: white;
  background-color: #033b59;
}
svg {
  fill: #fff;
}
.input-group-text {
  background-color: #033b59;
  border: 1px solid #033b59;
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
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
</style>