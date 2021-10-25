<template>
  <b-nav-item-dropdown right no-caret>
    <template #button-content>
        <div class="">
          <img :src="showAvatar" class="rounded-circle border border-dark" height="40" width="40">
          <span class="mt-3 ml-2 font-weight-bold d-md-none">
            {{initialState.user.username}}            
          </span>
        </div>
    </template>    
    <div @click="setLoader">
      <b-dropdown-item>
        <b-icon icon="person-fill" size="1"></b-icon>
        Profile
      </b-dropdown-item>
    </div>
    <div @click="getSetting">
      <b-dropdown-item>
        <b-icon icon="gear-fill" size="1"></b-icon>
        Setting
      </b-dropdown-item>
    </div>

    <b-dropdown-item @click="logout">
      <b-icon icon="box-arrow-left" size="1"></b-icon>
      Logout
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'NavUserItem',
    computed: {
      ...mapState('users',[
        'initialState'
      ]),
      ...mapState('profile', [
        'userProfile'
      ]),
      showAvatar() {
        return this.userProfile.avatar ?
          this.userProfile.avatar : 
          require('../../assets/Images/avatar3.png') 
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('users/logout')
          .then(()=> this.$router.push({ name: 'Login' }))
      },
      setLoader() {
        this.$store.commit('tools/SET_LOADER', true)
        this.$router.push({ 
          name: 'Profile',
          params: { id: this.initialState.user.id }
        })
      },
      getSetting() {
        this.$store.commit('tools/SET_LOADER', true)
        this.$router.push({ 
          name: 'Setting',
        })
      }
    }      
  }
</script>