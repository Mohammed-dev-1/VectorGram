<template>
  <div class="main-page">
    <b-alert
      :show="errCounter"
      dismissible
      fade
      :variant="errStatus"
    >
      {{errMessage}}
    </b-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
      ...mapState('tools',[
        'errMessage',
        'errStatus',
        'errCounter'
      ]),
    }
  }
</script>

<style>

</style>