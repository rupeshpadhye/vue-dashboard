/* eslint linebreak-style: ["off", "windows"] */
import Vue from 'vue';
import Vuex from 'vuex';
// import vueLocalizeVuexStoreModule from 'vue-localize';
// import vtsVuexStoreModule from 'vue-title-switcher';
import UserStore from '@/store/modules/UserStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    UserStore,
  },
});

export default store;
