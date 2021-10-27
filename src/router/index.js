import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CharactersList from '../views/CharactersList'
import ShowCharacter from '../views/ShowCharacter'
import LocationsList from '../views/LocationsList'
import ShowLocation from '../views/ShowLocation'
import EpisodesList from '../views/EpisodesList'
import ShowEpisode from '../views/ShowEpisode'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/characters',
    name: 'Characters',
    component: CharactersList,
  },
  {
    path: '/character/:id',
    name: 'ShowCharacter',
    component: ShowCharacter,
  },
  {
    path: '/locations',
    name: 'Locations',
    component: LocationsList,
  },
  {
    path: '/location/:id',
    name: 'ShowLocation',
    component: ShowLocation,
  },
  {
    path: '/episodes',
    name: 'Episodes',
    component: EpisodesList,
  },
  {
    path: '/episode/:id',
    name: 'ShowEpisode',
    component: ShowEpisode,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
