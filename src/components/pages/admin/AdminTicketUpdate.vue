<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="!this.ticket">
      No ticket selected
    </div>
    <TicketUpdateView
      v-if="!loading && !error && this.ticket"
      :categories="categories"
      :id="id"
      :ticket="ticket"
    ></TicketUpdateView>
  </div>
</template>

<script>
import { getAllCategories } from "@/service/categories";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import TicketUpdateView from "@/components/utils/TicketUpdateView.vue";
export default {
  name: "AdminTicketUpdate",
  components: {
    LoadingIcon,
    TicketUpdateView,
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
      loading: false,
      error: null,
      categories: [],
    };
  },
  async mounted() {
    const categories = await getAllCategories();
    this.categories = categories;
  },
};
</script>

<style>
</style>