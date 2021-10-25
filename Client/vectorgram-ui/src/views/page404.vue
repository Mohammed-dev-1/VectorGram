<template>
  <div class="center-items height-100">
    <div>
      <h1 class="text text-danger">Sorry page not found ):</h1>
      <p @click="setLoader" class="text text-dark cursor">Back to home ?</p>
    </div>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      this.$store.commit('tools/SET_LOADER', false);
    },
    methods: {
      setLoader() {
        this.$store.commit('tools/SET_LOADER', true)
        this.$router.push({
          name: 'Posts'
        })
      }
    }    
  }
</script>