<template>
  <v-container>
    <div v-if="loading"></div>

    <div v-else-if="character != null">

        <h1 class="mt-5 mb-10 display-2">{{ character.name }}</h1>

        <v-card>
          <div class="d-flex">
              <v-img :src="character.image"/>

              <v-card-text>
                <div class="text-caption">Species</div>
                <div>{{character.species}}</div>

                <div class="text-caption">Status</div>
                <div>{{character.status}}</div>

                <div class="text-caption">Gender</div>
                <div>{{character.gender}}</div>
              </v-card-text>

          </div>
        </v-card>

    </div>

    <div v-else>Not found</div>
  </v-container>
</template>

<script>
import http from "@/plugins/http";

export default {
  data: () => ({
    loading: false,
    character: null,
  }),
  mounted() {
    this.load();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    locationId() {

      if (!this.character.location) {
        return null;
      }

      const url = this.character.location.url;
      return url.split('/').pop();
    }
  },
  methods: {
    load() {
      this.loading = true;

      http
        .get(`character/${this.id}`)
        .then((response) => {
          this.character = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>