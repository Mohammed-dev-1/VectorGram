<template>
  <b-nav-form>
      <b-form-input 
        v-model="searchInput"
        size="sm" 
        class="mr-sm-2" 
        placeholder="Search"
      ></b-form-input>
      <b-button 
        :disabled="DisabledSearch"
        size="sm" 
        class="bg-primary my-2 my-sm-0" 
        type="submit"
      >Search</b-button>
  </b-nav-form>
</template>

<script>
  export default {
    name: 'BaseNavSearch',
    data: ()=> ({
      searchInput: '',
    }),
    computed: {
      DisabledSearch() {
        return !this.searchInput;
      }
    }    
  }
</script>