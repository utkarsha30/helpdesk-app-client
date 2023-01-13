<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="!this.ticket">
      No ticket selected
    </div>
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <b-card-title v-if="this.ticket">Edit ticket {{ id }}</b-card-title>
      <hr />
      <b-form @submit.prevent="Submit">
        <b-form-group label-for="ticketCategory" label="Ticket Category">
          <b-form-select
            class="mr-3"
            id="ticketCategory"
            v-model="selectedCategory"
          >
            <option selected value="">Select Category</option>
            <option v-for="category in categories" :key="category._id">
              {{ category.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group label-for="ticketTitle" label="Ticket Title">
          <b-form-input
            id="ticketTitle"
            placeholder="Enter title"
            v-model="title"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-for="ticketDescription" label="Ticket Description">
          <b-form-textarea
            id="ticketDescription"
            placeholder="Ticket description..."
            v-model="description"
            rows="3"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group label="Attachement" label-for="ticketAttachement">
          <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="preview">
              <img :src="preview" class="img-fluid w-25" />
              <!-- <p class="mb-0">file name: {{ image.name }}</p>
              <p class="mb-0">size: {{ image.size / 1024 }}KB</p> -->
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
import { updateTicketDetails } from "@/service/client";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import Vue from "vue";
export default {
  name: "TicketUpdateView",
  components: {
    LoadingIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    ticket: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: null,
      selectedCategory: this.ticket.category,
      title: this.ticket.title,
      description: this.ticket.description,
      preview: this.ticket.attachments,
      image: null,
    };
  },
  methods: {
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
    },
    async Submit() {
      this.loading = true;
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("category", this.selectedCategory);
      formData.append("client", this.$store.state.auth.id);
      try {
        const updatedTicket = await updateTicketDetails(this.id, formData);
        if (updatedTicket) {
          Vue.$toast.open({
            message: `Ticket '${updatedTicket._id}'  was updated`,
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
  },
};
</script>

<style scoped>
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
</style>