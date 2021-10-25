import CommentService from "../../services/comments/comment.service";

export const comments = {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    GET_COMMENTS(state, res) {
      state.comments = res;
    },
  },
  actions: {
    createComment({ commit }, content) {
      return CommentService.createComment(content)
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
    deleteComment({ commit }, commentId) {
      return CommentService.deleteComment(commentId)
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
    getComments({ commit }, postId) {
      return CommentService.getComments(postId)
        .then(
          res => {
            commit('GET_COMMENTS', res);
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