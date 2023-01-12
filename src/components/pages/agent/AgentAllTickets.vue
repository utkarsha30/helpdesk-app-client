<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <DashboardView
      :count="count"
      v-if="!loading && !error && count.length !== 0"
    ></DashboardView>

    <b-card v-if="!loading && !error" class="mb-3 extra-css container my-4">
      <TableView :tickets="tickets"></TableView>
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
      tickets: [],
      loading: false,
      error: null,
      count: [],
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const agent = await getEmployeeAllTicktes(this.$store.state.auth.id);
      this.tickets = agent.tickets;
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