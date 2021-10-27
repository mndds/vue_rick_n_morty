<template>
  <v-app>

    <v-app-bar app>

      <v-app-bar-title>
        Rick and Morty DB
      </v-app-bar-title>

      <v-spacer/>

      <v-btn elevation='0' :to="{name: 'Characters'}">Characters</v-btn>
      <v-btn elevation='0' :to="{name: 'Locations'}">Locations</v-btn>
      <v-btn elevation='0' :to="{name: 'Episodes'}">Episodes</v-btn>

      <v-spacer/>

    </v-app-bar>

    <v-main app>
      <router-view :key="$route.fullPath"/>
    </v-main>



  </v-app>
</template>

<script>
export default {
  methods: {
    goto(page) {
      if (this.$route.name != page ) {
        this.$router.push({name: page});
      }
    }
  }
}
</script>
