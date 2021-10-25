<template>
  <div class="pt-4 container" v-if="initialState.loggedIn">
    <ProfileHeader />
    <ProfilePostForm />
    <ProfilePosts />
  </div>  
</template>

<script>
  import ProfileHeader from "../Profile/ProfileHeader";
  import ProfilePostForm from "../Profile/ProfilePostForm";
  import ProfilePosts from "../Profile/ProfilePosts";
  import { mapState } from 'vuex';

  export default {
    name: 'BaseProfile',
    components: {
      ProfileHeader,
      ProfilePostForm,
      ProfilePosts
    },
    computed: {
      ...mapState('users', [
        'initialState'
      ])
    }
  }
</script>