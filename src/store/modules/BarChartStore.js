const actions = {
};

const mutations = {
  SOCKET_CONNECT(state) {
    state.isConnected = true;
  },
  SOCKET_DISCONNECT(state) {
    state.isConnected = false;
  },
  SOCKET_messageChannel(state, message) {
    state.chartData.push(message);
  },
};

const getters = {
  isSocketConnected: state => state.isConnected,
};

const state = {
  isConnected: false,
  chartData: '',
};


export default {
  state,
  getters,
  actions,
  mutations,
};
