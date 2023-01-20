<template>
   <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="!this.ticket">
      No ticket selected
    </div>
  <div  v-if="!loading && !error && this.ticket" class="mb-3 extra-css container my-4">
    <div class="row no-gutters p-3 ">
      <div  class="col-md-8 col-sm-12 ">
        <div v-if="comments.length!==0" class="comment-css overflow-auto">
          <b-card v-for="(comment,index) in comments"  :key="index" class="extra-css m-4">    
            <b-card-sub-title class="mb-2">Posted By: {{ comment.name }}</b-card-sub-title>
            <hr class="m-2"/>
            <b-card-text>
              {{comment.comment}}
            </b-card-text>
          </b-card>
          
        </div>
        <div v-if="this.comments.length === 0" class="alert alert-danger" role="alert">
            No comment added yet
          </div>
        
        <div class="p-4 button-css">
          <b-input-group class="mb-3 text-color" prepend="Add Comment">
          <b-form-input v-model="newComment"></b-form-input>
          <b-input-group-append>
            <b-button @click="AddComment"><b-icon icon="chat-dots-fill " aria-hidden="true"></b-icon></b-button>
          </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <b-card header="Your request has been submitted" class="text-center extra-css mb-3">
          <b-card-body>
            <table>
              <tr>
                <td>
                  <th>Number</th>
                </td>
                <td class="Id">{{ id }}</td>
              </tr>
              <tr>
                <td>
                  <th>Status</th>
                </td>
                <td>{{ ticket.status }}</td>
              </tr>
              <tr>
                <td>
                  <th>Category</th>
                </td>
                <td>{{ ticket.category }}</td>
              </tr>
            </table>
            </b-card-body>
            <hr class="m-2"/>
            <b-list-group flush>
              <b-list-group-item class="text-left"><b-card-sub-title class="mb-2">ticket Title</b-card-sub-title> {{ ticket.title }}</b-list-group-item>
              <b-list-group-item class="text-left"><b-card-sub-title class="mb-2">ticket Description</b-card-sub-title> {{ ticket.description }}</b-list-group-item>
              <b-list-group-item class="text-left"><b-card-sub-title class="mb-2">Agent Assigned</b-card-sub-title> {{ ticket.agent }}</b-list-group-item>
            </b-list-group>
        </b-card>
        <b-card header="Attachement" class="text-center extra-css">
          <div v-if="ticket.attachments" class="w-100">
            <img  :src="ticket.attachments" class="w-100"/>
          </div> 
          <div v-if="!ticket.attachments" class="rectangle">No attachments</div>
        </b-card>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { addComment } from "@/service/client";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import Vue from "vue";
export default {
  name: "ClientAddcomment",
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
      comments: this.ticket.comments,
      newComment: "",
      name: "",
      loading: false,
      error: null,
    };
  },
  methods: {
    async AddComment() {
      const commentDetails = {
        comments: [
          { name: this.$store.state.auth.name, comment: this.newComment },
        ],
      };
      const newVal = {
        name: this.$store.state.auth.name,
        comment: this.newComment,
      };
      this.loading = true;
      try {
        const newComment = await addComment(this.id, commentDetails);
        if (newComment) {
          Vue.$toast.open({
            message: `Comment was added`,
            type: "success",
            position: "top-right",
          });
          this.comments.push(newVal);
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
.rectangle {
  padding: 20px;
  text-align: center;
  border: 1px dotted #555;
  height: 80px;
  width: 100%;
}
.comment-css {
  height: 500px;
}
.input-group-text {
  color: #ffff;
}
.btn-secondary {
  color: white;
  background-color: #033b59;
}
.card-header {
  background-image: linear-gradient(to bottom right, #d4ece5, #f8edf5);
  color: #472673;
}
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
@media only screen and (max-width: 1024px) {
  .Id {
    word-break: break-all;
  }
}
</style>