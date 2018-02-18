import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

export const API_URL = `https://www.metaweather.com/api/`

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    locations: [],
    locationForecast: [],
    locationCoordinates: '',
    locationType: '',
    locationParent: [],
    locationSources: [],
    locationSunRise: '',
    locationSunSet: '',
    locationTime: '',
    locationTimezone: '',
    locationTimezoneName: '',
    locationTitle: '',
    locationWoeid: '',

    showSearch: false,
    showLocations: false,
    showDetails: false,
  },
  actions: {
    onDisplaySearch: (context, payload) => context.commit('displaySearch', payload),
    onDisplayLocations: (context, payload) => context.commit('displayLocations', payload),
  
    onFetchLocation ({ commit }, name) {
      const url = `${API_URL}location/search/?query=${name}`    
      axios.get(url)
        .then(response => commit('fetchLocations', { locations: response.data }))
        .catch(e => console.log(e))
    },
    onFetchForecast ({ commit }, payload) {
      const url = `${API_URL}location/${payload.woeid}`
      axios.get(url).then(function(response) {
        commit('fetchForecast', {forecast: response.data})
      }).catch(e => console.log(e))
    },
    onShowDetails: (context, payload) => context.commit('showDetails', payload)
  },
  mutations: {
    
    fetchLocations (state, { locations }) {
      state.locations = locations;
    },
    fetchForecast (state, { forecast }) {
      state.locationForecast = forecast.consolidated_weather;
      state.locationCoordinates = forecast.latt_long;
      state.locationType = forecast.location_type;
      state.locationParent = forecast.parent;  
      state.locationSources = forecast.sources;
      state.locationSunRise =  forecast.sun_rise;
      state.locationSunSet = forecast.sun_set;
      state.locationTime = forecast.time;
      state.locationTimezone = forecast.timezone;
      state.locationTimezoneName = forecast.timezone_name;
      state.locationTitle = forecast.title;
      state.locationWoeid = forecast.woeid;
      
      console.log(forecast);

      
      state.showSearch = false;
      state.showLocations = true;
    },
    RESET_LOCATION(state) {
      state.locations = []
    },
    displaySearch: (state, payload) => state.showSearch = payload,
    displayLocations: (state, payload) => state.showLocations = payload,
    showDetails: (state, payload) => state.showDetails = payload,
  },
  
  
  
  getters: {
    showLocations: state => state.showLocations,
    showSearch: state => state.showSearch,
    showDetails: state => state.showDetails,
    locations: state => state.locations.map(location => {
      return {          
        latt_long: location.latt_long,
        location_type: location.location_type,
        title: location.title,
        woeid: location.woeid,
      }
    }),
    locationForecast: state => state.locationForecast.map(e => {
      return {
        air_pressure: e.air_pressure,
        applicable_date: e.applicable_date,
        created: e.created,
        humidity: e.humidity,
        id: e.id,
        max_temp: parseInt(e.max_temp, 10),
        min_temp: parseInt(e.min_temp, 10),
        predictability: e.predictability,
        the_temp: e.the_temp,
        visibility: e.visibility,
        weather_state_abbr: e.weather_state_abbr,
        weather_state_name: e.weather_state_name,
        wind_direction: e.wind_direction,
        wind_direction_compass: e.wind_direction_compass,
        wind_speed: e.wind_speed
      }
    }),
    locationCoordinates: state => state.locationCoordinates,
    locationSources: state => state.locationSources,
    locationSunRise: state => state.locationSunRise,
    locationSunSet: state => state.locationSunSet,
    locationTime: state => state.locationTime,
    locationTimezone: state => state.locationTimezone,
    locationTimezoneName: state => state.locationTimezoneName,
    locationWoeid: state => state.locationWoeid,
    locationTitle: state => state.locationTitle,
    locationParent: state => state.locationParent,
    
  }
})