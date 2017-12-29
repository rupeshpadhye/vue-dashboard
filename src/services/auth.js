import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Api from '@/config/endpoints';

Vue.use(VueAxios, axios);
export default {
  login(context, credentials) {
    return new Promise((resolve, reject) => {
      Vue.axios.post(Api.BASE_URL + Api.AUTH_API, credentials).then((response) => {
        localStorage.setItem('token', response.data.token);
        context.$store.commit('LOGIN_USER');
        resolve();
      }).catch((error) => {
        context.$store.commit('LOGOUT_USER');
        reject(error);
      });
    });
  },
  isUserLoggedIn() {
    return false;
  },
};
