<template>
  <div>
    <b-card-title>All tickets report</b-card-title>
    <table id="no-more-tables" class="text-center">
      <thead>
        <tr>
          <th class="ticketId">Ticket Id</th>
          <th>Title</th>
          <th class="statuscss">Status</th>
          <th class="prioritycss" v-if="isAdmin || isAgent">
            Priority
            <b-dropdown
              size="sm"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <b-icon icon="funnel-fill" aria-hidden="true"></b-icon>
              </template>
              <b-dropdown-item @click="filterPriority('low')"
                >Low</b-dropdown-item
              >
              <b-dropdown-item @click="filterPriority('medium')"
                >medium</b-dropdown-item
              >
              <b-dropdown-item @click="filterPriority('high')"
                >High</b-dropdown-item
              >
            </b-dropdown>
          </th>
          <th v-if="isClient || isAdmin">Agent</th>
          <th v-if="isAgent || isAdmin">Client</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket._id">
          <td data-title="Ticket Id">{{ ticket._id }}</td>
          <td data-title="Title">{{ ticket.title }}</td>
          <td data-title="Status">
            <div class="col-auto">
              <div
                :class="getIcon(ticket.status)"
                class="icon icon-shape text-white rounded-circle"
                v-b-tooltip.hover
                :title="ticket.status"
              >
                <img
                  src="../../assets/images/ticket.png"
                  class="custome-css"
                  alt="ticket icon"
                />
              </div>
            </div>
          </td>
          <td
            data-title="Priority"
            :class="getPriority(ticket.priority)"
            v-if="isAdmin || isAgent"
          >
            {{ ticket.priority }}
          </td>
          <td
            data-title="Agent"
            v-if="isClient || isAdmin"
            v-text="getAgent(ticket.agent)"
          ></td>
          <td
            data-title="Client"
            v-if="isAgent || isAdmin"
            v-text="getClient(ticket.client)"
          ></td>
          <td data-title="Action" v-if="isAdmin">
            <router-link
              :to="{
                name: `admin-ticket-update`,
                params: {
                  id: ticket._id,
                  ticket,
                },
              }"
              class="mr-3"
              exact-active-class="active"
            >
              <b-button pill class="m-2" v-b-tooltip.hover title="Edit Ticket">
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
            <router-link
              :to="{
                name: `admin-add-comment`,
                params: {
                  id: ticket._id,
                  ticket,
                },
              }"
              class="mr-3"
              exact-active-class="active"
            >
              <b-button
                pill
                variant="info "
                class="m-2"
                v-b-tooltip.hover
                title="Add Comment"
              >
                <b-icon icon="chat-dots-fill " aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
          </td>
          <!-- client -->
          <td data-title="Action" v-if="isClient">
            <router-link
              :to="{
                name: `client-ticket-update`,
                params: {
                  id: ticket._id,
                  ticket,
                },
              }"
              class="mr-3"
              exact-active-class="active"
            >
              <b-button pill class="m-2" v-b-tooltip.hover title="Edit Ticket">
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
            <router-link
              :to="{
                name: `client-add-comment`,
                params: {
                  id: ticket._id,
                  ticket,
                },
              }"
              class="mr-3"
              exact-active-class="active"
            >
              <b-button
                pill
                variant="info"
                class="m-2"
                v-b-tooltip.hover
                title="Add Comment"
              >
                <b-icon icon="chat-dots-fill " aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
          </td>
          <!-- agent -->
          <td data-title="Action" v-if="isAgent">
            <router-link
              :to="{
                name: `agent-ticket-update`,
                params: {
                  id: ticket._id,
                  ticket,
                },
              }"
              class="mr-3"
              exact-active-class="active"
            >
              <b-button pill class="m-2" v-b-tooltip.hover title="Edit Ticket">
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
            <router-link
              :to="{
                name: `agent-add-comment`,
                params: {
                  id: ticket._id,
                  ticket,
                },
              }"
              class="mr-3"
              exact-active-class="active"
            >
              <b-button
                pill
                variant="info"
                class="m-2"
                v-b-tooltip.hover
                title="Add Comment"
              >
                <b-icon icon="chat-dots-fill " aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllAgents } from "@/service/admin";
