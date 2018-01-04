import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Api from '@/config/endpoints';

Vue.use(VueAxios, axios);
export default {
  getTabularData() {
    return Vue.axios.get(Api.BASE_URL + Api.TABULAR_DATA);
  },
};
