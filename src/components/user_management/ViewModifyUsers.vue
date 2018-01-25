<template>
    <div>
        <div v-if="isAsyncSuccess">
            <md-table-card>
                <md-toolbar>
                    <h1 class="md-title">View Users</h1>
                    <md-button class="md-icon-button">
                          <md-icon>filter_list</md-icon>
                    </md-button>
                    <md-button class="md-icon-button">
                      <md-icon>search</md-icon>
                    </md-button>
                </md-toolbar>
                <md-table-alternate-header md-selected-label="selected">
                  <md-button class="md-icon-button">
                    <md-icon>delete</md-icon>
                  </md-button>
                  <md-button class="md-icon-button">
                    <md-icon>more_vert</md-icon>
                  </md-button>
              </md-table-alternate-header>
            <md-table md-sort="firstname" @sort="reOrder">
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
                <md-table-cell>
                <md-button class="md-icon-button">
                        <md-icon>edit</md-icon>
                      </md-button>
                </md-table-cell>
                </md-table-row>
            </md-table-body>
            </md-table> 
              <md-table-pagination
                md-size="10"
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

export default {
  name: 'ViewModifyUsers',
  data() {
    return {
      orderField: 'firstname',
      direction: 'asc',
    };
  },
  watch: {
    getUsers(data) {
      return this._.orderBy(data, this.orderField, this.direction);
    },
  },
  computed: mapGetters([
    'getUsers',
    'getUserCount',
    'isAsyncPending',
    'isAsyncSuccess',
    'isAsyncFailure',
  ]),
  created() {
    this.$store.dispatch('LOAD_USER_LIST');
  },
  methods: {
    reOrder(object) {
      this.orderField = object.name;
      this.direction = object.type;
    },
    onPagination() {
      console.log('pagination');
    },
  },
};
</script>
<<style scoped>

</style>
