<template>
  <form class="input-group search-container" @submit.prevent="search">
    <input 
      type="text" 
      v-model="user" 
      class="form-control" 
      placeholder="Search for..."
    >
    <span class="input-group-btn ml-1">
      <button 
        :disabled="showSearch" 
        class="btn btn-primary" 
        type="submit"
      >
        <b-icon icon="search"></b-icon>
      </button>
    </span>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        user: ''
      }
    },
    computed: {
      showSearch() {
        return this.user ? false:true;
      }
    },
    methods: {
      search() {
        if(this.user) {
          const req = {
            user: this.user
          }
          this.$store.dispatch('profile/searchProfile', req);
        } 
      }
    }
  }
</script>

<style scoped>
.search-container {
  position: absolute;
  left: 10%;
  top: 30px;
  width: 80%;
}
input::placeholder {
  font-family: 'Ephesis', cursive;
  font-size: 1.3rem;
  font-weight: bold;
}

@media screen and (min-width: 768px){
  .search-container {
    left: 25%;
    width: 50%;
  }
}
</style>