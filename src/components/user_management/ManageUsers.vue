<template>
 <md-layout>
 <md-layout md-gutter md-row>
   <md-card class="full-width">
  <form>
  <div>
  <md-input-container required>
     <label>First Name</label>
     <md-input type="text" required v-model.trim="username"></md-input>
   </md-input-container>

   <md-input-container required>
      <label>First Name</label>
      <md-input type="text" required v-model.trim="username"></md-input>
    </md-input-container>
  </div>
  </form>
  </md-card>
  </md-layout>
</md-layout>
</template>
<script>
export default {
  name: 'ManageUsers',
  data() {
    return {
      register: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
  .full-width {
    width :100%;
    margin:1rem;
  }
</style>
