<template>
<md-layout style="margin:2rem;">
    <md-layout></md-layout>
    <md-layout md-align="center">
    <md-card class="full-width" >
        <md-card-header>
          <!--  <div class="md-title">Register User</div> -->
            <div class="md-subhead">Register user here</div>
        </md-card-header>
        <md-card-content  md-column>
            <form novalidate @submit.stop.prevent="registerUser" >
               <md-input-container required>
                  <label>First Name</label>
                  <md-input type="text" required v-model.trim="username"></md-input>
                </md-input-container>

                <md-input-container>
                  <label>Last Name </label>
                  <md-input type="text" required v-model.trim="lastname"></md-input>

                </md-input-container>
                <md-input-container>
                  <label>Mobile Number </label>
                  <md-input type="number" required v-model.trim="mobileno" maxlength="10"></md-input>
                  <span class="md-error">Invalid Mobile Number</span>
                </md-input-container>
                <md-input-container>
                    <label>Address</label>
                    <md-textarea maxlength="70"></md-textarea>
                </md-input-container>
                <md-input-container>
                  <label>Documents</label>
                  <md-file v-model="multiple" multiple ref="files" @selected="onFileUpload($event)"></md-file>
                </md-input-container>
                <div v-if="serverError" style="color:red;" id="error">{{errorMessage}}</div>
                <md-layout md-align="center">
                    <md-button type="submit"  class="md-raised md-primary">Register</md-button>
                </md-layout>
          </form>
    </md-card-content>
  </md-card>
    </md-layout>
    <md-layout></md-layout>
</md-layout>
</template>
<script>
/* eslint linebreak-style: ["off", "windows"] */
import RegisterUserService from '@/services/user_management';

export default {
  name: 'RegisterUser',
  data() {
    return {
      single: null,
      placeholder: null,
      multiple: null,
      onlyImages: null,
      username: '',
      lastname: '',
      mobileno: '',
      isUserNameValid: true,
      isLastNameValid: true,
      isMobileNoValid: true,
      isValidForm: false,
      serverError: false,
      errorMessage: 'fsdsdfsdsd',
      fileList: [],
    };
  },
  methods: {
    registerUser() {
      this.resetValidationFields();
      if (!this.validateForm()) {
        this.serverError = true;
        this.errorMessage = 'Please fill all the mandatory fields.';
        return false;
      }
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('lastname', this.lastname);
      formData.append('mobileno', this.mobileno);
      formData.append('filenames', this.multiple);
      formData.append('email', '');
      formData.append('address', '');
      formData.append('files', this.fileList);
      RegisterUserService.registerUser(formData).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      return true;
    },
    isValidRegistration() {
      if (this.username === undefined || this.username === '') {
        this.isUserNameValid = false;
      }
      if (this.lastname === undefined || this.lastname === '') {
        this.isLastNameValid = false;
      }
      if (this.mobileno === undefined || this.mobileno === '') {
        this.isMobileNoValid = false;
      }
    },
    validateForm() {
      this.isValidRegistration();
      if (this.isUserNameValid && this.isLastNameValid && this.isMobileNoValid) {
        console.log('success');
        this.isValidForm = true;
      } else {
        console.log('fale', this.isMobileNoValid);
        this.isValidForm = false;
      }
      return this.isValidForm;
    },
    resetValidationFields() {
      this.isUserNameValid = true;
      this.isLastNameValid = true;
      this.isMobileNoValid = true;
      this.serverError = false;
      this.errorMessage = '';
    },
    onFileUpload(evt) {
      console.log(evt);
      this.fileList = evt;
    },
  },
};
</script>
<style scoped>
  .full-width {
    width :100%;
  }
  #error{
    text-align :center;
    color : red;
  }
</style>
