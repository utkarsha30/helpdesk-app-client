<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <!-- @status fetch values emitted from child to parent use getStatus method to retrieve value -->
    <DashboardView
      :count="count"
      v-if="!loading && !error && count.length !== 0"
      @status="getStatus"
    ></DashboardView>
    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <TableView :tickets="tickets"></TableView>
    </b-card>
  </div>
</template>

<script>
// import ClientDashboard from "./ClientDashboard.vue";
import { getTicketsList, getTicketsCount } from "@/service/client";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import TableView from "@/components/utils/TableView.vue";
import DashboardView from "@/components/utils/DashboardView.vue";
export default {
  name: "ClientTickets",
  components: {
    TableView,
    LoadingIcon,
    DashboardView,
  },
  data() {
    return {
      tempTickets: [],
      tickets: [],
      count: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    // here value sent from child is fetched
    getStatus(value) {
      const temp = this.tempTickets;
      this.tickets = temp.filter((ticket) => ticket.status === value);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      const client = await getTicketsList(this.$store.state.auth.id);
      this.tickets = client.tickets;
      this.tempTickets = client.tickets;
      const count = await getTicketsCount(this.$store.state.auth.id);
      this.count = count;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
</style>