<template>
  <div>
    <div class="height-100 background-main overflow-hidden">
      <router-view :key="$route.fullpath" />
      <BaseAlert />
    </div>

    <BaseLoader v-if="loaderStatus" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState('tools', [
        'loaderStatus'
      ])
    }    
  }
</script>