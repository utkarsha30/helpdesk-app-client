<template>
  <div>
    <b-card-title>All tickets report</b-card-title>
    <table class="table table-hover text-center">
      <thead>
        <tr>
          <th scope="col">Ticket Id</th>
          <th scope="col">Ticket Title</th>
          <th scope="col">Ticket Status</th>
          <th v-if="isAdmin" scope="col">Ticket Priority</th>
          <th v-if="isClient || isAdmin" scope="col">Agent</th>
          <th v-if="isAgent || isAdmin" scope="col">Client</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="p-3" v-for="ticket in tickets" :key="ticket._id">
          <td data-title="Ticket Id">{{ ticket._id }}</td>
          <td data-title="Ticket Title">{{ ticket.title }}</td>
          <td data-title="Ticket Status">{{ ticket.status }}</td>
          <td data-title="Ticket Priority" v-if="isAdmin">
            {{ ticket.priority }}
          </td>
          <td data-title="Agent" v-if="isClient || isAdmin">
            {{ ticket.agent }}
          </td>
          <td data-title="Ticket Id" v-if="isAgent || isAdmin">
            {{ ticket.client }}
          </td>
          <!-- For Client -->
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
              <b-button pill class="m-2">
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
            <!-- <b-icon icon="cone-striped" variant="danger"></b-icon> -->
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
              <b-button pill variant="info" class="m-2">
                <b-icon icon="chat-dots-fill " aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
          </td>
          <!-- for agent -->
          <td data-title="Action" v-if="isAgent">
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
              <b-button pill class="m-2">
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
            <!-- <b-icon icon="cone-striped" variant="danger"></b-icon> -->
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
              <b-button pill variant="info" class="m-2">
                <b-icon icon="chat-dots-fill " aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
          </td>
          <!-- for admin -->
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
              <b-button pill class="m-2">
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
              </b-button>
            </router-link>
            <!-- <b-icon icon="cone-striped" variant="danger"></b-icon> -->
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
              <b-button pill variant="info" class="m-2">
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
export default {
  name: "TableView",
  props: {
    tickets: {
      type: Array,
      required: true,
    },
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
};
</script>

<style scoped>
@media only screen and (max-width: 800px) {
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    white-space: normal;
    text-align: left;
  }

  td:before {
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
  td:before {
    content: attr(data-title);
  }
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
.table-hover tbody tr:hover {
  background-color: #f8edf5;
}
</style>