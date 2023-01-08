<template>
  <div>
    Comment
    {{ id }}
    {{ ticket }}
  </div>
</template>

<script>
export default {
  name: "ClientAddcomment",
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