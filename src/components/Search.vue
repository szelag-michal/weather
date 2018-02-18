<template>
  <div class="card-container locations-search">
      <div class="card locations-search-form">
        <div class="col-left form-group">
          <input v-model="name" class="form-group-input" placeholder="Character Name" type="text" @input="onFetchLocation(name)" required  />
        </div>
        <div class="col-right form-group">
          <button class="form-group-btn btn-action">Search</button>
        </div>
      </div>
    
    <div class="card locations-search-list">
      <ul class="group-list">
        <li class="group-list-item" v-for="location in locations" :key="location.woeid" @click="onFetchForecast(payload = {'woeid': location.woeid, 'title': location.title})">{{location.title}}</li>
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
    'locations'
  ]),
  methods: {
    ...mapActions([
      'onFetchLocation',
      'onFetchForecast'
    ])
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/scss/variables';

  .locations-search {
    background: $navy-blue;
    .form-group {
      &-input {font-size: 1.2em;}
    }
     .btn-action {border-color:$yellow;}
  
    .group-list {padding-left: 0;}
    .group-list-item {
      list-style: none;font-family: $font-text;font-size: 1.2em;color: rgba($white,.3);padding: 0.5em 1em;
      &:active {color: $white;}
      }
    }


</style>
