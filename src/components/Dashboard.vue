<template>
  <div class="page-container">
      <md-toolbar>
        <md-button class="md-icon-button" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">Dashboard</h2>
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
          <md-list-item>
              <md-icon>home</md-icon>
              <span><router-link :to="'/'">Home</router-link></span>
          </md-list-item>
          <md-list-item md-expand-multiple>
            <md-icon>assignment</md-icon>
            <span>User Management</span>
            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset"><router-link :to="'register'">Register</router-link></md-list-item>
                <md-list-item class="md-inset"><router-link :to="'modify'">View & Modify</router-link></md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
          <md-list-item>
            <md-icon>label</md-icon>
            <span><router-link :to="'about'">About</router-link></span>
          </md-list-item>
        </md-list>
    </md-sidenav>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import auth from '@/services/auth';

export default {
  name: 'Dashboard',
  data: () => ({
    menuVisible: false,
  }),
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
       min-height:90vh;
       padding : 2rem;
    }
</style>
