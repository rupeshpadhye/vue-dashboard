// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint linebreak-style: ["off", "windows"] */
import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import store from '@/store/store';
import Api from '@/config/endpoints';
// import vueTitleSwitcher from 'vue-title-switcher';
import App from './App';
import router from './router';
// import vueTitsConf from './config/vue-tits-conf';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Vuex);
Vue.use(VueSocketIO, socketio(Api.BASE_URL), store);

/*
Vue.use(vueTitleSwitcher, {
  store: store,
  router: router,
  config: vueTitsConf,
});
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
