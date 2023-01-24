<template>
  <div>
    <loading-icon v-if="loading"></loading-icon>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error.message }}
    </div>
    <b-card
      v-if="!loading && !error && faqs.length !== 0"
      class="mb-3 extra-css container my-4"
    >
      <b-card-title>All FAQ List</b-card-title>
      <table id="no-more-tables" class="text-center">
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Faq Question</th>
            <th>Faq Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(faq, index) in faqs" :key="faq._id">
            <td data-title="Sr.no">{{ index + 1 }}</td>
            <td data-title="Faq Question">{{ faq.question }}</td>
            <td data-title="Faq Answer">
              {{ faq.answer }}
            </td>
            <td data-title="Action">
              <router-link
                :to="{
                  name: `admin-faq-update`,
                  params: {
                    id: faq._id,
                    faq,
                  },
                }"
                class="mr-1"
                exact-active-class="active"
              >
                <b-button pill class="m-2" v-b-tooltip.hover title="Edit FAQ">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
              </router-link>
              <b-button
                pill
                variant="danger"
                class="m-2"
                v-b-tooltip.hover
                title="Delete FAQ"
                @click="deleteCurrentFAQ(faq._id, index)"
              >
                <b-icon icon="trash-fill " aria-hidden="true"></b-icon>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import LoadingIcon from "@/components/pages/LoadingIcon.vue";
import { getAllFaqs, deleteFaq } from "@/service/faq";
export default {
  name: "AdminFaqList",
  data() {
    return {
      loading: false,
      error: null,
      faqs: [],
      temp: null,
    };
  },
  components: {
    LoadingIcon,
  },
  methods: {
    async deleteCurrentFAQ(id, index) {
      this.loading = true;
      try {
        const deletedFAQ = await deleteFaq(id);
        if (deletedFAQ) {
          this.temp = index + 1;
          this.faqs.splice(index, 1);
          Vue.$toast.open({
            message: `FAQ '${this.temp}' deleted`,
            type: "success",
            position: "top-right",
          });
        }
      } catch (error) {
        Vue.$toast.open({
          message: error.response.data,
          type: "error",
          position: "bottom",
        });
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    this.faqs = await getAllFaqs();
  },
};
</script>

<style scoped>
#no-more-tables tbody tr:hover {
  background-color: #f8edf5;
}
#no-more-tables thead {
  border-top: 1px solid #ddd;
}
#no-more-tables {
  border-collapse: collapse;
  width: 100%;
}

#no-more-tables td,
#no-more-tables th {
  border-bottom: 1px solid #ddd;
  padding-right: 2px;
  padding-top: 12px;
  padding-bottom: 12px;
}
@media only screen and (max-width: 800px) {
  /* Force table to not be like tables anymore */
  #no-more-tables table,
  #no-more-tables thead,
  #no-more-tables tbody,
  #no-more-tables th,
  #no-more-tables td,
  #no-more-tables tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  #no-more-tables thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  #no-more-tables tr {
    border: 1px solid #ccc;
  }

  #no-more-tables td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    white-space: normal;
    text-align: left;
  }

  #no-more-tables td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }

  /*
	Label the data
	*/
  #no-more-tables td:before {
    content: attr(data-title);
  }
}
.btn-secondary {
  background-color: #ed0a71 !important;
  border-color: #f0036e;
}
.btn-secondary:hover {
  background-color: #ec599b !important;
  border-color: #f0036e;
}
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
</style>