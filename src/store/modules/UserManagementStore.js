import userMngmntService from '@/services/user_management';

const actions = {
  LOAD_USER_LIST: ({ commit }) => {
    commit('UPDATE_ASYNC_INFO_PENDING');
    userMngmntService.getUsers().then((response) => {
      commit('UPDATE_ASYNC_INFO_SUCCESS', '');
      commit('SET_USER_LIST', { list: response.data.result });
    }, (error) => {
      commit('UPDATE_ASYNC_INFO_FAILURE', error.message);
    });
  },
  ADD_USER: ({ commit }, formData) => {
    commit('UPDATE_ASYNC_INFO_PENDING');
    userMngmntService.registerUser(formData).then((response) => {
      commit('UPDATE_ASYNC_INFO_SUCCESS', { message: response.data.message });
      commit('ADD_USER', { user: response.data.user });
    }).catch((error) => {
      commit('UPDATE_ASYNC_INFO_FAILURE', { message: error.data.message });
    });
  },
  SORT_USERS: ({ commit }, users) => {
    commit('SORT_USERS', { list: users });
  },
};

const mutations = {
  SET_USER_LIST: (state, { list }) => {
    state.users = list;
  },
  ADD_USER: (state, { user }) => {
    state.users.push(user);
  },
  UPDATE_USER: (state, { item }) => {
    const idx = state.users.map(p => p.id).indexOf(item.id);
    state.users.splice(idx, 1, item);
  },
  UPDATE_ASYNC_INFO_SUCCESS: (state, { message }) => {
    state.ASYNC_INFO.SUCCESS = true;
    state.ASYNC_INFO.PENDING = false;
    state.ASYNC_INFO.FAILURE = false;
    state.ASYNC_INFO.MESSAGE = message;
  },
  UPDATE_ASYNC_INFO_PENDING: (state) => {
    state.ASYNC_INFO.SUCCESS = false;
    state.ASYNC_INFO.PENDING = true;
    state.ASYNC_INFO.FAILURE = false;
    state.ASYNC_INFO.MESSAGE = '';
  },
  UPDATE_ASYNC_INFO_FAILURE: (state, { message }) => {
    state.ASYNC_INFO.SUCCESS = false;
    state.ASYNC_INFO.PENDING = false;
    state.ASYNC_INFO.FAILURE = true;
    state.ASYNC_INFO.MESSAGE = message;
  },
  SORT_USERS: (state, { list }) => {
    state.users = list;
  },
};

const getters = {
  getUsers: state => state.users,
  getUserCount: state => state.users.length,
  isAsyncPending: state => state.ASYNC_INFO.PENDING,
  isAsyncSuccess: state => state.ASYNC_INFO.SUCCESS,
  isAsyncFailure: state => state.ASYNC_INFO.FAILURE,
  getMessage: state => state.ASYNC_INFO.MESSAGE,
};

const state = {
  users: [],
  ASYNC_INFO: {
    SUCCESS: false,
    PENDING: false,
    FAILURE: false,
    MESSAGE: '',
  },
};


export default {
  state,
  getters,
  actions,
  mutations,
};
