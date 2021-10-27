<template>
  <v-container>
    <h1 class="display-2 mt-5 mb-10">Episodes List</h1>

    <div v-if="loading"></div>

    <div v-else-if="info != null && episodes != null">

        <v-card>
            <v-list>
                 <v-list-item :to="{ name: 'ShowEpisode', params: { id: episode.id } }" v-for="episode in episodes" :key="episode.id"> 
                    <v-list-item-content>
                        {{ episode.episode }}, {{ episode.name }}          
                    </v-list-item-content>         
                </v-list-item>
            </v-list>
        </v-card>  

      <v-pagination
        class="mt-5"
        :total-visible="10"
        v-model="page"
        :length="info.pages"
      />
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
    episodes: null,
    page: 1,
  }),
  mounted() {
    this.load();
  },
  watch: {
    page() {
      this.load();
    },
  },
  methods: {
    load() {
      this.loading = true;

      http
        .get(`episode?page=${this.page}`)
        .then((response) => {
          this.info = response.data.info;
          this.episodes = response.data.results;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>