import { getAllClients } from "@/service/client";
export default {
  name: "TableView",
  props: {
    tickets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allClients: [],
      allAgents: [],
      clientEmail: "",
      agentEmail: "",
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isAgent() {
      return this.$store.getters.isAgent;
    },
    isClient() {
      return this.$store.getters.isClient;
    },
  },
  methods: {
    filterPriority(priority) {
      this.$emit("priority", priority);
    },
    getClient(clientId) {
      if (clientId) {
        let requiredClient = this.allClients.filter(
          (client) => client._id === clientId
        );
        if (requiredClient.length !== 0) {
          this.clientEmail = requiredClient[0].email;
          return this.clientEmail;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    getAgent(agentId) {
      if (agentId) {
        let result = this.allAgents.filter((agent) => agent._id === agentId);
        if (result.length !== 0) {
          this.agentEmail = result[0].email;
          return this.agentEmail;
        } else {
          return "Agent not assigned";
        }
      } else {
        return "Agent not assigned";
      }
    },
    getIcon(status) {
      if (status === "open") {
        return "bg-danger";
      }
      if (status === "pending") {
        return "bg-yellow";
      }
      if (status === "processing") {
        return "bg-primary";
      }
      if (status === "closed") {
        return "bg-success";
      }
    },
    getPriority(priority) {
      if (priority === "high") {
        return "bg-danger";
      }
      if (priority === "medium") {
        return "bg-primary";
      }
      if (priority === "low") {
        return "bg-success";
      }
    },
  },
  async mounted() {
    if (this.isAdmin || this.isClient) {
      this.allAgents = await getAllAgents();
      this.allClients = await getAllClients();
    }
    if (this.isAgent) {
      this.allClients = await getAllClients();
    }
  },
};
</script>

<style>
/* overriding style of hover tooltip */
.bs-tooltip-top .arrow::before,
.bs-tooltip-auto[x-placement^="top"] .arrow::before {
  border-top-color: #453164;
}
.tooltip-inner {
  background-color: #453164 !important;
}
</style>

<style scoped >
#no-more-tables tbody tr:hover {
  background-color: #f8edf5;
}
#no-more-tables thead {
  border-top: 1px solid #ddd;
}
#no-more-tables {
  border-collapse: collapse;
  width: 100%;
}

#no-more-tables td,
#no-more-tables th {
  border-bottom: 1px solid #ddd;
  padding-right: 2px;
  padding-top: 12px;
  padding-bottom: 12px;
}
@media only screen and (min-width: 900px) {
  .statuscss {
    width: 83px;
  }
  .prioritycss {
    width: 109px;
  }
  .ticketId {
    width: 217px;
  }
}
@media only screen and (max-width: 800px) {
  /* Force table to not be like tables anymore */
  #no-more-tables table,
  #no-more-tables thead,
  #no-more-tables tbody,
  #no-more-tables th,
  #no-more-tables td,
  #no-more-tables tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  #no-more-tables thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  #no-more-tables tr {
    border: 1px solid #ccc;
  }

  #no-more-tables td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    white-space: normal;
    text-align: left;
  }

  #no-more-tables td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }

  /*
	Label the data
	*/
  #no-more-tables td:before {
    content: attr(data-title);
  }
}

/* ------------------ */
.bi-funnel-fill {
  fill: #033b59;
}
.icon {
  width: 3rem;
  height: 3rem;
}
.icon-shape {
  display: inline-flex;
  padding: 12px;
  text-align: center;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}
.rounded-circle {
  border-radius: 50% !important;
}
.custome-css {
  width: 46px;
}
.col-auto {
  width: auto;
  max-width: none;
  flex: 0 0 auto;
}
.bg-yellow {
  background-color: #ffd600 !important;
}
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
.btn-secondary {
  background-color: #ed0a71 !important;
  border-color: #f0036e;
}
.btn-secondary:hover {
  background-color: #ec599b !important;
  border-color: #f0036e;
}
.btn-info {
  background-color: #033b59 !important;
}
.btn-info:hover {
  color: #fff;
  background-color: #066091 !important;
  border-color: #032c42;
}
</style>