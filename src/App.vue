<template>
  <b-container fluid="sm" class="container" id="app">
      <b-row>
          <b-col>
            <h1>Mapbox With Filters</h1>
          </b-col>
      </b-row>
      <b-row>
          <b-col>
            <sidebar-filter v-if="initialData" :initialData="initialData"></sidebar-filter>
          </b-col>
      </b-row>
      <b-row>
          <b-col>
            <geo-map v-if="initialData" :initialData="initialData"></geo-map>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import SidebarFilter from './components/SidebarFilter'
import GeoMap from './components/GeoMap'
import Axios from 'axios'

export default {
    name: 'App',
    components: {
        SidebarFilter,
        GeoMap
    },
    data() {
        return {
            initialData: null
        }
    },
    created() {
        //fetch the json data from the file
        Axios.get('https://bitbucket.org/idda/coding-challenges/raw/88be221f75a1b108c9e5f7222906b2735c147ac8/testBlob.json')
        .then(response => {
            (this.initialData = response.data)
        })
        .catch(error => {
            console.log(error.response)
        });
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
