import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
/* eslint prefer-template: 'off' */
/* Vue.use(
  VueSocketIO,
  socketio(Api.BASE_URL, {
    query: 'token=' + localStorage.getItem('token'),
  }),
); */

export default {
  getAxiosInstance() {
    const token = localStorage.getItem('token');
    if (token) {
      Vue.axios.defaults.headers.common['x-access-token'] = token;
    } else {
      delete Vue.axios.defaults.headers.common['x-access-token'];
    }
    return Vue.axios;
  },
};
