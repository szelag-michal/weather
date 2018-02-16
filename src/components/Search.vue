<template>
  <div class="search-character__form">
    <form @submit.prevent
      @submit="handleSearch()">

      <div class="ui action input">
        <input v-model="name"
          placeholder="Character Name"
          type="text"
          required />

          <button class="ui icon pink button">
            <i class="search icon"></i>
          </button>
      </div>
    </form>
    {{locations}}
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
    'locations'
  ]),
  methods: {
    handleSearch () {
      this.$store.dispatch('FETCH_LOCATIONS', this.name)
    }
  }
}
</script>