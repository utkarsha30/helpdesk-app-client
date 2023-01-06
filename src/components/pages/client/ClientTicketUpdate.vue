<template>
  <div>
    <b-card class="mb-3 extra-css container my-4">
      <b-card-title>Ticket</b-card-title>
      {{ id }}
      {{ ticket }}
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ClientTicketUpdate",
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
};
</script>

<style>
</style>