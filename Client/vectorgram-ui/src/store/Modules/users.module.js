import AuthService from "../../services/users/auth.service";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = 
  user ? {
    loggedIn: true,
    user
  } : {
    loggedIn: false,
    user: null
  }

export const users = {
  namespaced: true,
  state: {
    initialState,
  },
  getters: {},
  mutations: {
    SET_USER(state, res) {
      state.initialState.loggedIn = true;
      state.initialState.user = res.data;
    },
    REMOVE_USER(state) {
      state.initialState.loggedIn = false;
      state.initialState.user = null;
    }
  },
  actions: {
    register({ commit }, user) {
      return AuthService.register(user)
        .then(
          res => {
            commit('tools/SET_MESSAGE', res, {root:true});
            commit('SET_USER', res);
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            return Promise.reject(err);
          }
        ) 
    },
    login({ commit }, user) {
      return AuthService.login(user)
        .then(
          res => {
            commit('tools/SET_MESSAGE', res, {root:true});
            commit('SET_USER', res);
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            return Promise.reject(err);
          }
        ) 
    },
    logout({ commit }) {
      return AuthService.logout()
        .then(
          res => {
            commit('tools/SET_MESSAGE', res, {root:true});
            commit('REMOVE_USER');
            return Promise.resolve(res);
          },
          err => {
            commit('tools/SET_MESSAGE', err, {root:true});
            return Promise.reject(err);
          }
        ) 
    },
  }
}