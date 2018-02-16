<template>
  <div class="search-character__form">
    <form>

      <div class="ui action input">
        <input v-model="name"
          placeholder="Character Name"
          type="text"
          @input="handleLocation()"
          required 
          />
      </div>
    </form>
    <ul >
      <li v-for="location in locations" :key="location.woeid" @click="handleForecast(location.woeid)">{{location.title}}</li>
    </ul>
    {{time}}
    {{forecast}}

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  
  data: function () {
    return {
      name: ''
    }
  },
  computed: mapGetters([
    'locations',
    'forecast',
    'time'
  ]),
  methods: {
    handleLocation() {
      if(this.name != '') {
        this.$store.dispatch('FETCH_LOCATIONS', this.name)
      } else {
        this.$store.commit('RESET_LOCATION')
      }
    },
    handleForecast(e) {
      this.$store.dispatch('FETCH_FORECAST', e)
    }
  }
}
</script>