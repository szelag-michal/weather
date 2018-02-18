<template>
  <div class="card-container locations">
      <div 
        class="card locations-item" 
        :class="'bg-'+locationForecast[0].weather_state_abbr"
        @click="onShowDetails(true)">

        <div class="col-left form-group">
          <span class="locations-item-title">{{locationTitle}}</span>
          <span class="locations-item-country">{{locationParent.title}}</span>
          <span class="locations-item-temperature">{{locationForecast[0].min_temp}} &deg;<sup>c</sup> - {{locationForecast[0].max_temp}} &deg;<sup>c</sup></span>
        </div>
        <div class="col-right form-group">
          <span class="location-weather-state-icon"><span class="icon" :class="'icon-'+locationForecast[0].weather_state_abbr"></span></span>
          <span class="location-weather-state-name">{{locationForecast[0].weather_state_name}}</span>
        </div>
        

      </div>
      <div class="card location-forecast-details" v-if="onShowDetails">
        <div class="col">{{locationSunRise}}</div>
        <div class="col">{{locationSunSet}}</div>
        <div class="col">{{locationTime}} {{locationTimezone}} {{locationTimezoneName}}</div>
        <div class="col">{{locationForecast[0].air_pressure}}</div>
        <div class="col">{{locationForecast[0].humidity}}</div>
        <div class="col">{{locationForecast[0].predictability}}</div>
        <div class="col">{{locationForecast[0].visibility}}</div>
        <div class="col">{{locationForecast[0].wind_direction}}</div>
        <div class="col">{{locationForecast[0].wind_direction_compass}}</div>
        <div class="col">{{locationForecast[0].wind_speed}}</div>
        <ul>
          <li v-for="fc in locationForecast" :key="fc.id">{{fc.the_temp}}</li>
        </ul>
      
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  
  data: function () {
    return {
      name: ''
    }
  },
  computed: mapGetters([
    'showDetails',
    'locations',
    'locationForecast',
    'locationCoordinates',
    'locationSources',
    'locationSunRise',
    'locationSunSet',
    'locationTime',
    'locationTimezone',
    'locationTimezoneName',
    'locationWoeid',
    'locationTitle',
    'locationParent'
  ]),
  methods: {
    ...mapActions([
      'onShowDetails'
    ])    
  }
}
</script>
<style lang="scss">
  @import '../assets/scss/variables';

  .locations-search {
    background: $navy-blue;
    .form-group {
      &-input {font-size: 1.2em;}
    }
    .group-list {padding-left: 0;}
    .group-list-item {
      list-style: none;font-family: $font-text;font-size: 1.2em;color: rgba($white,.3);padding: 0.5em 1em;
      &:active {color: $white;}
      }
    }
    .locations-item {color: $white;}
    .locations-item-title {font-size: 1.4em;display: block;}
    .locations-item-country {font-size: .7em;text-transform: uppercase;display: block;margin-bottom: 1em; }
    .locations-item-temperature {font-size: 1.6em;display: block;}
    .location-forecast-details {
      background: #222
    }
    .location-weather-state-name {text-align: center;}
    .col-right {display: flex;justify-content: center;flex-direction: column;align-items: center;}
    .icon {display: block;width: 2.5em;height: 2.5em;background-size:contain;background-repeat: no-repeat;background-position: center center;margin-bottom: .5em;}
    .icon-sn {background-image: url('../assets/img/icon-sn.svg');}
    .icon-sl {background-image: url('../assets/img/icon-sl.svg');}
    .icon-h {background-image: url('../assets/img/icon-h.svg');}
    .icon-t {background-image: url('../assets/img/icon-t.svg');}
    .icon-hr {background-image: url('../assets/img/icon-hr.svg');}
    .icon-lr {background-image: url('../assets/img/icon-lr.svg');}
    .icon-s {background-image: url('../assets/img/icon-s.svg');}
    .icon-hc {background-image: url('../assets/img/icon-hc.svg');}
    .icon-lc {background-image: url('../assets/img/icon-lc.svg');}
    .icon-c {background-image: url('../assets/img/icon-c.svg');}

</style>
