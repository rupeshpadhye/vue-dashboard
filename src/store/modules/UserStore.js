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
   LOGIN_USER(state, data) {
     state.isLogged = true;
     state.role = data.userinfo.role;
     state.userinfo = data.userinfo;
     localStorage.setItem('token', data.token);
     localStorage.setItem('role', data.userinfo.role);
     localStorage.setItem('userinfo', JSON.stringify(data.userinfo));
   },
   /* eslint-disable no-param-reassign */
   LOGOUT_USER(state) {
     state.isLogged = false;
     localStorage.removeItem('token');
     localStorage.removeItem('title');
     localStorage.removeItem('userinfo');
     localStorage.removeItem('role');
   },
   SET_TITLE(state, title) {
     state.title = title;
     localStorage.setItem('title', title);
   },
 };

 const getters = {
   isUserLoggedIn: state => state.isLogged,
   getTitle: state => state.title,
   getUserRole: state => state.role,
 };

 const state = {
   isLogged: !localStorage.getItem('token'),
   userinfo: JSON.parse(localStorage.getItem('userinfo')),
   title: localStorage.getItem('title'),
   role: localStorage.getItem('role'),
 };


 export default {
   state,
   getters,
   actions,
   mutations,
 };
