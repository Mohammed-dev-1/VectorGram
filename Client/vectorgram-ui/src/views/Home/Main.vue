<template>
  <!-- main page  -->
  <div class="VectorGram">
    <BaseNav v-if="!loaderStatus" />

    <!-- start main page content -->
    <div class="container height-100">
      
      <!-- start main home page content -->
      <div class="container">
        <div class="row">
      
          <!-- start posts here -->      
          <div class="col-md-8">
            <router-view :key="$route.fullpath" />
          </div>
          <!-- end posts here -->      

          <BaseSideBar />
        </div>
      </div>

      <!-- end main home page content -->
    </div>
    <!-- end main page content -->

    <BaseFooter v-if="!loaderStatus" />
  </div>
  <!-- end main page -->
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