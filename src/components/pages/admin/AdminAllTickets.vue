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
import { getAllTickets, getAdminTicketsCount } from "@/service/admin";
import TableView from "@/components/utils/TableView.vue";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import DashboardView from "@/components/utils/DashboardView.vue";
export default {
  name: "AdminAllTickets",
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
  },
  async mounted() {
    this.loading = true;
    try {
      const alltickets = await getAllTickets();
      this.tickets = alltickets;
      this.tempTickets = alltickets;
      const count = await getAdminTicketsCount();
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
</style>