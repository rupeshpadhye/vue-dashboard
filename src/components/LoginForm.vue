<template>
  <md-layout md-column md-gutter >
      <md-layout  md-align="center" md-gutter="16" md-vertical-align="stretch">  
            <md-card md-flex style="width:40vw"> 
                <md-card-media>
                </md-card-media>
                <md-card-header>
                    <div class="md-title">Welcome User</div>
                </md-card-header>
                <md-card-content >
                    <form novalidate @submit.stop.prevent="login" >
                        <md-input-container v-bind:class=" {'md-input-invalid' : isInvalidValidUserName} ">
                          <label>Username</label>
                          <md-input type="text" required v-model.trim="username" v-on:blur="isUserNameValid"></md-input>
                          <span class="md-error">User Name can not be empty</span>
                        </md-input-container>

                        <md-input-container v-bind:class="{'md-input-invalid' :isInvalidPassword}">
                          <label>Password </label>
                          <md-input type="password" required v-model.trim="password" v-on:blur="isPasswordValid"></md-input>
                            <span class="md-error">Password can not be empty.</span>
                        </md-input-container>
                        <div v-if="serverError" style="color:red">{{errorMessage}}</div>
                        <md-layout md-align="center">
                            <md-button type="submit"  class="md-raised md-primary">Login</md-button>
                        </md-layout>
                        <router-link to="/reset">Lost your password?</router-link>
                  </form>
            </md-card-content>
          </md-card>
    </md-layout>
</md-layout>
</template>

<script>
import auth from '@/services/auth';

export default {
  name: 'LoginForm',
  data() {
    return {
      infoError: false,
      username: '',
      password: '',
      isInvalidValidUserName: false,
      isInvalidPassword: false,
      serverError: false,
      errorMessage: '',
    };
  },
  methods: {
    login() {
      if (this.username === undefined || this.username === '' || this.password === undefined || this.password === '') {
        this.isInvalidValidUserName = true;
        this.isInvalidPassword = true;
      } else {
        this.serverError = false;
        const payload = {
          username: this.username,
          password: this.password,
        };
        auth.login(this, payload).then(() => {
          this.$router.push('/');
        }, (error) => {
          this.errorMessage = error.data.message;
          this.serverError = true;
          this.password = '';
        });
      }
    },
    isUserNameValid() {
      if (this.username === undefined || this.username === '') {
        this.isInvalidValidUserName = true;
      }
    },
    isPasswordValid() {
      if (this.password === undefined || this.password === '') {
        this.isInvalidPassword = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
