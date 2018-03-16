<template>
    <div>
         <md-dialog md-open-from="#custom" md-close-to="#custom" ref="deleteDialog">
          <md-dialog-title>Deleting User</md-dialog-title>
          <md-dialog-content>Do you want to delete selected users?</md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-primary" @click="closeDeleteDialog()">Cancel</md-button>
            <md-button class="md-primary" @click="deleteUsers()">Delete</md-button>
          </md-dialog-actions>
        </md-dialog>

          <md-dialog md-open-from="#custom2" md-close-to="#custom2" ref="modifyDialog">
          <md-dialog-title>Modify User
             <md-button class="md-icon-button" @click="closeModifyDialog()" style="float:right;">
                   <md-icon >cancel</md-icon>
            </md-button>

          </md-dialog-title>
          <md-dialog-content>
            <register-user :user-info="modifyUser" @completed="onSuccessfulUpdate" update-user="true"></register-user>
          </md-dialog-content>
          </md-dialog>

          <md-dialog md-open-from="#custom3" md-close-to="#custom3" ref="searchDialog">
          <md-dialog-title>Search Users
          </md-dialog-title>
          <md-dialog-content>
            <div class="field-group" md-gutter>
                    <md-input-container>
                      <label for="searchType"></label>
                      <md-select name="searchType" id="searchType" v-model="searchBy">
                        <md-option value="name">Name</md-option>
                        <md-option value="lastname">Lastname</md-option>
                        <md-option value="email">Mobile Number</md-option>
                      </md-select>
                   </md-input-container>
                   <md-input-container>
                    <md-input placeholder="Type here"></md-input>
                  </md-input-container>
            </div>     
          </md-dialog-content>
           <md-dialog-actions>
            <md-button class="md-primary" @click="closeSearchDialog()">Cancel</md-button>
            <md-button class="md-primary" @click="searchUser()">Search</md-button>
          </md-dialog-actions>
          </md-dialog>

         
        <div v-if="isAsyncSuccess">
            <md-table-card>
                <md-toolbar>
                  <md-layout md-column>
                  <md-layout>  
                      <md-layout md-flex="95" md-flex-small="80" >
                        <h1 class="md-title">View Users</h1>
                      </md-layout>
                      <md-layout md-flex="5" md-flex-small="20">
                        <!--<md-button class="md-icon-button" @click="openFilterBox()">
                              <md-icon>filter_list</md-icon>
                        </md-button> -->
                        <md-button class="md-icon-button" @click="openSearchBox()">
                          <md-icon>search</md-icon>
                        </md-button>
                      </md-layout> 
                  </md-layout>
                  <md-layout md-gutter>  
                   <md-chip md-deletable>Luiza Ivanenko</md-chip>
                  </md-layout>
                  </md-layout>
                </md-toolbar>
                <md-table-alternate-header md-selected-label="selected" v-show="$can('superadmin|admin')">
                  <md-button class="md-icon-button" @click="onDelete">
                    <md-icon>delete</md-icon>
                  </md-button>
              </md-table-alternate-header>
            <md-table md-sort="firstname" @sort="reOrder" @select="onSelect">
            <md-table-header>
                <md-table-row>
                <md-table-head md-sort-by="firstname">First Name</md-table-head>
                <md-table-head>Last Name</md-table-head>
                <md-table-head>Mobile Number</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head  md-sort-by="admin">Role</md-table-head>
                <md-table-head>Status</md-table-head>
                </md-table-row>
            </md-table-header>
            <md-table-body>
                <md-table-row v-for="(user, index) in getUsers" :key="index" :md-item="user" md-selection>
                <md-table-cell>{{user.firstname}}</md-table-cell>
                <md-table-cell>{{user.lastname}}</md-table-cell>
                <md-table-cell>{{user.mobileno}}</md-table-cell>
                <md-table-cell>{{user.email}}</md-table-cell>
                <md-table-cell>{{user.role}}</md-table-cell>
                <md-table-cell>{{user.state}}</md-table-cell>
                <md-table-cell  v-show="$can('superadmin|admin')">
                <md-button class="md-icon-button" @click="onEditeRow(user)">
                        <md-icon>edit</md-icon>
                      </md-button>
                </md-table-cell>
                </md-table-row>
            </md-table-body>
            </md-table> 
              <md-table-pagination
                md-size="5"
                :md-total="getUserCount"
                md-page="1"
                md-label="Rows"
                md-separator="of"
                :md-page-options="[5, 10, 25, 50]"
                @pagination="onPagination">
            </md-table-pagination>
            </md-table-card>
        </div>
        <div v-if="isAsyncPending">
           <md-spinner :md-size="150" md-indeterminate></md-spinner>
        </div>
        <div v-if="isAsyncFailure">
            Something went wrong
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import registerUser from '@/components/user_management/RegisterUser';

export default {
  name: 'ViewModifyUsers',
  components: { registerUser },
  data() {
    return {
      orderField: 'firstname',
      direction: 'asc',
      selected: [],
      modifyUser: {},
      showSearchBox: false,
      showFilterBox: false,
      searchBy: '',
    };
  },
  computed: { ...mapGetters([
    'getUsers',
    'getUserCount',
    'isAsyncPending',
    'isAsyncSuccess',
    'isAsyncFailure',
  ]),
  },
  created() {
    this.$store.dispatch('LOAD_USER_LIST');
  },
  methods: {
    reOrder(object) {
      this.orderField = object.name;
      this.direction = object.type;
      this.$store.dispatch('SORT_USERS', { order: this.orderField, direction: this.direction }); // temp hack
    },
    onPagination() {
      console.log('pagination');
    },
    onSelect(items) {
      this.selected = items;
    },
    onDelete() {
      this.$refs.deleteDialog.open();
    },
    onEditeRow(item) {
      this.modifyUser = item;
      this.$refs.modifyDialog.open();
    },
    deleteUsers() {
      this.$store.dispatch('DELETE_USERS', this._.cloneDeep(this.selected));
      this.$refs.deleteDialog.close();
    },
    closeDeleteDialog() {
      this.$refs.deleteDialog.close();
    },
    closeModifyDialog() {
      this.$refs.modifyDialog.close();
    },
    onSuccessfulUpdate() {
      this.$refs.modifyDialog.close();
    },
    openSearchBox() {
      this.$refs.searchDialog.open();
    },
    closeSearchDialog() {
      this.$refs.searchDialog.close();
    },
    searchUser() {
      this.$store.dispatch('SEARCH_USER', this._.cloneDeep(this.selected));
      this.$refs.searchDialog.close();
    },
  },
};
</script>
<<style scoped>
  .field-group {
    display: flex;
  }
</style>
