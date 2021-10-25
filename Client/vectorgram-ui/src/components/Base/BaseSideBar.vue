<template>
  <div class="col-md-4">
    <!-- Search Widget -->

    <!-- Categories Widget -->
    <div class="card my-4 rounded">
      <h5 class="card-header">Categories</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-6">
            <ul class="list-unstyled mb-0">
              <li>
                <a href="#">#Test Category</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Side Widget -->
    <div class="card my-4 rounded">
      <h5 class="card-header">Side Widget</h5>
      <div class="card-body">
        <div @click="getSetting" class="text text-dark font-weight-bold cursor">
          Setting
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      getSetting() {
        this.$store.commit('tools/SET_LOADER', true)
        this.$router.push({ 
          name: 'Setting',
        })
      }
    }    
  }
</script>