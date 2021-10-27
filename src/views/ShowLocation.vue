<template>
  <v-container>
    <div v-if="loading"></div>

    <div v-else-if="location != null">
      <h1 class="display-2 mt-5 mb-10">{{ location.name }}</h1>

      <v-card width="300px" class="mb-5">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Type</v-list-item-subtitle>
              {{ location.type }}
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>Dimension</v-list-item-subtitle>
              {{ location.dimension }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <characters-sub-list :urls="location.residents" />
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
    location: null,
  }),
  mounted() {
    this.load();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    load() {
      this.loading = true;

      http
        .get(`location/${this.id}`)
        .then((response) => {
          this.location = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>