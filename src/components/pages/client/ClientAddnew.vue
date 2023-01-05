<template>
  <div>
    <b-card class="mb-3 extra-css container my-4">
      <b-card-title>Raise new ticket</b-card-title>
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
          <b-input-group>
            <b-input-group-prepend class="icon-color" is-text>
              <b-icon icon="folder-plus"></b-icon>
            </b-input-group-prepend>
            <b-form-file
              id="ticketAttachement"
              v-model="attachement"
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
          <!-- <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="preview_list.length">
              <div v-for="(item, index) in preview_list" :key="index">
                <img :src="item" class="img-fluid w-25" />
                <p class="mb-0">file name: {{ image_list[index].name }}</p>
                <p>size: {{ image_list[index].size / 1024 }}KB</p>
              </div>
            </template>
          </div> -->
        </b-form-group>
        <b-form-group class="text-center">
          <b-button type="submit" class="button-style">Submit</b-button>
        </b-form-group>
      </b-form>
      <!-- <div class="col-md-5">
        <h5>2. multiple file</h5>
        <form>
          <div class="form-group">
            <label for="my-file">Select Image</label>
            <input
              type="file"
              accept="image/*"
              multiple="multiple"
              @change="previewMultiImage"
              class="form-control-file"
              id="my-file"
            />
          </div>
        </form>
      </div> -->
    </b-card>
  </div>
</template>

<script>
import { getAllCategories } from "@/service/categories";
import { postNewTicket } from "@/service/client";
import Vue from "vue";
export default {
  name: "ClientAddnew",
  data() {
    return {
      categories: [],
      attachement: null,
      selectedCategory: "",
      title: null,
      description: null,
      preview: null,
      image: null,
    };
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
    },
    async Submit() {
      console.log(this.title);
      console.log(this.selectedCategory);
      console.log(this.description);
      console.log(this.attachement);
      console.log(typeof this.attachement);
      const ticketDetails = {
        title: this.title,
        description: this.description,
        category: this.selectedCategory,
        client: this.$store.state.auth.id,
        attachements: this.attachement,
      };
      try {
        const newTicket = await postNewTicket(ticketDetails);
        if (newTicket) {
          Vue.$toast.open({
            message: `Ticket '${newTicket._id}'  was added`,
            type: "success",
            position: "top-right",
          });
          //   this.teamName = null;
          //   this.teamShortName = null;
          //   this.teamDescription = null;
          //   this.memberList = [];
          //   this.selectedMember = "";
        } else {
          Vue.$toast.open({
            message: "Unsuccessful add attempt",
            type: "error",
          });
          //   this.teamName = null;
          //   this.teamShortName = null;
          //   this.teamDescription = null;
          //   this.memberList = [];
          //   this.selectedMember = "";
        }
      } catch (error) {
        Vue.$toast.open({
          message: error.response.data,
          type: "error",
        });
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
.custom-file-label::after {
  color: white !important;
  background-color: #033b59 !important;
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
  width: 20%;
  align-items: center;
  border: 0;
}
</style>