<template>
  <div v-if="mustLoad">

    <h3>Characters</h3>

    <div v-if="loading">
    </div>
    
    <div v-else-if="characters != null && characters.length > 0">
        <character-card-list :characters="characters"/>
    </div>

    <div v-else>
      There is no characters.
    </div>

  </div>
</template>

<script>
import http from '@/plugins/http'
import CharacterCardList from './CharacterCardList.vue'
export default {
  components: {CharacterCardList},
  props: ["urls"],
  data: () => ({
    characters: null,
    loading: false,
  }),
  computed: {
    mustLoad() {
      return this.urls && this.urls.length > 0;
    },
    ids() {
      return this.urls.map(url => url.split('/').pop());
    }
  },
  mounted() {
    if (this.mustLoad) {
      this.load();
    }
  },
  methods: {
    load() {
      this.loading = true;
      const ids = this.ids.join(',');
      http.get(`character/${ids}`)
        .then(response => this.characters = response.data)
        .finally(() => this.loading = false);
    }
  },
};
</script>