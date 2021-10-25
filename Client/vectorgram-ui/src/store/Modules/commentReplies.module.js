import ReplyService from "../../services/replies/reply.service";

export const commentReplies = {
  namespaced: true,
  state: {
    replies: [],
  },
  mutations:{
    GET_REPLIES(state, res) {
      state.replies = res;
    },
  },
  actions:{
    createReply({ commit }, reply) {
      return ReplyService.createReply(reply)
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
    deleteReply({commit}, id) {
      return ReplyService.deleteReply(id)
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
    getReplies({ commit }, commentId) {
      return ReplyService.getReplies(commentId)
        .then(
          res => {
            commit('GET_REPLIES', res);
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