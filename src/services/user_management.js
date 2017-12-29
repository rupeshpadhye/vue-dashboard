/* eslint linebreak-style: ["off", "windows"] */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Api from '@/config/endpoints';

Vue.use(VueAxios, axios);
export default {
  registerUser(formData) {
    console.log(Api);
    return Vue.axios.post(Api.BASE_URL + Api.REGISTER_USER, formData);
  },
};
