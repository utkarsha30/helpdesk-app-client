<template>
  <div class="row my-5 mx-3">
    <!-- v-if = "count[1]" -->
    <div v-for="details in count" :key="details._id" class="col-sm mb-2">
      <b-card class="extra-css">
        <div class="row">
          <div class="col">
            <h5 class="card-title text-uppercase text-muted mb-0">
              {{ details._id }} Tickets
            </h5>
            <span class="h2 font-weight-bold mb-0">{{ details.count }}</span>
          </div>
          <div class="col-auto">
            <div
              :class="iconColor(details._id)"
              class="icon icon-shape text-white rounded-circle"
            >
              <img
                src="../../assets/images/ticket.png"
                class="custome-css"
                alt="ticket icon"
              />
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  props: {
    count: {
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
  methods: {
    iconColor(status) {
      if (status === "closed") {
        return "bg-success";
      }
      if (status === "open") {
        return "bg-danger";
      }
      if (status === "pending") {
        return "bg-yellow";
      }
      if (status === "processing") {
        return "bg-primary";
      }
    },
  },
};
</script>

<style scoped>
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}

.col-auto {
  width: auto;
  max-width: none;
  flex: 0 0 auto;
}
.font-weight-bold {
  font-weight: 600 !important;
}
.text-muted {
  color: #8898aa !important;
}
.text-uppercase {
  text-transform: uppercase !important;
}
.custome-css {
  width: 46px;
}
.rounded-circle {
  border-radius: 50% !important;
}
.text-white {
  color: #fff !important;
}

a.text-white:hover,
a.text-white:focus {
  color: #e6e6e6 !important;
}
.text-nowrap {
  white-space: nowrap !important;
}
.text-warning {
  color: #fb6340 !important;
}

.card-body {
  padding: 1.5rem;
  flex: 1 1 auto;
}

.card-title {
  margin-bottom: 1.25rem;
}
.icon {
  width: 3rem;
  height: 3rem;
}
.icon-shape {
  display: inline-flex;
  padding: 12px;
  text-align: center;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}
h2,
h5,
.h2,
.h5 {
  font-family: inherit;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  color: #32325d;
}
h5,
.h5 {
  font-size: 0.8125rem;
}
.bg-yellow {
  background-color: #ffd600 !important;
}
</style>