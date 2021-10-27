<template>
  <v-card>
    <v-img class="align-end" :src="character.image" >

    <v-card-title class="py-3" style="background: rgba(255,255,255,0.9)">
      {{ character.name }}
      <v-badge :color="badgeColor" v-if="character.status" inline class="mb-1">
        <template #badge>{{ character.status }}</template>
      </v-badge>
    </v-card-title>

    </v-img>

    <v-list>   

        <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle>Gender</v-list-item-subtitle>
                {{ character.gender }}
            </v-list-item-content>
        </v-list-item>

        <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle>Species</v-list-item-subtitle>
                {{ character.species }}
            </v-list-item-content>
        </v-list-item>
      
        <v-list-item :to="toLocation">
            <v-list-item-content>
                <v-list-item-subtitle>Location</v-list-item-subtitle>
                {{ character.location.name }}
            </v-list-item-content>
        </v-list-item>

        <v-list-item :to="toOrigin">
            <v-list-item-content>
                <v-list-item-subtitle>Origin</v-list-item-subtitle>
                {{ character.origin.name }}
            </v-list-item-content>
      </v-list-item>

    </v-list>

  </v-card>
</template>

<script>
export default {
  props: ["character"],
  computed: {
    badgeColor() {
      switch (this.character.status) {
        case "Alive":
          return "success";
        case "Dead":
          return "red";
        case "unknown":
          return "secondary";
        default:
          return null;
      }
    },
    toLocation() {
        return this.generateTo(this.character.location);
    },
    toOrigin() {
        return this.generateTo(this.character.origin);
    }
  },
  methods: {
      generateTo(location) {
          if (!location || location.name === 'unknown') {
              return null;
          }

          const id = location.url.split('/').pop();

          if (this.$route.name == 'ShowLocation' && this.$route.params.id == id) {
            return null;
          }
          return {
              name: 'ShowLocation',
              params: {
                  id,
              }
          }

      }
  }
};
</script>

<style>
</style>