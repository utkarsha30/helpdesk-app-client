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
            <!-- <option selected value="selected">
              {{ this.ticket.category }}
            </option> -->
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
        <b-form-group
          v-if="isClient || isAgent || isAdmin"
          label-for="ticketTitle"
          label="Ticket Title"
        >
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
        <b-form-group
          v-if="isClient || isAgent || isAdmin"
          label-for="ticketDescription"
          label="Ticket Description"
        >
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
        <b-form-group v-if="isAdmin" label-for="ticketClient" label="Client">
          <b-form-input
            id="ticketClient"
            v-model="client"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="isAgent" label-for="ticketClient" label="Client">
          <b-form-input
            id="ticketClient"
            v-model="selectedClient"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- Agent for client view -->
        <b-form-group
          v-if="isClient"
          label-for="ticketClientAgent"
          label="Agent"
        >
          <b-form-input
            id="ticketClientAgent"
            v-model="selectedAgent"
            disabled
          ></b-form-input>
        </b-form-group>
        <!-- Agent -->
        <b-form-group
          v-if="isAdmin"
          label-for="ticketAgent"
          label="Ticket Agent"
        >
          <b-form-select
            class="mr-3"
            id="ticketAgent"
            v-model="$v.selectedAgent.$model"
            :class="{
              error: $v.selectedAgent.$error,
              valid: !$v.selectedAgent.$invalid,
            }"
          >
            <option selected value="">Select Agent</option>
            <option v-for="agent in agents" :key="agent._id">
              {{ agent.email }}
            </option>
          </b-form-select>
          <transition name="bounce">
            <div v-if="$v.selectedAgent.$error" class="errorMessage">
              <p v-if="!$v.selectedAgent.required">Agent is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <!-- --- -->
        <b-form-group
          v-if="isAgent || isAdmin"
          label-for="ticketStatus"
          label="Ticket Status"
        >
          <b-form-select
            v-model="$v.status.$model"
            :class="{ error: $v.status.$error, valid: !$v.status.$invalid }"
            :options="statusOptions"
          ></b-form-select>
          <transition name="bounce">
            <div v-if="$v.status.$error" class="errorMessage">
              <p v-if="!$v.status.required">Status is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group
          v-if="isAgent || isAdmin"
          label-for="ticketPriority"
          label="Ticket Priority"
        >
          <b-form-select
            v-model="$v.priority.$model"
            :class="{ error: $v.priority.$error, valid: !$v.priority.$invalid }"
            :options="priorityOptions"
          ></b-form-select>
          <transition name="bounce">
            <div v-if="$v.priority.$error" class="errorMessage">
              <p v-if="!$v.priority.required">Priority is Required !</p>
            </div>
          </transition>
        </b-form-group>

        <b-form-group
          v-if="isClient || isAgent || isAdmin"
          label="Attachement"
          label-for="ticketAttachement"
        >
          <div class="border p-2 mt-3">
            <p>Preview Here:</p>
            <template v-if="preview">
              <img :src="preview" class="img-fluid w-25" />
            </template>
          </div>
        </b-form-group>
        <b-form-group class="text-center">
          <b-button
            v-if="isAdmin"
            type="submit"
            class="button-style"
            :disabled="
              !$v.title.$dirty &&
              !$v.description.$dirty &&
              !$v.selectedCategory.$dirty &&
              !$v.selectedAgent.$dirty &&
              !$v.status.$dirty &&
              !$v.priority.$dirty
            "
            >Submit</b-button
          >
          <b-button
            v-if="isAgent"
            type="submit"
            class="button-style"
            :disabled="
              !$v.title.$dirty &&
              !$v.description.$dirty &&
              !$v.selectedCategory.$dirty &&
              !$v.status.$dirty &&
              !$v.priority.$dirty
            "
            >Submit</b-button
          >
          <b-button
            v-if="isClient"
            type="submit"
            class="button-style"
            :disabled="
              !$v.title.$dirty &&
              !$v.description.$dirty &&
              !$v.selectedCategory.$dirty
            "
            >Submit</b-button
          >
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { updateTicketDetails, getAllClients } from "@/service/client";
import { getAllAgents } from "@/service/admin";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
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
      submitStatus: null,
      loading: false,
      error: null,
      selectedCategory: this.ticket.category || "",
      title: this.ticket.title,
      description: this.ticket.description,
      client: this.ticket.client.name,
      selectedAgent: "",
      agents: [],
      selectedClient: "",
      clients: [],
      preview: this.ticket.attachments,
      image: null,
      status: this.ticket.status,
      statusOptions: [
        { value: null, text: "Please select an option" },
        { value: "open", text: "Open" },
        { value: "processing", text: "Processing" },
        { value: "pending", text: "Pending" },
        { value: "closed", text: "Closed" },
      ],
      priority: this.ticket.priority,
      priorityOptions: [
        { value: null, text: "Please select an option" },
        { value: "low", text: "Low" },
        { value: "medium", text: "Medium" },
        { value: "high", text: "High" },
      ],
    };
  },
  validations() {
    if (this.isAdmin) {
      return {
        title: {
          required,
        },
        description: {
          required,
        },
        selectedCategory: {
          required,
        },
        status: {
          required,
        },
        priority: {
          required,
        },
        selectedAgent: {
          required,
        },
      };
    }
    if (this.isClient) {
      return {
        title: {
          required,
        },
        description: {
          required,
        },
        selectedCategory: {
          required,
        },
      };
    }
    if (this.isAgent) {
      return {
        title: {
          required,
        },
        description: {
          required,
        },
        selectedCategory: {
          required,
        },
        status: {
          required,
        },
        priority: {
          required,
        },
      };
    }
  },
  computed: {
    isAgent() {
      return this.$store.getters.isAgent;
    },
    isClient() {
      return this.$store.getters.isClient;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
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
      if (this.isAgent) {
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("category", this.selectedCategory);
        formData.append("status", this.status);
        formData.append("priority", this.priority);
      } else if (this.isAdmin) {
        const result = this.agents.filter(
          (agent) => agent.email === this.selectedAgent
        );
        const agentId = result[0]._id;
        this.selectedAgent = result[0].email;
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("category", this.selectedCategory);
        formData.append("agent", agentId);
        formData.append("status", this.status);
        formData.append("priority", this.priority);
      } else if (this.isClient) {
        formData.append("category", this.selectedCategory);
        formData.append("title", this.title);
        formData.append("description", this.description);
      }

      try {
        const updatedTicket = await updateTicketDetails(this.id, formData);
        if (updatedTicket) {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: `Ticket '${updatedTicket._id}' was updated`,
          });
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "error",
            title: "Unsuccessful attempt to update ticket",
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
  async mounted() {
    if (this.isAgent) {
      this.clients = await getAllClients();
      const result = this.clients.filter(
        (client) => client._id === this.ticket.client
      );
      this.selectedClient = result[0].name;
    }
    if (this.isAdmin) {
      const allAgents = await getAllAgents();
      this.agents = allAgents;
      if (this.ticket.agent) {
        const result = allAgents.filter(
          (agent) => agent._id === this.ticket.agent._id
        );
        this.selectedAgent = result[0].email;
      }
    }
    if (this.isClient) {
      const allAgents = await getAllAgents();
      this.agents = allAgents;
      if (this.ticket.agent) {
        const result = allAgents.filter(
          (agent) => agent._id === this.ticket.agent
        );
        this.selectedAgent = result[0].name;
      }
    }
  },
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.65;
}
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
.form-control:disabled,
.form-control[readonly] {
  background-color: #f8edf5;
}
</style>