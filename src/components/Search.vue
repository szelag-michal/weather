<template lang="html">
  <div class="">
    {{saleProducts}}
    
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'projectList',
  computed: {
    saleProducts() {
      return this.$store.getters.saleProducts;
    }
  }
}
</script>

<style lang="scss">

</style>
