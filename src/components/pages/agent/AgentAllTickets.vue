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
      <TableView :tickets="tickets" @priority="getPriority"></TableView>
    </b-card>
  </div>
</template>

<script>
import DashboardView from "@/components/utils/DashboardView.vue";
import TableView from "@/components/utils/TableView.vue";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import { getEmployeeAllTicktes, getAgentTicketsCount } from "@/service/agent";
export default {
  name: "AgentAllTickets",
  components: {
    TableView,
    LoadingIcon,
    DashboardView,
  },
  data() {
    return {
      tempTickets: [],
      tickets: [],
      loading: false,
      error: null,
      count: [],
    };
  },
  methods: {
    // here value sent from child is fetched
    getStatus(value) {
      const temp = this.tempTickets;
      this.tickets = temp.filter((ticket) => ticket.status === value);
    },
    getPriority(value) {
      const temp = this.tempTickets;
      this.tickets = temp.filter((ticket) => ticket.priority === value);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      const agent = await getEmployeeAllTicktes(this.$store.state.auth.id);
      this.tickets = agent.tickets;
      this.tempTickets = agent.tickets;
      const count = await getAgentTicketsCount(this.$store.state.auth.id);
      this.count = count;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
</style>