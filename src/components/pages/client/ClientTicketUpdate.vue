<template>
  <div>
    <b-card class="mb-3 extra-css container my-4">
      <b-card-title>Ticket</b-card-title>
      {{ ticket._id }}
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ClientTicketUpdate",
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>