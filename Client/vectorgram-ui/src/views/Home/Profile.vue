<template>
  <BaseProfile v-if="!loaderStatus" />
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState('tools', [
        'loaderStatus'
      ])
    },
    watch: {
      // Handle id of user to get profile data
      '$route.params.id': {
        handler: function(id) {
          this.$store.dispatch('profile/getProfile', id)
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>