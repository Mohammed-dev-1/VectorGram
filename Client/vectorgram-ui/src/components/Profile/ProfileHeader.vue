<template>
  <div class="row shadow-sm p-4 d-flex align-items-center">
    <div class="col-md-3 d-flex justify-content-center align-items-center">
        <div class="profile-image-container">
          <img 
            class="rounded-circle border border-dark" 
            height="150" 
            width="150" 
            :src="avatar" 
            alt="Profile Image"
          >
          <div @click="profileImage" v-if="!showButton" class="profile-image center-items cursor">
            <b-icon icon="camera" scale="1.2" aria-hidden="true"></b-icon>
          </div>
        </div>
    </div>
    <div class="col-md pl-3 align-items-center">
      <div class="profile-subtitle">
        <h1 class="text text-dark">{{profileInfo.profile_name}}</h1>
      </div>
      <div class="row pl-2 pb-4">
          <div class="col text-align-center">
              <span class="font-weight-bold">{{profileInfo.posts}}</span>
              <p class="font-weight-bold text text-dark">Post</p>
          </div>
          <div class="col text-align-center">
              <span class="font-weight-bold">{{profileInfo.followers.count}}</span>
              <p class="font-weight-bold text text-dark">Followers</p>
          </div>
          <div class="col text-align-center">
              <span class="font-weight-bold">{{profileInfo.following.count}}</span>
              <p class="font-weight-bold text text-dark">Following</p>
          </div>
      </div>
      <div class="d-flex pl-2 pb-4 profile-button" v-if="showButton">
        <form @submit.prevent="follow">
            <button 
              class="mr-2 btn btn-primary" 
              type="submit"
            >{{followStatus ? 'UNFOLLOW':'FOLLOW'}}</button>
        </form>
        <button class="btn btn-dark" type="submit">MESSAGE</button>
      </div>
      <div class="d-flex pl-2 flex-column">
        <div class="text text-dark">
          <span class="font-weight-bold">Description: </span>
           {{profileInfo.description||defaultDes}}
        </div>
        <div class="text text-dark pt-1">
          <span class="font-weight-bold">Website: </span>
           <a href="#" v-if="profileInfo.url">{{profileInfo.url}}</a>
           <span v-else>{{defaulturl}}</span>
        </div>
      </div>
    </div>

    <ProfileModal 
      :status="profileModalStatus"
    />
  </div>
</template>

<script>
  import ProfileModal from "./ProfileModal";
  import { mapState } from 'vuex';
  
  export default {
    data() {
      return {
        profileModalStatus: false,
        defaultDes: 'This profile does not have description.',
        defaulturl: 'This profile does not have webSite.',
      }
    },
    components: {
      ProfileModal
    },
    computed: {
      ...mapState('profile', [
        'followStatus',
        'profileInfo'
      ]),
      ...mapState('users', [
        'initialState'
      ]),
      showButton() {
        return (this.profileInfo.user_id == this.initialState.user.id)
          ? false : true;
      },
      avatar() {
        return this.profileInfo.avatar ? 
          this.profileInfo.avatar :
          require('../../assets/Images/avatar3.png') 
      }
    },
    methods: {
      follow() {
        // to get id of user 
        let uid = this.$route.params.id;
        // follow and unfollow method
        this.$store.dispatch('profile/follow', uid);
      },
      profileImage() {
        this.profileModalStatus = !this.profileModalStatus;
      }
    },
  }
</script>

<style scoped>
@import "./profile.css";
</style>