<template>
  <v-container>
    <h1 class="display-2 mt-5 mb-10">Locations List</h1>

    <div v-if="loading"></div>

    <div v-else-if="info != null && locations != null">

      <v-card>
        <v-list>  

          <v-list-item :to="{name: 'ShowLocation', params: {id: location.id}}" v-for="location in locations" :key="location.id">
            <v-list-item-content>
               {{ location.name }}, {{ location.type }}
            </v-list-item-content>
          </v-list-item>          
            
        </v-list>        
      </v-card>      

      <v-pagination class="mt-5" :total-visible="10" v-model="page" :length="info.pages" />

    </div>

    <div v-else>Server error</div>
  </v-container>
</template>

<script>
import http from "@/plugins/http";

export default {

  data: () => ({
    loading: false,
    info: null,
    locations: null,
    page: 1,
  }),
  mounted() {
    this.load();
  },
  watch: {
    page() {
      this.load();
    }
  },
  methods: {
    load() {
      this.loading = true;

      http
        .get(`location?page=${this.page}`)
        .then((response) => {
          this.info = response.data.info;
          this.locations = response.data.results;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changePage(newPage) {
      this.page = newPage;
    }
  },
};
</script>