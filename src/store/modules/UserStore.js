 const actions = {
   LOGIN_USER: ({ commit }, token) => {
     commit('LOGIN_USER', token);
   },
   LOGOUT_USER: ({ commit }) => {
     commit('LOGOUT_USER');
   },
   SET_TITLE: ({ commit }, title) => {
     commit('SET_TITLE', title);
   },
 };

 const mutations = {
   /*  eslint-disable no-param-reassign */
   LOGIN_USER(state, token) {
     state.isLogged = true;
     localStorage.setItem('token', token);
   },
   /* eslint-disable no-param-reassign */
   LOGOUT_USER(state) {
     state.isLogged = false;
     localStorage.removeItem('token');
     localStorage.removeItem('title');
   },
   SET_TITLE(state, title) {
     state.title = title;
     localStorage.setItem('title', title);
   },
 };

 const getters = {
   isUserLoggedIn: state => state.isLogged,
   getTitle: state => state.title,
 };

 const state = {
   isLogged: !localStorage.getItem('token'),
   userinfo: localStorage.getItem('userinfo'),
   title: localStorage.getItem('title'),
 };


 export default {
   state,
   getters,
   actions,
   mutations,
 };
