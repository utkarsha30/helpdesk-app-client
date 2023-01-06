<template>
  <div>
    <b-card class="mb-3 extra-css container my-4">
      <b-card-title>All tickets report</b-card-title>
      <table class="table table-hover text-center">
        <thead>
          <tr>
            <th scope="col">Ticket Id</th>
            <th scope="col">Ticket Title</th>
            <th scope="col">Ticket Status</th>
            <th scope="col">Agent</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="p-3" v-for="ticket in tickets" :key="ticket._id">
            <td>{{ ticket._id }}</td>
            <td>{{ ticket.title }}</td>
            <td>{{ ticket.status }}</td>
            <td>{{ ticket.agent }}</td>
            <td>
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
              <b-button pill variant="info" class="m-2">
                <b-icon icon="chat-dots-fill " aria-hidden="true"></b-icon>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- <b-table striped hover :items="tickets"></b-table> -->
    </b-card>
  </div>
</template>

<script>
import { getTicketsList } from "@/service/client";
export default {
  name: "ClientTickets",
  data() {
    return {
      tickets: "",
      id: null,
    };
  },
  methods: {},
  async mounted() {
    // this.loading = true;
    try {
      const client = await getTicketsList(this.$store.state.auth.id);
      this.tickets = client.tickets;
      console.log(client.tickets);
    } catch (error) {
      this.error = error;
    } finally {
      // this.loading = false;
    }
  },
};
</script>

<style scoped>
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