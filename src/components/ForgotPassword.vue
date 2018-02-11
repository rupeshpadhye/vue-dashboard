<template>
               
               <md-card style="width:40vw;left:30vw;top:30vh">
                <md-card-header>
                    <div class="md-title">Reset Password</div>
                </md-card-header>
                <md-card-content > 
                <div>
                 <form ref="form" v-on:submit.prevent="onSubmit">
                      <md-snackbar ref="snackbar"  md-duration="3000" md-position="top right">{{getMessage}} </md-snackbar>
                          
                          <md-input-container >
                                <label>Email id</label>
                                <md-input type="text" required v-model.trim="email" required @keyup.enter.native="validateEmail"></md-input>
                          </md-input-container>
                       
                            <md-input-container >
                                    <label>OTP</label>
                                    <md-input type="text" required v-model.trim="otp" required></md-input>
                            </md-input-container> 
                             <md-input-container >
                                    <label>New Password</label>
                                    <md-input type="text" required v-model.trim="newpassword" required></md-input>
                            </md-input-container> 
                            <md-button class="md-raised  md-primary" type="submit" :disabled="isEmailValid" >Submit</md-button>
                        
                 </form>
                </div>
                 </md-card-content > 
               </md-card> 


</template>
<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      isEmailValid: false,
      getMessage: '',
      otp: '',
    };
  },
  methods: {
    onSubmit() {
      this.$refs.snackbar.open();
      this.getMessage = 'Password Reset link sent successfully.';
    },
    validateEmail() {
      /* eslint no-useless-escape: "off" */
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(this.email)) {
        this.isEmailValid = false;
        this.getMessage = 'Invalid Email.';
      } else {
        this.isEmailValid = true;
        this.getMessage = 'Check your email for OTP.';
      }
    },
  },
};
</script>
