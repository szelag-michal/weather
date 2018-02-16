import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    locations: []
  },
  
  mutations: {
    RECEIVE_LOCATIONS (state, { locations }) {
      state.locations = locations;
      console.log(locations);
    }
  },
  
  actions: {
    FETCH_LOCATIONS ({ commit }, name) {
      const url = `https://www.metaweather.com/api/location/search/?query=${name}`
      axios.get(url).then(function(response) {
        commit('RECEIVE_LOCATIONS', { locations: response.data })
      }).catch(e => console.log(e))
    }
  },
  
  getters: {
    locations: state => {
      return state.locations.map(location => {
        return {          
          latt_long: location.latt_long,
          location_type: location.location_type,
          title: location.title,
          woeid: location.woeid,
        }
      })
    }
  }
})