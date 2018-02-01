<template>
<div>
    <md-snackbar ref="snackbar"  md-duration="3000" md-position="top right">{{getMessage}} </md-snackbar>
    <md-layout style="margin:2rem;">
      <md-layout md-align="center">
              <md-stepper @change="onChangeStep" @completed="onStepCompleted">
                 <form ref="form">
                      <md-step md-label="Personal Information" :md-editable="true" :md-error="!(isLastNameValid && isUserNameValid)" 
                            :md-continue="(isLastNameValid && isUserNameValid)" :md-message="mandatoryFieldsMsg">
                          <md-input-container >
                                <label>First Name</label>
                                <md-input type="text" required v-model.trim="username" required></md-input>
                            </md-input-container>
                            <md-input-container> 
                                <label>Last Name </label>
                                <md-input type="text" required v-model.trim="lastname" required></md-input>
                            </md-input-container>
                      </md-step>
                      <md-step md-label="Contact Details" :md-editable="true" :md-error="!(isMobileNoValid && isEmailValid )" 
                              :md-continue="(isMobileNoValid && isEmailValid)" :md-message="contactMandatoryFieldsMsg"> 
                              <md-input-container>
                                 <label>Mobile Number </label>
                                 <md-input type="number" required v-model.trim="mobileno" maxlength="10" required></md-input>
                                 <span class="md-error">Invalid Mobile Number</span>
                            </md-input-container>
                             <md-input-container>
                                 <label>Email </label>
                                 <md-input type="email" required v-model.trim="email" required></md-input>
                                 <span class="md-error">Invalid email address</span>
                            </md-input-container>
                            <md-input-container>
                                  <label>Address</label>
                                  <md-textarea maxlength="70"></md-textarea>
                             </md-input-container>
                      </md-step>
                      <md-step md-label="Roles" :md-error="!isRoleValid" 
                              :md-continue="(isRoleValid)" :md-message="invalidRoleMsg">
                          <md-input-container>
                                    <label for="country">Role</label>
                                    <md-select name="role" id="role" v-model="role">
                                      <md-option value="admin">Admin</md-option>
                                      <md-option value="user">User</md-option>
                                    </md-select>
                                </md-input-container>
                      </md-step>
                      <md-step md-label="Documents" :md-message="docMessage">
                         <md-input-container>
                                  <label>Documents</label>
                                  <md-file v-model="multiple" multiple ref="files" @selected="onFileUpload($event)"></md-file>
                                </md-input-container>
                      </md-step> 
                 </form>
      </md-stepper>
      </md-layout>
     
  </md-layout>
</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RegisterUser',
  props: ['user-info', 'update-user'],
  data() {
    return {
      single: null,
      placeholder: null,
      multiple: null,
      onlyImages: null,
      username: '',
      lastname: '',
      mobileno: '',
      isUserNameValid: false,
      isLastNameValid: false,
      isMobileNoValid: false,
      isEmailValid: false,
      isValidForm: false,
      isRoleValid: false,
      message: '',
      role: '',
      email: '',
      fileList: [],
      validPersonalInfo: false,
      validContactInfo: true,
      mandatoryFieldsMsg: 'Please Fill Manadatory fields. ',
      contactMandatoryFieldsMsg: 'Please Fill Contact detail fields.',
      invalidRoleMsg: 'Please Select Role.',
      docMessage: 'Choose Documents.',
    };
  },
  watch: {
    userInfo() {
      this.username = this.userInfo.firstname;
      this.lastname = this.userInfo.lastname;
      this.mobileno = this.userInfo.mobileno;
      this.email = this.userInfo.email;
      this.role = this.userInfo.role;
      this.state = this.userInfo.state;
      this.address = this.userInfo.address;
    },
    getMessage(data) {
      if (!this._.isEmpty(data)) {
        this.$refs.snackbar.open();
        this.clearFields();
      }
      return data;
    },
    username() {
      if (this._.isUndefined(this.username) || this._.isEmpty(this.username)) {
        this.isUserNameValid = false;
      } else {
        this.isUserNameValid = true;
      }
    },
    lastname() {
      if (this._.isUndefined(this.lastname) || this._.isEmpty(this.lastname)) {
        this.isLastNameValid = false;
      } else {
        this.isLastNameValid = true;
      }
    },
    mobileno() {
      if (this._.isUndefined(this.mobileno) || this._.isEmpty(this.mobileno)) {
        this.isMobileNoValid = false;
      } else {
        this.isMobileNoValid = true;
      }
    },
    email() {
      /* eslint no-useless-escape: "off" */
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(this.email)) {
        this.isEmailValid = false;
      } else {
        this.isEmailValid = true;
      }
    },
    role() {
      if (this._.isUndefined(this.role) || this._.isEmpty(this.role)) {
        this.isRoleValid = false;
      } else {
        this.isRoleValid = true;
      }
    },
  },
  computed: {
    ...mapGetters([
      'isAsyncPending',
      'getMessage',
    ]),
    isPersonalInfoValid() {
      if (this.username !== undefined && this.username !== '' && this.lastname !== undefined && this.lastname !== '') {
        this.validPersonalInfo = true;
      }
    },
    isContactDetailsValid() {
      if (this.username === undefined || this.username === '') {
        this.isUserNameValid = false;
      }
    },
  },
  methods: {
    registerUser() {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('lastname', this.lastname);
      formData.append('mobileno', this.mobileno);
      formData.append('filenames', this.multiple);
      formData.append('role', this.role);
      formData.append('email', this.email);
      formData.append('address', this.address);
      formData.append('files', this.fileList);
      if (this.updateUser) {
        this.$store.dispatch('MODIFY_USER', formData);
      } else {
        this.$store.dispatch('ADD_USER', formData);
      }
      return true;
    },
    clearFields() {
      this.username = '';
      this.lastname = '';
      this.mobileno = '';
      this.email = '';
      this.address = '';
      this.fileList = '';
      this.role = '';
    },
    onFileUpload(evt) {
      this.fileList = evt;
    },
    onStepCompleted() {
      this.registerUser();
      this.$emit('completed');
    },
    onChangeStep() {

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
