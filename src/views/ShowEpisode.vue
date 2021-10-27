<template>
  <v-container>
    <div v-if="loading"></div>

    <div v-else-if="episode != null">
      <h1 class="display-2 mt-5 mb-10">{{ episode.name }}</h1>

      <v-card width="300px" class="mb-5">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Episode</v-list-item-subtitle>
              {{ episode.episode }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Air date</v-list-item-subtitle>
              {{ episode.air_date }}
            </v-list-item-content>
          </v-list-item>
           

          
        </v-list>
      </v-card>

      <characters-sub-list :urls="episode.characters" />
    </div>

    <div v-else>Not found</div>
  </v-container>
</template>

<script>
import http from "@/plugins/http";
import CharactersSubList from "../components/CharatersSubList";

export default {
  components: { CharactersSubList },
  data: () => ({
    loading: false,
    episode: null,
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.loading = true;

      http
        .get(`episode/${this.id}`)
        .then((response) => {
          this.episode = response.data;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
