import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
export const API_URL = `https://www.metaweather.com/api/`

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    locations: [],
    forecast: [],
    time: '',
    sun_rise: '',
    sun_set: '',
    timezone_name: ''
  },
  
  mutations: {
    RECEIVE_LOCATIONS (state, { locations }) {
      state.locations = locations;
      console.log(locations);
    },
    RECEIVE_FORECAST (state, { forecast }) {
      state.forecast = forecast.consolidated_weather;
      state.time = forecast.time;
      state.sun_rise = forecast.sun_rise;
      state.sun_set = forecast.sun_set;
      state.timezone_name = forecast.timezone_name;
      console.log(forecast);
    },
    RESET_LOCATION(state) {
      state.locations = []
    }
  },
  
  actions: {
    FETCH_LOCATIONS ({ commit }, name) {
      const url = `${API_URL}location/search/?query=${name}`
      axios.get(url).then(function(response) {
        commit('RECEIVE_LOCATIONS', { locations: response.data })
      }).catch(e => console.log(e))
    },
    FETCH_FORECAST ({ commit }, woeid) {
      const url = `${API_URL}location/${woeid}`
      axios.get(url).then(function(response) {
        commit('RECEIVE_FORECAST', { forecast: response.data })
      }).catch(e => console.log(e))
    },
    
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
    },
    forecast: state => {
      return state.forecast.map(result => {
        return {          
          weather_state_name: result.weather_state_name,
          weather_state_abbr: result.weather_state_abbr,
          wind_direction_compass: result.wind_direction_compass,
          created: result.created,
          applicable_date: result.applicable_date,
          min_temp: result.min_temp,
          max_temp: result.max_temp,
          the_temp: result.the_temp,
          wind_speed: result.wind_speed,
          wind_direction: result.wind_direction,
          air_pressure: result.air_pressure,
          humidity: result.humidity,
          visibility: result.visibility,
          predictability: result.predictability
        }
      })
    }
  }
})