export const tools = {
  namespaced: true,
  state: {
    errMessage: '',
    errStatus: '',
    errCounter: 0,
    loaderStatus: true,
  },
  mutations: {
    SET_LOADER(state, status) {
      state.loaderStatus = status;
    },
    SET_MESSAGE(state, message) {
      switch (message.type) {
        case 'SUCCESS':
          state.errStatus = 'success'
          break;
        
        case 'DANGER':
          state.errStatus = 'danger'
          break;

        case 'WARNING':
          state.errStatus = 'warning'
          break;      
      }

      state.errMessage = message.message;
      state.errCounter = 5;

      setTimeout(()=> {
        state.errMessage = null;
        state.errStatus = null
        state.errCounter = 0;
      }, 5000);
    }
  },
}