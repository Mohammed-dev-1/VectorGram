import PostService from "../../services/posts/post.service";

export const posts = {
  namespaced: true,
  state: {
    posts: [],
    profilePosts: [],
    postContent: {},
  },
  getters: {},
  mutations: {
    GET_ALL_POSTS(state, res) {
      state.posts = res;
    },
    GET_PROFILE_POSTS(state, res) {
      state.profilePosts = res;
    },
    GET_POST_CONTENT(state, res) {
      state.postContent = res;
    },
  },
  actions: {
    getAllPosts({ commit }) {
      return PostService.getAllPosts()
        .then(
          res => {
            commit('GET_ALL_POSTS', res);
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
    getProfilePosts({ commit }, uid) {
      return PostService.getProfilePosts(uid)
        .then(
          res => {
            commit('GET_PROFILE_POSTS', res);
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            return Promise.reject(err);
          }
        )
    },
    getPostContent({ commit }, postId) {
      return PostService.getPostContent(postId)
        .then(
          res => {
            commit('tools/SET_LOADER', false, {root:true})
            commit('GET_POST_CONTENT', res);
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            commit('tools/SET_LOADER', false, {root:true})
            return Promise.reject(err);
          }
        )
    },
    createPost({ commit }, post) {
      return PostService.createPost(post)
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
    updatePost({ commit }, post, id) {
      return PostService.updatePost(post,id)
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
    deletePost({ commit }, postId) {
      return PostService.deletePost(postId)
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
    }
  }
}