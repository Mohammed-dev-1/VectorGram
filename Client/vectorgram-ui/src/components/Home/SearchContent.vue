<template>
  <div class="height-100 d-flex flex-column">
    <SearchForm />
    <UserContent 
      :profiles="searchResult" 
      v-if="searchResult[0]"
    />
    <div v-else class="text-center content-message">
      <h1 class="text text-dark fontstyle font-weight-bold">No result.</h1>
      <p @click="setLoader" class="h5 text text-primary cursor fontstyle font-weight-bold">Back to home ?</p>
    </div>
  </div>
</template>


<script>
import {mapState} from 'vuex'
import SearchForm from "./SearchForm"
import UserContent from "./UserContent"
export default {
  components: {
    SearchForm,
    UserContent
  },
  mounted() {
    this.$store.commit('tools/SET_LOADER', false);
  },
  computed: {
    ...mapState('profile', [
      'searchResult'
    ]),
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

<style scoped>
.content-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>