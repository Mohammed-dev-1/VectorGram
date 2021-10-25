<template>
  <section>
    <div v-for="profile in profiles" :key="profile.id" class="d-flex row border-bottom mt-3">
      <div class="col-md-1 col-2">
        <img 
          :src="showImage(profile.avatar)" 
          class="rounded-circle border border-dark" 
          height="60" 
          width="60"
        >
      </div>
      <div class="col ml-2">
        <div>
          <div class="d-flex">
            <h4>
              <router-link class="text text-dark" :to="{ name: 'Profile', params: { id: profile.id }}">
                {{profile.name}}
              </router-link>
            </h4>
            <!-- <b-icon 
              @click="follow(profile.id)"
              v-if="true"
              class="mt-2 ml-3 cursor" 
              scale="1.2" 
              variant="primary" 
              icon="person-plus"
            ></b-icon> -->
          </div>
          <p class="opacity">{{showDescription(profile.description)}}</p>
        </div>
      </div>
    </div>

    <p @click="setLoader" class="h5 text text-primary mt-4 cursor fontstyle font-weight-bold">Back to home ?</p>
  </section>
</template>

<script>
export default {
  props: ['profiles'],
  methods: {
    follow(uid) {
      // follow and unfollow method
      this.$store.dispatch('profile/follow', uid);
    },
    showImage(avatar) {
      return avatar ?
        avatar :
        require('../../assets/Images/avatar3.png')
    },
    showDescription(text) {
      return text ?
        text :
        'There is no description in this profile.'
    },
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
section {
  width: 50%;
  margin: 90px auto;
}
.opacity {
  opacity: .5;
}
@media screen and (max-width: 768px){
  section {
    width: 80%;
    margin: 90px auto;
  }   
}
</style>