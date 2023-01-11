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
        <img class="w-25" :src="attachments" />
        <b-form-group label="Attachement" label-for="ticketAttachement">
          <b-input-group>
            <b-input-group-prepend class="icon-color" is-text>
              <b-icon icon="folder-plus"></b-icon>
            </b-input-group-prepend>
            <b-form-file
              id="ticketAttachement"
              v-model="attachments"
              @change="previewImage"
              accept="image/*"
            ></b-form-file>
          </b-input-group>
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
    {{ attachments }}
  </div>
</template>

<script>
import { getAllCategories } from "@/service/categories";
import { updateTicketDetails } from "@/service/client";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import Vue from "vue";
export default {
  name: "ClientTicketUpdate",
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
  },
  data() {
    return {
      loading: false,
      error: null,
      selectedCategory: this.ticket.category,
      title: this.ticket.title,
      description: this.ticket.description,
      attachments: this.ticket.attachments,
      categories: [],
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
        this.attachments = event.target.files[0];
      }
    },
    async Submit() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("category", this.selectedCategory);
      formData.append("client", this.$store.state.auth.id);
      formData.append("attachments", this.attachments);
      // const ticketDetails = {
      //   title: this.title,
      //   description: this.description,
      //   category: this.selectedCategory,
      //   client: this.$store.state.auth.id,
      //   attachments: this.attachments,
      // };

      try {
        const updatedTicket = await updateTicketDetails(this.id, formData);
        console.log(updatedTicket._id);
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
  async mounted() {
    const categories = await getAllCategories();
    this.categories = categories;
  },
};
</script>

<style scoped>
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
</style>