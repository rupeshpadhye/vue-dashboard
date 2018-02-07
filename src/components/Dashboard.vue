<template>
  <div class="page-container">
      <md-toolbar>
        <md-button class="md-icon-button" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">{{getTitle}}</h2>
        <md-menu>
          <md-button md-menu-trigger>
            <md-icon>view_module</md-icon>
          </md-button>
          <md-menu-content>
           <!-- <md-menu-item>Profile</md-menu-item> -->
          <md-menu-item v-on:click="logOutUser">Logout</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-toolbar>
      <md-sidenav class="md-left" ref="leftSidenav">   <!--@open="open('Left')" @close="close('Left')"-->
              <md-toolbar class="md-transparent md-small">
                <div class="md-toolbar-container">
                <md-avatar>
                      <img src="../assets/logo.png" alt="Avatar">
                </md-avatar>
                </div>
              </md-toolbar>
              <md-list>
          <md-list-item v-show ="$can('admin|user')">
              <md-icon>home</md-icon>
              <span><router-link  v-on:click.native="upadateTitle('Home')" :to="'/'">Home</router-link></span>
          </md-list-item>
          <md-list-item md-expand-multiple v-show ="$can('admin')">
            <md-icon>assignment</md-icon>
            <span><router-link  v-on:click.native="upadateTitle('User Management')" :to="'/usermngment'">User Management</router-link></span>
          <!--  <md-list-expand>
              <md-list>
                <md-list-item class="md-inset"><router-link :to="'register'">Register</router-link></md-list-item>
                <md-list-item class="md-inset"><router-link :to="'modify'">View & Modify</router-link></md-list-item>
              </md-list>
            </md-list-expand>-->
          </md-list-item>
          <md-list-item v-show ="$can('admin')">
            <md-icon>label</md-icon>
            <span><router-link  v-on:click.native="upadateTitle('About')" :to="'/about'">About</router-link></span>
          </md-list-item>
        </md-list>
    </md-sidenav>
    <div>
      <router-view class="main-container"></router-view>
    </div>
  </div>
</template>

<script>
import auth from '@/services/auth';
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  data: () => ({
    menuVisible: false,
  }),
  computed: mapGetters([
    'getTitle',
    'getUserRole',
  ]),
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    upadateTitle(title) {
      this.$store.dispatch('SET_TITLE', title);
      this.toggleLeftSidenav();
    },
    logOutUser() {
      auth.logOutUser(this).then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
    .page-container {
     min-height:100vh;
    }
    .main-container {
       padding: 10px;
       min-height: calc(100% - 100px);
    }
</style>
