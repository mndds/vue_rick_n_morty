<template>
  <v-row>

    <v-col cols="3" v-for="character in characters" :key="character.id">
        <character-card :character="character" />
    </v-col>

    </v-row>
</template>

<script>
import CharacterCard from '@/components/CharacterCard.vue'

export default {
    components:  {CharacterCard },
    props: ['characters'],


}
</script>

<style>

</style>