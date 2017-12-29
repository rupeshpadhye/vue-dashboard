 const actions = {
 };

 const mutations = {
   /*  eslint-disable no-param-reassign */
   LOGIN_USER(state) {
     state.isLogged = true;
   },
   /* eslint-disable no-param-reassign */
   LOGOUT_USER(state) {
     state.isLogged = false;
   },
 };

 const getters = {
   isUserLoggedIn: state => state.isLogged,
 };

 const state = {
   isLogged: !localStorage.getItem('token'),
   user: {},
 };


 export default {
   state,
   getters,
   actions,
   mutations,
 };
