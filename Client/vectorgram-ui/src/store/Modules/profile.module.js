import ProfileService from "../../services/profile/profile.service";
import Header from "../../services/users/header.service";

const userProfile = JSON.parse(localStorage.getItem('profile')) || null;

export const profile = {
  namespaced: true,
  state: {
    userProfile,
    profileInfo: null,
    searchResult: [],
    followStatus: false,
  },
  getters: {

  },
  mutations: {
    FOLLOW_STATUS(state, status) {
      state.followStatus = status;
    },
    SET_PROFILE(state, res) {
      state.profileInfo = res;
    
      // check if the profile has followers
      if(state.profileInfo.followers.count>0) {
        state.profileInfo.followers.users.forEach(
          follower_id => {
            state.followStatus = (Header.userId() == follower_id)
              ? false : true;
          }
        );
      }
    },
    SET_OWNER_PROFILE(state) {
      state.profileInfo = JSON.parse(localStorage.getItem('profile'));
    },
    SET_PROFILE_IMAGE(state, image) {
      state.profileInfo.avatar = image;
    },
    SET_SEARCH_RESULT(state, profiles) {
      state.searchResult = profiles;
    }
  },
  actions: {
    follow({ commit }, uid) {
      return ProfileService.follow(uid)
        .then(
          res => {
            commit('tools/SET_MESSAGE', res, {root:true});
            commit('FOLLOW_STATUS', res.status)
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            return Promise.reject(err);
          }
        )
    },
    getProfile({ commit }, uid) {
      return ProfileService.getProfile(uid)
        .then(
          res => {
            commit('SET_PROFILE', res);
            commit('tools/SET_LOADER', false, {root:true})
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            commit('tools/SET_LOADER', false, {root:true})           
            return Promise.reject(err);
          }
        )
    },
    getOwnerProfile({commit}) {
      commit('SET_OWNER_PROFILE');
      commit('tools/SET_LOADER', false, {root:true})      
    },
    changeProfileImage({commit}, image) {
      return ProfileService.changeProfileImage(image)
        .then(
          res => {
            commit('SET_PROFILE_IMAGE', res.avatar)
            commit('tools/SET_MESSAGE', res, {root:true});
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            return Promise.reject(err);
          }
        )
    },
    updateBio({commit}, data) {
      return ProfileService.updateBio(data)
        .then(
          res => {
            commit('tools/SET_MESSAGE', res, {root:true});
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            return Promise.reject(err);
          }
        )
    },
    searchProfile({commit}, user) {
      return ProfileService.searchProfile(user)
        .then(
          res => {
            commit('SET_SEARCH_RESULT', res);
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            return Promise.reject(err);
          }
        )
    }
  }
}