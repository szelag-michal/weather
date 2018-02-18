<template>
  <div class="container">
    <app-search v-if="showSearch"></app-search>
    <app-locations v-if="showLocations"></app-locations>
    <div class="footer gradient-white">
      <a href="#" class="btn btn-add"></a>
      <a href="#" class="btn btn-action" @click.prevent="onDisplaySearch(true)"></a>
    </div>
  </div>
</template>

<script>
import Search from "./components/Search.vue";  
import Locations from "./components/Locations.vue";  
import { mapGetters, mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions([
      'onDisplaySearch'
    ])
  },
  computed: {
    ...mapGetters([
      'showLocations',
      'showSearch'
    ])
  },
  components: {
    'app-search': Search,
    'app-locations': Locations,
  }

}
</script>

<style lang="scss">
@import './assets/scss/variables';

  .form-group {
    &-input {background: 0;border: 0;border-bottom: solid 1px darken($navy-blue,10);padding: 1em;color: $white;font-weight: bold}
  }
  .btn {
    &-action {text-indent: -9999em;width: 2em;height: 2em;display: block;border-radius: 2em;background: transparent;border: solid .5em $dark;}
  }
  .footer {position: fixed;bottom:0;left:0;width:100%;background: $navy-blue;padding: 1em;display: flex;justify-content: flex-end;}
</style>
