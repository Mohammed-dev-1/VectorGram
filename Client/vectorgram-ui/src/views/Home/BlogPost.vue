<template>
  <BaseBlogPost v-if="!loaderStatus" />
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
      '$route.params.id': {
        handler: function(id) {
          this.$store.dispatch('posts/getPostContent', id);
        },
        deep: true,
        immediate: true
      }
    },
  }
</script>