import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Api from '@/config/endpoints';

Vue.use(VueAxios, axios);
export default {
  login(context, credentials) {
    return new Promise((resolve, reject) => {
      Vue.axios.post(Api.BASE_URL + Api.AUTH_API, credentials).then((response) => {
        context.$store.dispatch('LOGIN_USER', response.data);
        context.access = response.data.userinfo.role;
        Vue.axios.defaults.headers.common['x-access-token'] = response.data.token;
        resolve();
      }).catch((error) => {
        context.$store.commit('LOGOUT_USER');
        delete Vue.axios.defaults.headers.common['x-access-token'];
        reject(error.response);
      });
    });
  },
  isUserLoggedIn() {
    return false;
  },
  logOutUser(context) {
    return new Promise((resolve) => {
      context.$store.dispatch('LOGOUT_USER');
      delete Vue.axios.defaults.headers.common['x-access-token'];
      resolve();
    });
  },
};
